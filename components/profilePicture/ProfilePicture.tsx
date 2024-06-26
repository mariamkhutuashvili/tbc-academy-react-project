"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import type { PutBlobResult } from "@vercel/blob";
import { uploadUserPicture } from "../../app/api";
import { useI18n } from "../../locales/client";

export default function ProfilePicture({ userImage }: { userImage: string }) {
  const t = useI18n();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const [pickedImage, setPickedImage] = useState<any>(null);

  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxImageSize = 0.1 * 1024 * 1024; // 100KB file

  useEffect(() => {
    setLoader(true);
    const updateUser = async () => {
      if (!blob || !user) return;
      try {
        setLoader(true);
        const response = await uploadUserPicture(blob.url, user.sub!);

        if (!response.ok) {
          console.error("Failed to update user picture");
        } else {
          setLoader(false);
        }
      } catch (error) {
        console.error("Error updating user picture:", error);
      }
    };
    setLoader(false);
    updateUser();
  }, [blob, user]);

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  // Adding an Image Preview to the Picker
  function handleImageChange(e: any) {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    // Restrect to upload non image type files
    if (!validImageTypes.includes(file.type)) {
      alert(t("invalidImageType"));
      e.target.value = "";
      return;
    }

    // Don't give a possibility to upload image more then 1 MB
    if (file.size > maxImageSize) {
      alert(t("imageSizeExceedsLimit"));
      e.target.value = "";
      return;
    }
    // file reader
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  let imageSrc: any;
  if (pickedImage) {
    imageSrc = pickedImage;
  } else if (blob) {
    imageSrc = blob.url;
  } else {
    imageSrc = userImage;
  }

  return (
    <>
      <div className="profile-picture-container">
        {loader && <p className="loading-text">{t("loading")}....</p>}
        <Image
          src={imageSrc}
          priority={true}
          alt="user avatar"
          className="profile-picture"
          width={150}
          height={150}
        />
        <div className="file-label">
          <svg
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="camera-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
        </div>
        <input
          onChange={handleImageChange}
          className="hidden-file-input"
          name="file"
          ref={inputFileRef}
          type="file"
          id="files"
          accept="image/*"
          required
        />
      </div>
      <form
        className="upload-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoader(true);

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
          if (inputFileRef.current) {
            inputFileRef.current.value = "";
          }
        }}
      >
        {inputFileRef?.current?.files?.length! > 0 && (
          <button className="button upload-button" type="submit">
            {t("upload")}
          </button>
        )}
      </form>
    </>
  );
}
