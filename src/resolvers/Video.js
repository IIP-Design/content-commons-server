import {
  UserInputError, ApolloError, withFilter
} from 'apollo-server-express';
import pubsub from '../services/pubsub';
import {
  getS3ProjectDirectory, getVimeoFiles, hasValidValue, getVimeoId
} from '../lib/projectParser';
import { deleteAllFromVimeo, deleteFromVimeo } from '../services/vimeo';
import { deleteAllS3Assets, deleteS3Asset } from '../services/aws/s3';
import transformVideo from '../services/es/video/transform';
import { publishCreate, publishUpdate, publishDelete } from '../services/rabbitmq/video';
import { VIDEO_UNIT_VIDEO_FILES, VIDEO_FILE_FILES, VIDEO_PROJECT_FULL } from '../fragments/video.js';

const PROJECT_STATUS_CHANGE = 'PROJECT_STATUS_CHANGE';
const PUBLISHER_BUCKET = process.env.AWS_S3_PUBLISHER_BUCKET;

export default {
  Subscription: {
    projectStatusChange: {
      subscribe: withFilter(
        () => { console.log( 'received payload' ); return pubsub.asyncIterator( [PROJECT_STATUS_CHANGE] ); },
        ( payload, variables ) => payload.id === variables.id,
      )
    }
  },

  Query: {
    videoProjects ( parent, args, ctx ) {
      return ctx.prisma.videoProjects( { ...args } );
    },

    videoProject ( parent, args, ctx ) {
      return ctx.prisma.videoProject( { id: args.id } );
    },

    videoUnits ( parent, args, ctx ) {
      return ctx.prisma.videoUnits( { ...args } );
    },

    videoUnit ( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: args.id } );
    },

    videoFiles ( parent, args, ctx ) {
      return ctx.prisma.videoFiles( { ...args } );
    },

    videoFile ( parent, args, ctx ) {
      return ctx.prisma.videoFile( { id: args.id } );
    },

    thumbnails ( parent, args, ctx ) {
      return ctx.prisma.thumbnails( { ...args } );
    },

    thumbnail ( parent, args, ctx ) {
      return ctx.prisma.thumbnail( { id: args.id } );
    },

    imageFiles ( parent, args, ctx ) {
      return ctx.prisma.imageFiles( { ...args } );
    },

    imageFile ( parent, args, ctx ) {
      return ctx.prisma.imageFile( { id: args.id } );
    },

    supportFiles ( parent, args, ctx ) {
      return ctx.prisma.supportFiles( { ...args } );
    },

    supportFile ( parent, args, ctx ) {
      return ctx.prisma.supportFile( { id: args.id } );
    },

    categories ( parent, args, ctx ) {
      return ctx.prisma.categories( { ...args } );
    },

    category ( parent, args, ctx ) {
      return ctx.prisma.category( { id: args.id } );
    },

    tags ( parent, args, ctx ) {
      return ctx.prisma.tags( { ...args } );
    },

    tag ( parent, args, ctx ) {
      return ctx.prisma.tag( { id: args.id } );
    },

    videoUses ( parent, args, ctx ) {
      return ctx.prisma.videoUses( { ...args } );
    },

    videoUse ( parent, args, ctx ) {
      return ctx.prisma.videoUse( { id: args.id } );
    },

    imageUses ( parent, args, ctx ) {
      return ctx.prisma.imageUses( { ...args } );
    },

    imageUse ( parent, args, ctx ) {
      return ctx.prisma.imageUse( { id: args.id } );
    },

    dimensionses ( parent, args, ctx ) {
      return ctx.prisma.dimensionses( { ...args } );
    },

    dimensions ( parent, args, ctx ) {
      return ctx.prisma.dimensions( { id: args.id } );
    },

    videoStreams ( parent, args, ctx ) {
      return ctx.prisma.videoStreams( { ...args } );
    },

    videoStream ( parent, args, ctx ) {
      return ctx.prisma.videoStream( { id: args.id } );
    }
  },

  Mutation: {
    async createVideoProject ( parent, args, ctx ) {
      const { data } = args;
      const videoProject = await ctx.prisma.createVideoProject( {
        ...data
      } );

      return videoProject;
    },

    updateVideoProject ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateVideoProject( {
        data,
        where: { id }
      } );
    },


    async publishVideoProject( parent, args, ctx ) {
      // 1. Get data for project to publish from db
      const videoProject = await ctx.prisma.videoProject( { id: args.id } ).$fragment( VIDEO_PROJECT_FULL );
      if ( !videoProject ) {
        throw new UserInputError( 'A project with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }

      // 2. Transform it into thw acceptable elasticsearch data structure
      const esData = transformVideo( videoProject );
      const { status } = videoProject;

      // 3. Put on the queue for processing ( not sure we need to await here )
      if ( status === 'DRAFT' ) {
        publishCreate( args.id, esData, status );
      } else {
        publishUpdate( args.id, esData, status );
      }

      // 4. Update the project status
      await ctx.prisma.updateVideoProject( {
        data: { status: 'PUBLISHING' },
        where: args
      } ).catch( err => {
        throw new ApolloError( err );
      } );

      return videoProject;
    },

    async unpublishVideoProject( parent, args, ctx ) {
      const videoProject = await ctx.prisma.videoProject( args ).$fragment( VIDEO_PROJECT_FULL );
      if ( !videoProject ) {
        throw new UserInputError( 'A project with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }
      const { id } = videoProject;

      publishDelete( id );

      return videoProject;
    },

    updateManyVideoProjects ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyVideoProjects( { data, where } );
    },

    // NOTE: Consider moving some of this delete logic to another file
    async deleteVideoProject( parent, { id }, ctx ) {
      // 1. Verify we have a valid project before contnuing
      const doesProjectExist = await ctx.prisma.$exists.videoProject( { id } );
      if ( !doesProjectExist ) {
        throw new UserInputError( 'A project with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }

      // 2. Fetch files that need to be removed from s3/vimeo
      const units = await ctx.prisma.videoProject( { id } ).units().$fragment( VIDEO_UNIT_VIDEO_FILES );

      // 3. Delete vimeo files if they exist
      if ( units.length ) {
        let deleteS3;
        const s3DirToDelete = getS3ProjectDirectory( units );
        const vimeoFilesToDelete = getVimeoFiles( units );

        // 3a. Delete from vimeo
        const deleteVimeo = deleteAllFromVimeo( vimeoFilesToDelete );

        // 3b. Delete files from S3
        if ( s3DirToDelete ) {
          deleteS3 = deleteAllS3Assets( s3DirToDelete, PUBLISHER_BUCKET ).catch( err => console.dir( err ) );
        }

        // execute in paralel
        await deleteVimeo;
        if ( deleteS3 ) {
          await deleteS3;
        }
      }

      // 4. Delete project from db  and return id of deleted project
      return ctx.prisma.deleteVideoProject( { id } );
    },

    deleteManyVideoProjects( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyVideoProjects( { ...where } );
    },

    async createVideoUnit ( parent, args, ctx ) {
      const { data } = args;
      const videoUnit = await ctx.prisma.createVideoUnit( {
        ...data
      } );

      return videoUnit;
    },

    updateVideoUnit ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateVideoUnit( {
        data,
        where: { id }
      } );
    },

    updateManyVideoUnits ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyVideoUnits( { data, where } );
    },

    deleteVideoUnit( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoUnit( { id } );
    },

    deleteManyVideoUnits( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyVideoUnits( { ...where } );
    },

    async createVideoFile ( parent, args, ctx ) {
      const { data } = args;
      const videoFile = await ctx.prisma.createVideoFile( {
        ...data
      } );

      return videoFile;
    },

    updateVideoFile ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateVideoFile( {
        data,
        where: { id }
      } );
    },

    updateManyVideoFiles ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyVideoFiles( { data, where } );
    },

    // NOTE: Consider moving some of this delete logic to another file
    async deleteVideoFile ( parent, { id }, ctx ) {
      // 1. Verify we have a valid project before contnuing
      const doesVideoFileExist = await ctx.prisma.$exists.videoFile( { id } );
      if ( !doesVideoFileExist ) {
        throw new UserInputError( 'A video file with that id does not exist in the database', {
          invalidArgs: 'id'
        } );
      }

      // 2. Fetch video file that needs to be removed from s3/vimeo
      const videoFile = await ctx.prisma.videoFile( { id } ).$fragment( VIDEO_FILE_FILES );
      const { url, stream } = videoFile;
      let deleteS3;
      let deleteVimeo;

      // 3a. Delete from vimeo if vimeo
      if ( stream && stream.length ) {
        if ( hasValidValue( stream[0].url ) ) {
          deleteVimeo = deleteFromVimeo( getVimeoId( stream[0].url ) );
        }
      }

      // 3b. Delete from s3
      if ( hasValidValue( url ) ) {
        deleteS3 = deleteS3Asset( url, PUBLISHER_BUCKET );
      }

      // execute in paralel
      if ( deleteS3 ) {
        await deleteS3;
      }
      if ( deleteVimeo ) {
        await deleteVimeo;
      }

      return ctx.prisma.deleteVideoFile( { id } );
    },

    deleteManyVideoFiles ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyVideoFiles( { ...where } );
    },

    async createThumbnail ( parent, args, ctx ) {
      const { data } = args;
      const thumbnailFile = await ctx.prisma.createThumbnail( {
        ...data
      } );

      return thumbnailFile;
    },

    updateThumbnail ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateThumbnail( {
        data,
        where: { id }
      } );
    },

    updateManyThumbnails ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyThumbnails( { data, where } );
    },

    deleteThumbnail ( parent, { id }, ctx ) {
      return ctx.prisma.deleteThumbnail( { id } );
    },

    deleteManyThumbnails ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyThumbnails( { ...where } );
    },

    async createImageFile ( parent, args, ctx ) {
      const { data } = args;
      const imageFile = await ctx.prisma.createImageFile( {
        ...data
      } );

      return imageFile;
    },

    updateImageFile ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateImageFile( {
        data,
        where: { id }
      } );
    },

    updateManyImageFiles ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyImageFiles( { data, where } );
    },

    deleteImageFile ( parent, { id }, ctx ) {
      return ctx.prisma.deleteImageFile( { id } );
    },

    deleteManyImageFiles ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyImageFiles( { ...where } );
    },

    async createSupportFile ( parent, args, ctx ) {
      const { data } = args;
      const supportFile = await ctx.prisma.createSupportFile( {
        ...data
      } );

      return supportFile;
    },

    updateSupportFile ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateSupportFile( {
        data,
        where: { id }
      } );
    },

    updateManySupportFiles ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManySupportFiles( { data, where } );
    },

    deleteSupportFile ( parent, { id }, ctx ) {
      return ctx.prisma.deleteSupportFile( { id } );
    },

    deleteManySupportFiles ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManySupportFiles( { ...where } );
    },

    // async createCategory ( parent, args, ctx ) {
    //   const { data } = args;
    //   const category = await ctx.prisma.createCategory( {
    //     ...data
    //   } );

    //   return category;
    // },

    // updateCategory ( parent, args, ctx ) {
    //   const updates = { ...args };
    //   const { data, where: { id } } = updates;
    //   return ctx.prisma.updateCategory( {
    //     data,
    //     where: { id }
    //   } );
    // },

    // deleteCategory ( parent, { id }, ctx ) {
    //   return ctx.prisma.deleteCategory( { id } );
    // },

    // async createTag ( parent, args, ctx ) {
    //   const { data } = args;
    //   const tag = await ctx.prisma.createTag( {
    //     ...data
    //   } );

    //   return tag;
    // },

    // updateTag ( parent, args, ctx ) {
    //   const updates = { ...args };
    //   const { data, where: { id } } = updates;
    //   return ctx.prisma.updateTag( {
    //     data,
    //     where: { id }
    //   } );
    // },

    // updateManyTags ( parent, args, ctx ) {
    //   const updates = { ...args };
    //   const { data, where } = updates;
    //   return ctx.prisma.updateManyTags( { data, where } );
    // },

    // deleteTag ( parent, { id }, ctx ) {
    //   return ctx.prisma.deleteTag( { id } );
    // },

    // deleteManyTags ( parent, { where }, ctx ) {
    //   return ctx.prisma.deleteManyTags( { ...where } );
    // },

    async createVideoUse ( parent, args, ctx ) {
      const videoUse = await ctx.prisma.createVideoUse( {
        ...args
      } );

      return videoUse;
    },

    updateVideoUse ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateVideoUse( {
        data,
        where: { id }
      } );
    },

    updateManyVideoUses ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyVideoUses( { data, where } );
    },

    deleteVideoUse ( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoUse( { id } );
    },

    deleteManyVideoUses ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyVideoUses( { ...where } );
    },

    async createImageUse ( parent, args, ctx ) {
      const imageUse = await ctx.prisma.createImageUse( {
        ...args
      } );

      return imageUse;
    },

    updateImageUse ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateImageUse( {
        data,
        where: { id }
      } );
    },

    updateManyImageUses ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyImageUses( { data, where } );
    },

    deleteImageUse ( parent, { id }, ctx ) {
      return ctx.prisma.deleteImageUse( { id } );
    },

    deleteManyImageUses ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyImageUses( { ...where } );
    },

    async createDimensions ( parent, args, ctx ) {
      const dimensions = await ctx.prisma.createDimensions( {
        ...args
      } );

      return dimensions;
    },

    updateDimensions ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateDimensions( {
        data,
        where: { id }
      } );
    },

    updateManyDimensionses ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDimensionses( { data, where } );
    },

    deleteDimensions ( parent, { id }, ctx ) {
      return ctx.prisma.deleteDimensions( { id } );
    },

    deleteManyDimensionses ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDimensionses( { ...where } );
    },

    async createVideoStream ( parent, args, ctx ) {
      const { data } = args;
      const videoStream = await ctx.prisma.createVideoStream( {
        ...data
      } );

      return videoStream;
    },

    updateVideoStream ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateVideoStream( {
        data,
        where: { id }
      } );
    },

    updateManyVideoStreams ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyVideoStreams( { data, where } );
    },

    deleteVideoStream ( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoStream( { id } );
    },

    deleteManyVideoStreams ( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyVideoStreams( { ...where } );
    }
  },

  VideoProject: {
    author( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .author( { ...args } );
    },

    team( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .team( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .tags( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .categories( { ...args } );
    },

    units( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .units( { ...args } );
    },

    supportFiles( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .supportFiles( { ...args } );
    },

    thumbnails( parent, args, ctx ) {
      return ctx.prisma
        .videoProject( { id: parent.id } )
        .thumbnails( { ...args } );
    },
  },

  VideoUnit: {
    language( parent, args, ctx ) {
      return ctx.prisma
        .videoUnit( { id: parent.id } )
        .language( { ...args } );
    },

    files( parent, args, ctx ) {
      return ctx.prisma
        .videoUnit( { id: parent.id } )
        .files( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma
        .videoUnit( { id: parent.id } )
        .tags( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma
        .videoUnit( { id: parent.id } )
        .categories( { ...args } );
    },

    thumbnails( parent, args, ctx ) {
      return ctx.prisma
        .videoUnit( { id: parent.id } )
        .thumbnails( { ...args } );
    },
  },

  VideoFile: {
    language( parent, args, ctx ) {
      return ctx.prisma
        .videoFile( { id: parent.id } )
        .language( { ...args } );
    },

    use( parent, args, ctx ) {
      return ctx.prisma
        .videoFile( { id: parent.id } )
        .use( { ...args } );
    },

    dimensions( parent, args, ctx ) {
      return ctx.prisma
        .videoFile( { id: parent.id } )
        .dimensions( { ...args } );
    },

    stream( parent, args, ctx ) {
      return ctx.prisma
        .videoFile( { id: parent.id } )
        .stream( { ...args } );
    }
  },

  SupportFile: {
    language( parent, args, ctx ) {
      return ctx.prisma
        .supportFile( { id: parent.id } )
        .language( { ...args } );
    },
    use( parent, args, ctx ) {
      return ctx.prisma
        .supportFile( { id: parent.id } )
        .use( { ...args } );
    }
  },

  ImageFile: {
    language( parent, args, ctx ) {
      return ctx.prisma
        .imageFile( { id: parent.id } )
        .language( { ...args } );
    },

    dimensions( parent, args, ctx ) {
      return ctx.prisma
        .imageFile( { id: parent.id } )
        .dimensions( { ...args } );
    },

    use( parent, args, ctx ) {
      return ctx.prisma
        .imageFile( { id: parent.id } )
        .use( { ...args } );
    }
  },

  Thumbnail: {
    image( parent, args, ctx ) {
      return ctx.prisma
        .thumbnail( { id: parent.id } )
        .image( { ...args } );
    }
  },

  // Category: {
  //   language( parent, args, ctx ) {
  //     return ctx.prisma.category( { id: parent.id } ).language();
  //   }
  // },

  // Tag: {
  //   language( parent, args, ctx ) {
  //     return ctx.prisma.tag( { id: parent.id } ).language();
  //   }
  // }
};
