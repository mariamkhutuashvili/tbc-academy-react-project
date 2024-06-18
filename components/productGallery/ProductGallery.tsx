"use client";

import Image from "next/image";

export default function ProductGallery({
  product,
}: {
  product: ProductFromVercel;
}) {
  return (
    <div>
      {/* <Image
        src={product.photo_gallery[0].img_url}
        alt="product"
        width={400}
        height={400}
        priority
      /> */}
      {product.photo_gallery.map((gallery) => {
        return (
          //   <div >
          <Image
            key={gallery.id}
            src={gallery.img_url}
            alt="product"
            width={300}
            height={300}
            priority
          />
          //   </div>
        );
      })}
    </div>
  );
}
