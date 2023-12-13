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

## [1.2.0] - 2023-12-01

### Added

- Filtering notes by tags
- Pagination form notes

### Removed

- Unnecessary paths and actions for tag handling

## [1.3.0] - 2023-12-02

### Changed

 - Method of getting tutors - pagination and filtering added

## [1.3.1] - 2023-12-04

### Fixed

 - Change redundant method for mongoose and spellings mistakes

 ## [1.4.0] - 2023-12-06

### Added

 - Add routes for post categories, separated category names into constant variables
 - Add filtering by categories to posts

### Fixed

 - Correct way of fetching user data into other models using populate

### Changed
### Removed

 ## [1.5.0] - 2023-12-12

### Added

 - Reset Password template for mailService
 - Greeting template
 - Routes and controllers made for reset password functionality 

### Changed
 - Updated email template for mailService (contact form)


 ## [1.5.1] - 2023-12-13

### Fixed

- Improved tutor rating display - one decimal place
- Displaying statistics about meetings for all logged in users not for students only
- Token generation only when logging in, removing generation upon registration to prevent saving in cookies