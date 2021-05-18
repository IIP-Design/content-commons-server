"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Permission",
    embedded: false
  },
  {
    name: "ContentType",
    embedded: false
  },
  {
    name: "ProjectType",
    embedded: false
  },
  {
    name: "PackageType",
    embedded: false
  },
  {
    name: "VideoBurnedInStatus",
    embedded: false
  },
  {
    name: "VideoQuality",
    embedded: false
  },
  {
    name: "ImageQuality",
    embedded: false
  },
  {
    name: "PublishStatus",
    embedded: false
  },
  {
    name: "Visibility",
    embedded: false
  },
  {
    name: "TextDirection",
    embedded: false
  },
  {
    name: "ThumbnailSize",
    embedded: false
  },
  {
    name: "Copyright",
    embedded: false
  },
  {
    name: "ContentField",
    embedded: false
  },
  {
    name: "GraphicStyle",
    embedded: false
  },
  {
    name: "SocialPlatform",
    embedded: false
  },
  {
    name: "Country",
    embedded: false
  },
  {
    name: "Region",
    embedded: false
  },
  {
    name: "Office",
    embedded: false
  },
  {
    name: "Bureau",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "Language",
    embedded: false
  },
  {
    name: "PolicyPriority",
    embedded: false
  },
  {
    name: "Category",
    embedded: false
  },
  {
    name: "Tag",
    embedded: false
  },
  {
    name: "LanguageTranslation",
    embedded: false
  },
  {
    name: "Thumbnail",
    embedded: false
  },
  {
    name: "DocumentConversionFormat",
    embedded: false
  },
  {
    name: "Package",
    embedded: false
  },
  {
    name: "Playbook",
    embedded: false
  },
  {
    name: "Toolkit",
    embedded: false
  },
  {
    name: "GraphicProject",
    embedded: false
  },
  {
    name: "VideoProject",
    embedded: false
  },
  {
    name: "VideoUnit",
    embedded: false
  },
  {
    name: "VideoStream",
    embedded: false
  },
  {
    name: "Dimensions",
    embedded: false
  },
  {
    name: "DocumentUse",
    embedded: false
  },
  {
    name: "VideoUse",
    embedded: false
  },
  {
    name: "ImageUse",
    embedded: false
  },
  {
    name: "SupportFileUse",
    embedded: false
  },
  {
    name: "Project",
    embedded: false
  },
  {
    name: "VideoFile",
    embedded: false
  },
  {
    name: "ImageFile",
    embedded: false
  },
  {
    name: "SupportFile",
    embedded: false
  },
  {
    name: "DocumentFile",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
