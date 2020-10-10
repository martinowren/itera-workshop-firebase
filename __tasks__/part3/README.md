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

❓ Remember in part 1 that we we started our Cloud Firestore database in test mode? Who can read our database now and what consequences may it have?

Hopefully you had some ideas on the issues with our current security rules. They simply allow all calls to our database without any authentication. Let's fix it in this task.

1. Go to the [Firebase console](https://console.firebase.google.com/?authuser=0) again and select the Cloud Firestore and then the rules tab. 
2. Change the rules to only allow authenticated users to make changes. See the [official documentation](https://firebase.google.com/docs/firestore/security/get-started#writing_rules) for some inspiration 💡 

## Task 3: Host the application on the cloud ☁️ 
With our app fairly secure we can start thinking about deploying it to the world wide web so that we can game with our remote friends 👭 👬 Firebase hosting is perfect for this. Remember you can read the [official docs](https://firebase.google.com/docs/hosting) for more information on how Firebase Hosting works. 

1. First we want to initate Firebase on the project. We need to have the Firebase CLI installed first. We can install it with NPM by using the following command in a terminal `npm install -g firebase-tools`.
2. Login to your firebase account with `firebase login` so that Firebase CLI can retreive information from your project.
3. Now we can initiate our project. Navigate to the root folder of the git repository and use the command `firebase init hosting`. 
- Select "use an existing project" and choose the project you made for this course. 
- For what public directory to use write in `build` this is the path our app will use when building the source files.
- We also want to configure it as a single-page app since we are using React. Write in `yes` when you are asked.
- If you get question on overwriting index.html you can write in `no`. We will anyway build our files again.
4. If you went through the Firebase init process sucessfully the Firebase CLI should have created two files for you. One firebase.json and the other .firebaserc. Take a look at the files and see if you can understand what they configure. See the [firebase.json documentation](https://firebase.google.com/docs/cli#the_firebasejson_file) and [.firebaserc documentation](https://firebase.google.com/docs/cli#project_aliases) for more information. 
5. Next up is running the build command so that we make a production ready folder with all our latest changes. You can do this by running `npm run build`.
3. The final step is to deploy our awesome application to Firebase Hosting. `Run firebase deploy --only hosting`. 

You have made it! You should now have a fully working Cards Againsts Developers app running and being served from Firebase 🏆  🎉 .  Check out your application on the url `PROJECT_ID.firebaseapp.com` and share it with your friends.

## Final note
Remember to clean up and delete your project if you are not going to use it any more. There should be no runnings costs with a free account, but its good to clear our app in case of security issues 😊 
