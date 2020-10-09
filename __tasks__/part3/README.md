# Part 3: Securing your application and hosting it on the Firebase cloud 🔐 ☁️
Welcome to part 3. In part 1 and part 2 we mostly focused on data operations and initial project configuration. In this part we will take things a bit further and setup some better security and also host our app to the web. 

## Task 1: Add authentication to the application
So far we have Anonymous sign in method configured. We would like to change this to using Github auth instead to ensure that we actually have proper users in our game. 

1. First we need to create an OAuth application on Github to allow us to get user information. Head to the [Register page](https://github.com/settings/applications/new) on Github. 
- Choose a name for your app. 
- For Homepage URL you can use the template `https://**projectId**.web.app`, replace the `**projectId**` with your project id.
- For Authorization callback URL use `https://**projectId**.firebaseapp.com/__/auth/handler` and remember to replace with your project id.
 2. After registering the app you will be given a client Id and Client secret. We will use those in the next step. 

3. We now need to configure our Firebase to handle a new sign-in method for Github. Go to the [Firebase console](https://console.firebase.google.com/?authuser=0) again and enter the Authentication settings -> Sign-in method. Enable the Github sign-in method and add the client ID and Client Secret given when registering the app on Github. You can now also deactivate the Anonymous sign in method as we will not use it anymore.

4. We are now ready to replace our Anonymous Auth with Github. Go to `src/auth/useFirebaseAuth.ts` where we have pre-configured all the apps handling of authentication and replace the `signInAnonymously` function with a pop up sign in method instead. See [Firebase docs](https://firebase.google.com/docs/auth/web/github-auth#handle_the_sign-in_flow_with_the_firebase_sdk) for more details.

5. Test out your newly configured authentication provider, if all goes well you should now be able to login with a Github user instead of an anonymous account.

👉 **Tip:** If you need to find your project ID you can go to [Firebase console](https://console.firebase.google.com/?authuser=0). Click ⚙️ Project settings and the project ID is displayed in the top pane.


## Task 2: Secure your Cloud Firestore and data
TODO: Add some details here Didrik?

## Task 3: Host the application on the cloud ☁️ 
TODO: Add some better descriptions

1. Initate Firebase on the project. Use build as path for the source code. 
2. build the project
3. Run deploy command

See https://firebase.google.com/docs/hosting/quickstart for detailed steps. 
