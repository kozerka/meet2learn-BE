# Changelog

## [Unreleased]

## [0.2.0] - 2023-11-20

### Added

- Server configuration
- DB connection

## [0.3.0] - 2023-11-20

### Added

- Add models for mongoose

### Fixed
### Changed
### Removed

## [1.0.0] - 2023-11-22

### Added

- Add routes with all controllers (contactRouter, userRouter, postRouter, meetingRouter, conversationRouter, noteRouter, commentRouter, tutorRouter, reviewRouter)
- Add middlewares (authMiddleware, roleMiddleware)
- Add error handling (errorMiddleware, validationMiddleware)
- Add utils for calculating tutors rating
- Add additional concepts fo note taking and for user forum

### Fixed
### Changed
### Removed

- MeetingPost model removed - optimization in Meeting model

## [1.0.1] - 2023-11-29

### Fixed

- Removed a problem that may occur when trying to update user data - email address 

## [1.1.0] - 2023-11-30

### Added

- Config for cloudinary and multer
- Add routes for uploadAvatar
- Add controller for upload-avatar route 
