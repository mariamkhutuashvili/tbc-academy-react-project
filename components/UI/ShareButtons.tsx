"use client";

import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { useI18n } from "../../locales/client";

interface Product {
  id: string;
  title: string;
}

interface ShareButtonsProps {
  product: Product;
}

export default function ShareButtons({ product }: ShareButtonsProps) {
  const t = useI18n();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <div className="share-button-wrapper">
            <FacebookShareButton
              url={`https://tbc-academy-react-project.vercel.app/products/${product.id}`}
              title={product.title}
            >
              <FacebookIcon size={32} round />
              <span className="hover-text">{t("shareOnFacebook")}</span>
            </FacebookShareButton>
          </div>
          <div className="share-button-wrapper">
            <TwitterShareButton
              url={`https://tbc-academy-react-project.vercel.app/products/${product.id}`}
              title={product.title}
            >
              <TwitterIcon size={32} round />
              <span className="hover-text">{t("shareOnTwitter")}</span>
            </TwitterShareButton>
          </div>
          <div className="share-button-wrapper">
            <LinkedinShareButton
              url={`https://tbc-academy-react-project.vercel.app/products/${product.id}`}
              title={product.title}
            >
              <span className="hover-text">{t("shareOnLinkedIn")}</span>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
