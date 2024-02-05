# ProjectDemo - https://650c5aa79f7f513b9cbb13da--joyful-cactus-cf9994.netlify.app/login

# Getting Started with Create React App
Creating a complete React app with Firebase authentication, registration, and protected routes.
Here's an outline of the steps you can follow to create the app:

**Step 1: Set Up Firebase**

- Create a Firebase project on the Firebase Console (https://console.firebase.google.com/).
- Set up Firebase Authentication and Firestore (or Realtime Database) for your project.
- Obtain the Firebase configuration object that includes your API keys.

**Step 2: Create a React App**

- Set up a new React project using Create React App or your preferred method.

**Step 3: Install Dependencies**

- Install Firebase and React Router dependencies:

```bash
npm install firebase react-router-dom
```

**Step 4: Firebase Configuration**

- Initialize Firebase in your React app using the configuration object obtained in Step 1.

```javascript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
```

**Step 5: Create Authentication Components**

- Create components for login and registration forms. You can use Firebase's `signInWithEmailAndPassword` and `createUserWithEmailAndPassword` methods.

**Step 6: Protected Routes**

- Create a protected route component to restrict access to certain routes for authenticated users. You can use React Router for this.

```javascript
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Check if the user is not authenticated and redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

```

**Step 7: App Routing**

- Set up your app's routing using React Router. Include routes for login, registration, and any protected pages.

**Step 8: User Authentication State**

- Use Firebase's `onAuthStateChanged` to maintain the user's authentication state.

**Step 9: Store Data in Local Storage**

- Implement logic to store the user's authentication state in local storage. You can use this to keep users authenticated after a page reload.


**Step 11: Styling**

- Style your components and pages as needed to make your app look good.

**Step 12: Testing and Deployment**

- Test your app thoroughly and deploy it to a hosting service (e.g., Firebase Hosting, Netlify, Vercel).



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
