import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setHeading,
  setSubHeading,
  setDescription,
  setNotes,
  setImages,
  setTags,
  setSnippet,
} from "../../actions";

function Form(props) {
  const [codeSnippet, setcodeSnippet] = useState("");
  const [UploadFile, setUploadFile] = useState({});
  const [UplaodImgBase64, setUplaodImgBase64] = useState("");
  const dispatch = useDispatch();

  const handleCodeSnippetChange = (e) => {
    setcodeSnippet(e.target.value);
    dispatch(setDescription(e.target.value));
  };

  const handleFileUpload = async (files) => {
    setUploadFile(files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUplaodImgBase64(reader.result);
      dispatch(setImages(reader.result));
    });
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => dispatch(setHeading(e.target.value))}
        placeholder="Heading"
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
      />
    </>
  );
}

export default Form;
