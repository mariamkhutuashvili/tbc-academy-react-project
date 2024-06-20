"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./ProductGallery.css";

export default function ProductGallery({ gallery }: { gallery: Gallery[] }) {
  const [thumbsSwiper, setThumbSwiper] = useState<any>(null);

  return (
    <div className="gallery-container">
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : undefined,
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
                className="main-gallery-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbSwiper}
        loop={true}
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
              <div className="overlay"></div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
