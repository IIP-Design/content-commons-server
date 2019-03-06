export default {
  Query: {
    videoProjects ( parent, args, ctx ) {
      return ctx.prisma.videoProjects();
    },

    videoProject ( parent, args, ctx ) {
      return ctx.prisma.videoProject( { id: args.id } );
    },

    videoUnits ( parent, args, ctx ) {
      return ctx.prisma.videoUnits();
    },

    videoUnit ( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: args.id } );
    },

    videoFiles ( parent, args, ctx ) {
      return ctx.prisma.videoFiles();
    },

    videoFile ( parent, args, ctx ) {
      return ctx.prisma.videoFile( { id: args.id } );
    },

    imageFiles ( parent, args, ctx ) {
      return ctx.prisma.imageFiles();
    },

    imageFile ( parent, args, ctx ) {
      return ctx.prisma.imageFile( { id: args.id } );
    },

    supportFiles ( parent, args, ctx ) {
      return ctx.prisma.supportFiles();
    },

    supportFile ( parent, args, ctx ) {
      return ctx.prisma.supportFile( { id: args.id } );
    },

    categories ( parent, args, ctx ) {
      return ctx.prisma.categories();
    },

    category ( parent, args, ctx ) {
      return ctx.prisma.category( { id: args.id } );
    },

    tags ( parent, args, ctx ) {
      return ctx.prisma.tags();
    },

    tag ( parent, args, ctx ) {
      return ctx.prisma.tag( { id: args.id } );
    }
  },

  Mutation: {
    async createVideoProject ( parent, args, ctx ) {
      const videoProject = await ctx.prisma.createVideoProject( {
        ...args
      } );

      return videoProject;
    },

    updateVideoProject ( parent, args, ctx ) {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.updateVideoProject( {
        data: updates,
        where: {
          id: args.id
        }
      } );
    },

    deleteVideoProject( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoProject( { id } );
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

    deleteVideoUnit( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoUnit( { id } );
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

    deleteVideoFile ( parent, { id }, ctx ) {
      return ctx.prisma.deleteVideoFile( { id } );
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

    deleteSupportFile ( parent, { id }, ctx ) {
      return ctx.prisma.deleteSupportFile( { id } );
    },

    async createCategory ( parent, args, ctx ) {
      const { data } = args;
      const category = await ctx.prisma.createCategory( {
        ...data
      } );

      return category;
    },

    updateCategory ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateCategory( {
        data,
        where: { id }
      } );
    },

    deleteCategory ( parent, { id }, ctx ) {
      return ctx.prisma.deleteCategory( { id } );
    },

    async createTag ( parent, args, ctx ) {
      const { data } = args;
      const tag = await ctx.prisma.createTag( {
        ...data
      } );

      return tag;
    },

    updateTag ( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where: { id } } = updates;
      return ctx.prisma.updateTag( {
        data,
        where: { id }
      } );
    },

    deleteTag ( parent, { id }, ctx ) {
      return ctx.prisma.deleteTag( { id } );
    }
  },

  VideoUnit: {
    language( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: parent.id } ).language();
    },

    files( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: parent.id } ).files();
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: parent.id } ).tags();
    },

    categories( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: parent.id } ).categories();
    },

    thumbnails( parent, args, ctx ) {
      return ctx.prisma.videoUnit( { id: parent.id } ).thumbnails();
    },
  },

  VideoFile: {
    language( parent, args, ctx ) {
      return ctx.prisma.videoFile( { id: parent.id } ).language();
    },

    use( parent, args, ctx ) {
      return ctx.prisma.videoFile( { id: parent.id } ).use();
    },

    dimensions( parent, args, ctx ) {
      return ctx.prisma.videoFile( { id: parent.id } ).dimensions();
    },

    stream( parent, args, ctx ) {
      return ctx.prisma.videoFile( { id: parent.id } ).stream();
    }
  },

  SupportFile: {
    language( parent, args, ctx ) {
      return ctx.prisma.supportFile( { id: parent.id } ).language();
    }
  },

  ImageFile: {
    language( parent, args, ctx ) {
      return ctx.prisma.imageFile( { id: parent.id } ).language();
    },

    dimensions( parent, args, ctx ) {
      return ctx.prisma.imageFile( { id: parent.id } ).dimensions();
    }
  },

  Thumbnail: {
    image( parent, args, ctx ) {
      return ctx.prisma.thumbnail( { id: parent.id } ).image();
    }
  },

  Category: {
    language( parent, args, ctx ) {
      return ctx.prisma.category( { id: parent.id } ).language();
    }
  },

  Tag: {
    language( parent, args, ctx ) {
      return ctx.prisma.tag( { id: parent.id } ).language();
    }
  }
};
