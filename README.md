# `DEPLOYED`
https://questionnaire-3a991.web.app

# `ADD FIREBASE CONFIG`
Add firebase configs to `src\config\firebase.js`
# `INITIALISE FIRESTORE`
Add firestore and add the following rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}