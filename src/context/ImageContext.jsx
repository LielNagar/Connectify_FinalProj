import React, { createContext, useState } from "react";
import { getDatabase, ref, push, set, child } from "firebase/database";
import { storage } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable, ref as sRef } from "firebase/storage";

export const ImageContext = createContext();

export default function ImageContextProvider(props) {
  const [isRender, setIsRender] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const saveImg = async (file, userId) => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'users')).key;
    console.log(newPostKey)
    const usersRef = ref(db, "users/" + userId);
    const newUsersRef = push(usersRef);
    const id = uuid();
    const storageRef = sRef(storage, id);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      (error) => {
        console.log(error);
      },
      async () => {
        await set(newUsersRef, {
          Img:
            "https://firebasestorage.googleapis.com/v0/b/finalproj-connectify.appspot.com/o/" +
            id +
            "?alt=media",
        });
      }
    );
  };

  return (
    <ImageContext.Provider
      value={{
        saveImg,
        setIsRender,
        isRender,
        userImage,
        setUserImage,
        userProfileImage,
        setUserProfileImage,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
}
