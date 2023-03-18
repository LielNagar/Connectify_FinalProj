import React, { createContext, useState } from "react";
import axios from "axios";

export const ImageContext = createContext();

export default function ImageContextProvider(props) {
  const [isRender, setIsRender] = useState(false);

  const saveImg = async (file, userId) => {
    console.log(file);
    let formData = new FormData();
    formData.append("avatar", file);
    await axios
      .post(`http://localhost:8080/users/${userId}/avatar`, formData)
      .then((response) => {
        if (response.status === 200) setIsRender(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toBase64 = (arr) => {
    return btoa(
      arr.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <ImageContext.Provider value={{ saveImg, toBase64, setIsRender, isRender }}>
      {props.children}
    </ImageContext.Provider>
  );
}
