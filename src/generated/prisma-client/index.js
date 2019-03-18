"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Category",
    embedded: false
  },
  {
    name: "ContentType",
    embedded: false
  },
  {
    name: "Dimensions",
    embedded: false
  },
  {
    name: "ImageFile",
    embedded: false
  },
  {
    name: "ImageQuality",
    embedded: false
  },
  {
    name: "ImageUse",
    embedded: false
  },
  {
    name: "Language",
    embedded: false
  },
  {
    name: "Permission",
    embedded: false
  },
  {
    name: "ProjectPublishStatus",
    embedded: false
  },
  {
    name: "ProjectVisibility",
    embedded: false
  },
  {
    name: "SupportFile",
    embedded: false
  },
  {
    name: "Tag",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "TextDirection",
    embedded: false
  },
  {
    name: "Thumbnail",
    embedded: false
  },
  {
    name: "ThumbnailSize",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "VideoBurnedInStatus",
    embedded: false
  },
  {
    name: "VideoFile",
    embedded: false
  },
  {
    name: "VideoProject",
    embedded: false
  },
  {
    name: "VideoQuality",
    embedded: false
  },
  {
    name: "VideoStream",
    embedded: false
  },
  {
    name: "VideoUnit",
    embedded: false
  },
  {
    name: "VideoUse",
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
