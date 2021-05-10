import merge from 'lodash/merge';
import AuthResolvers from './Auth';
// import SharedResolvers from './Shared';
import LanguageResolvers from './Language';
import RegionResolvers from './Region';
import BureauResolvers from './Bureau';
import TaxonomyResolvers from './Taxonomy';
import TeamResolvers from './Team';
import PolicyPriorityResolvers from './PolicyPriority';
import UserResolvers from './User';
import UtilResolvers from './Util';
import DocumentResolvers from './Document';
import VideoResolvers from './Video';
import PackageResolvers from './Package';
import GraphicResolvers from './Graphic';

const resolvers = merge(
  AuthResolvers,
  UtilResolvers,
  // SharedResolvers,
  LanguageResolvers,
  TaxonomyResolvers,
  RegionResolvers,
  BureauResolvers,
  UserResolvers,
  TeamResolvers,
  PolicyPriorityResolvers,
  DocumentResolvers,
  VideoResolvers,
  PackageResolvers,
  GraphicResolvers,
);

export default resolvers;
