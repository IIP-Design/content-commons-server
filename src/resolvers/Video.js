export default {
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

    updateManyVideoProjects ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyVideoProjects( { data, where } );
    },

    deleteVideoProject( parent, { id }, ctx ) {
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

    deleteVideoFile ( parent, { id }, ctx ) {
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
