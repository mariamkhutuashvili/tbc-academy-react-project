"use client";

import { useState } from "react";
import { useI18n } from "../../locales/client";
import Image from "next/image";
import Link from "next/link";
import food from "../../public/assets/food.png";
import toy from "../../public/assets/toys.png";
import bed from "../../public/assets/beds.png";
import accessories from "../../public/assets/accessories.png";
import grooming from "../../public/assets/grooming.png";
import litter from "../../public/assets/litter.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories: Category[] = [
  { id: "categories", name: "Filter by Category" },
  { id: "food", name: "Cat Food" },
  { id: "toys", name: "Playtime Toys" },
  { id: "beds", name: "Cat Beds" },
  { id: "accessories", name: "Cat Accessories" },
  { id: "litter", name: "Cat Litter" },
  { id: "grooming", name: "Grooming Essentials" },
];
const categoriesForSlider: any = [
  { name: "food", id: 1, img: food },
  { name: "toys", id: 2, img: toy },
  { name: "beds", id: 3, img: bed },
  { name: "accessories", id: 4, img: accessories },
  { name: "litter", id: 4, img: litter },
  { name: "grooming", id: 5, img: grooming },
];

export default function HomeData({
  products,
}: {
  products: ProductsDataProps;
}) {
  const t = useI18n();

  const [selectedCategory, setSelectedCategory] = useState("categories");

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
  };

  const filteredProducts =
    selectedCategory === "categories"
      ? products
      : products.filter(
          (product: any) => product.category === selectedCategory
        );
  return (
    <main className="home-main-container">
      <div className="categories-container">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              className={selectedCategory === category.id ? "selected" : ""}
              onClick={() => handleCategoryClick(category.id)}
            >
              {t(
                category.id as
                  | "categories"
                  | "food"
                  | "toys"
                  | "beds"
                  | "accessories"
                  | "grooming"
                  | "litter"
              )}
            </button>
          );
        })}
      </div>
      <div className="products-grid">
        {filteredProducts.slice(0, 4).map((prod: ProductFromVercel) => (
          <div key={prod.id} className="product-card">
            <Image
              src={prod.photo_gallery[0].img_url}
              alt={prod.title}
              width={300}
              height={300}
              className="product-image"
            />
            <h2 className="product-title">{prod.title}</h2>
            <p className="product-price">${prod.price}</p>
          </div>
        ))}
      </div>
      <button className="button show-all-button">
        <Link href={"/products"}>{t("showAll")}</Link>
      </button>
      <h2 style={{ textAlign: "center", padding: "50px 0" }}>
        {t("popularCategories")}
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="swiper-container">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Mousewheel, Keyboard, Navigation, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1080: {
                slidesPerView: 4,
              },
            }}
          >
            {categoriesForSlider.map((category: any) => {
              return (
                <SwiperSlide key={category.id}>
                  <div className="category-wrapper">
                    <div className="category-image-wrap">
                      <Image
                        src={category.img}
                        alt={category.name}
                        width={200}
                        height={200}
                      />
                    </div>
                    <span>
                      {t(
                        category.name as
                          | "categories"
                          | "food"
                          | "toys"
                          | "beds"
                          | "accessories"
                          | "grooming"
                          | "litter"
                      )}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </main>
  );
}
