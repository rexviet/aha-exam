import * as functions from "firebase-functions";
import {UserRecord} from "firebase-functions/v1/auth";
// import Mailjet from "node-mailjet";
import * as firebase from "firebase-admin";
import * as serviceAccount from "./service-account.json";
import axios from "axios";

// const API_KEY = "1c47c68d54f49b35b9a0ecbc87664a8a";
// const PRIVATE_KEY = "63d5c7ca9cfbe18de93833167a828fe7";

const firebaseParams: firebase.ServiceAccount = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
};
const defaultApp = firebase.initializeApp({
  credential: firebase.credential.cert(firebaseParams),
});


// const mailjet = Mailjet.apiConnect(API_KEY, PRIVATE_KEY);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.auth.user()
    .onCreate(async (user: UserRecord) => {
      functions.logger.info("User created:", {user: user.toJSON()});
      let emailVerified = user.emailVerified;
      if (!user.emailVerified &&
      user.providerData[0].providerId !== "password") {
        await defaultApp.auth().updateUser(user.uid, {emailVerified: true});
        emailVerified = true;
      }

      const body = {
        uid: user.uid,
        emailVerified,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      try {
        await axios.post("https://api-dev-aha.coinlab.network/users", body);
      } catch (err) {
        console.error("err cmnr:", err);
        functions.logger.error("err cmnr!", err);
      }
    });
