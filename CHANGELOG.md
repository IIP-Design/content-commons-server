# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
