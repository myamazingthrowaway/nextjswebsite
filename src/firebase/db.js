import { db } from "./firebase";

// User API

export const doCreateUser = (id, email, displayName, photoUrl, bannedStatus) =>
  db.ref(`users/${id}`).set({
    email,
    displayName,
    photoUrl,
    bannedStatus
  });

export const onceGetUsers = () => db.ref("users").once("value");

// Other db APIs ...
