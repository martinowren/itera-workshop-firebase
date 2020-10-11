# Part 3: Securing your application and hosting it on the Firebase cloud 🔐 ☁️
Welcome to part 3! In part 1 and 2 we focused on data operations and initial project configuration. In this part, we will take things a bit further and set up some better security and host our app to the web. 

## Task 1: Add authentication to the application
So far we have an Anonymous sign in method configured. We would like to change this to using Github authentication instead, to ensure that we actually have real users in our game. 

1. First, we need to create an OAuth application on Github to allow us to get user information. Head to the [Register page](https://github.com/settings/applications/new) on Github. 
    - Choose a name for your app.
    - For "Homepage URL" you can use the template `https://**projectId**.web.app`, and replace the `**projectId**` with your project id. You can find this in the config in the `firebase.ts` file or in the [Firebase console](https://console.firebase.google.com/?authuser=0).
    - For "Authorization callback URL" use `https://**projectId**.firebaseapp.com/__/auth/handler` and remember to replace with your project id.

2. After registering the app you will be given a "Client ID" and a "Client Secret". We will use these in the next step.

3. We now need to configure our Firebase to handle a new sign-in method for Github. Go to the [Firebase console](https://console.firebase.google.com/?authuser=0) and to `Authentication -> Sign-in method`. Enable the Github sign-in method and add the Client ID and Client Secret from the previous step. You can also deactivate the Anonymous sign in method.

4. We are now ready to replace our Anonymous Auth with Github Auth! Navigate to `src/auth/useFirebaseAuth.ts` where we have pre-configured all the apps handling of authentication and replace the `signInAnonymously` function with a pop up sign in method. See [Firebase docs](https://firebase.google.com/docs/auth/web/github-auth#handle_the_sign-in_flow_with_the_firebase_sdk) for more details, you can skip the optional steps.

5. Verify your newly configured authentication provider. Log out of the application, and try logging in again. If all goes well you should now be able to authenticate with your Github user!


## Task 2: Secure your Cloud Firestore and data

❓ Remember in part 1 that we started our Cloud Firestore database in test mode? Who can read our database now and what are the consequences?

The issue is that we now allow all calls to our database without any authentication. Let's fix that!

1. Go to the [Firebase console](https://console.firebase.google.com/?authuser=0) and to `Cloud Firestore > Rules` tab.
2. Change the rules to only allow authenticated users to make changes. See the [official documentation](https://firebase.google.com/docs/firestore/security/get-started#writing_rules) for some inspiration 💡 

## Task 3: Host the application on the cloud ☁️ 
With our app fairly secure, we can start thinking about deploying it to the world wide web and play with our friends remote 👭👬 Firebase Hosting makes this very simple!

ℹ️ Read the [official documentation](https://firebase.google.com/docs/hosting) for more information on how Firebase Hosting works.

1. First, we want to initialize Firebase on the project. We need to have the Firebase CLI installed first. Install it with npm using the following command in a terminal: `npm install -g firebase-tools`. You might need to run this command with `sudo` since this command installs firebase tools globally on your computer.
   
2. Login to your Firebase account with the command `firebase login` so that Firebase CLI can retrieve information from your project.

3. Now we can initialize our project. Navigate to the root folder of the git repository and use the command `firebase init hosting`.
    - Select "Use an existing project" and select the project you made for this course.
    - For the public directory to use, type in `build`. This is the path that our app will use when building the source files.
    - Since we are using React, we want to configure it as a single-page app. Answer `yes` to this question.
    - Answer `no` to setting up automatic builds and deploys with GitHub.
    - If you get a question of overwriting `index.html` you can answer `no`. We will build our files again anyways.

4. If you went through the Firebase initialization process successfully, the Firebase CLI should have created two files for you: `firebase.json` and `.firebaserc`. Take a look at the files and see if you can understand what they do. See the documentation for [firebase.json](https://firebase.google.com/docs/cli#the_firebasejson_file) and [.firebaserc](https://firebase.google.com/docs/cli#project_aliases) for more information. 

5. Next up is running the build command so that we generate a production ready folder with all of our latest changes. You can do this with the command `npm run build`.

6. The final step is to deploy our awesome application to Firebase Hosting. Use the command `firebase deploy --only hosting`.

👉 **Tip:** If you want to turn off hosting, you can do this using the command `firebase hosting:disable`.

You have made it! You should now have a fully working Cards Against Developers app running and being served from Firebase 🏆  🎉 .  Check out your application on the url `PROJECT_ID.firebaseapp.com` and share it with your friends to play!

## Final note
Remember to clean up and delete your project if you are not going to use it anymore. There should be no running costs with a free account, but it's good to clear our app in case of security issues 😊
