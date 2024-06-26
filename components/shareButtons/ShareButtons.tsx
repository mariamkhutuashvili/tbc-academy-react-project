"use client";

import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
} from "react-share";
import { useI18n } from "../../locales/client";
import "./ShareButtons.css";

export default function ShareButtons({
  data,
  path,
}: {
  data: ProductFromVercel;
  path: string;
}) {
  const t = useI18n();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div>
          <div className="share-button-wrapper">
            <FacebookShareButton
              url={`https://tbc-academy-react-project.vercel.app/${path}/${data.id}`}
              title={data.title}
            >
              <FacebookIcon size={32} round />
              <span className="hover-text">{t("shareOnFacebook")}</span>
            </FacebookShareButton>
          </div>
          <div className="share-button-wrapper">
            <TwitterShareButton
              url={`https://tbc-academy-react-project.vercel.app/${path}/${data.id}`}
              title={data.title}
            >
              <XIcon size={32} round />
              <span className="hover-text">{t("shareOnTwitter")}</span>
            </TwitterShareButton>
          </div>
          <div className="share-button-wrapper">
            <LinkedinShareButton
              url={`https://tbc-academy-react-project.vercel.app/${path}/${data.id}`}
              title={data.title}
            >
              <span className="hover-text">{t("shareOnLinkedIn")}</span>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
