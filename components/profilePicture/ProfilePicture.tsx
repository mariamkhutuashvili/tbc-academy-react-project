"use client";

import Image from "next/image";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function ProfilePicture({ userPicture }: { userPicture: any }) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const updateUser = async () => {
      if (!blob || !user) return;
      try {
        setLoader(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/upload-user-picture`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blobUrl: blob.url,
              userSub: user.sub,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to update user picture");
        } else {
          console.log("User picture updated successfully");
          setLoader(false);
        }
      } catch (error) {
        console.error("Error updating user picture:", error);
      }
    };

    setLoader(false);

    updateUser();
  }, [blob, user]);

  return (
    <>
      <div className="profile-picture-container">
        {loader && <p className="loading-text">loading....</p>}
        {blob ? (
          <Image
            src={blob.url}
            priority={true}
            alt="Person-logo"
            className="profile-picture"
            width={150}
            height={150}
          />
        ) : (
          <Image
            src={userPicture}
            priority={true}
            alt="Person-logo"
            className="profile-picture"
            width={150}
            height={150}
          />
        )}
        <div className="camera-icon"></div>
        <input
          className="hidden-file-input"
          name="file"
          ref={inputFileRef}
          type="file"
          id="files"
          required
        />
        <label htmlFor="files" className="file-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
        </label>
      </div>
      <form
        className="upload-form"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];
          console.log(file.name);

          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <button className="button upload-button" type="submit">
          Upload
        </button>
      </form>
    </>
  );
}
