"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import OpenImage from "../openImage/OpenImage";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./ProductGallery.css";

export default function ProductGallery({ gallery }: { gallery: Gallery[] }) {
  const [thumbsSwiper, setThumbSwiper] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="gallery-container">
        <Swiper
          loop={false}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed
                ? thumbsSwiper
                : undefined,
          }}
          modules={[FreeMode, Thumbs]}
          className="main-gallery"
        >
          {gallery.map((img, index) => (
            <SwiperSlide key={index} className="main-gallery-slide">
              <div className="image-container">
                <Image
                  src={img.img_url}
                  alt="galleryImg"
                  width={300}
                  height={300}
                  onClick={() => handleOpen(img.img_url)}
                  className="main-gallery-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbSwiper}
          loop={false}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbnail-gallery"
        >
          {gallery.map((img, index) => (
            <SwiperSlide key={index} className="thumbnail-gallery-slide">
              <button className="thumbnail-button">
                <Image
                  src={img.img_url}
                  alt="galleryImg"
                  width={300}
                  height={300}
                  className="thumbnail-image"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {selectedImage && (
        <OpenImage
          open={open}
          handleClose={handleClose}
          imageUrl={selectedImage}
        />
      )}
    </>
  );
}
