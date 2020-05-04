# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/IIP-Design/content-commons-server/compare/v4.0.0...HEAD)
_This sections lists changes committed since most recent release_

**Added:**
- Set up testing framework and added initial tests
- Added GRAPHIC schema & data model
- Add `created` to package transform

**Changed:**
- Pass pagination arguments to package resolver

# [4.0.0](2020-04-27)

**Added:**
- Added Package schema & resolver
- Added Document schema & resolver
- Seeded bureaus and regions
- Added new publish statuses to better support polling
- Added User, Document and Package fragments
- Authentication required to access all resolvers except Team
- Added CloudflareSignin validation and resolver
- Added 'prisma-seed' to package scripts
- Added ability to store assets in S3 under "type" 
- Added Document and Package publish to Elasticsearch
- Added U.S. Missions to teams

**Changed:**
- Disabled subscriptions
- Removed projectStatusChange subscription
- Moved user to context object

# [3.1.0](2020-01-13)

**Added:**

- Added Front Office and Press Office to Team list and update seeding script

**Changed:**

- Change asset urls to include full path
- Updated prisma data model:
  - Add DocumentConverstionFormat type
  - Add status and content fields to DocumentFile type
  - Add status field to Package type
  - Rename ProjectPublishStatus type to PublishStatus
  - Rename ProjectStatus type to Status

# [3.0.0](2019-12-02)

Initial release of the server component of the Commons authoring platform. Versioning will start at version 3 to keep it aligned with it's related client application which is currently at version 3.

**Added:**

- Apollo GraphQL server integration using Prima to simplify database workflows
- RabbitMQ integration for publish and unpublish workflows
- AWS S3 integration for asset storage
- AWS SES integration for email functionality
- Vimeo integration
- Schema definitions for all core types needed for video project
- Database seeding for languages, taxonomies, teams and uses
- Authentication, login, logout
- Ability to create, delete, update, publish, unpublish video projects
- Bulk unpublish and delete
- ffprobe to fetch metadata from multimedia streams
- application whitelist
