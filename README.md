
# Football challenge

![App](https://github.com/BrunoCantero/footballChallenge/assets/ios_screenshot.png)

## App Instructions
#### Setup and Installation
- Clone the Repository
- install Dependencies
Inside the app directory: 
``npm install``
- Install iOS Pods: Navigate to the iOS directory and install pods ``cd ios && pod install``
Running the Application
- Start Metro Bundler
To start a new instance of the Metro Bundler: ``npm run start``
### Run on iOS Emulator
To install and run the application on an iOS emulator: ``npm run ios ``
### Run on Android Emulator
To install and run the application on an Android emulator: ``npm run Android ``

# Considerations for Improvements

 ### Styled Components:
 - Utilize styled components to enhance the architecture and naming of components.

### Design Patterns: 
- Apply design patterns, such as the Presentational Container pattern, for better structure.

### Unit Testing: 
- Implement unit tests to ensure code quality. (Note: This is currently not implemented).

### Service Management: 
- Improve service management for API calls. Avoid making API calls directly from the component.

### Manage Constants:
 - Manage endpoint URLs, TOKENs, and other constants in separate files.

### Error Handling: 
- Implement error handling for non-200 API response statuses.

