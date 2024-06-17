// import { useEffect, useReducer, useState } from "react";
// import { useLocalStorage } from "../../../useLocalStorageHook";
// import { reducer } from "../../../useReducerHook";
import Image from "next/image";
import Link from "next/link";
import Title from "../../../../components/UI/Title";
import { getI18n } from "../../../../locales/server";
import { getProducts, getUserCart } from "../../../api";
import ClearCartButton from "../../../../components/cartControls/ClearCartButton";
import ChangeQuantityButton from "../../../../components/cartControls/ChangeQuantityButton";
import RemoveFromCartButton from "../../../../components/cartControls/RemoveFromCartButton";
import "../../../../styles/Cart.css";

export const metadata = {
  title: "Cart",
  description: "Shopping Cart - Review Your Items",
};

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   thumbnail: string;
//   price: number;
// }

export default async function Cart() {
  const t = await getI18n();
  // const [isClient, setIsClient] = useState(false);
  // const [cardsData, setCachedValue] = useLocalStorage("selectedProducts", []);
  // const [SelectedProducts, dispatch] = useReducer(reducer, cardsData);

  const cart = await getUserCart();
  const cartProductsArray = cart ? Object.entries(cart?.products) : [];
  const cartProducts = await getProducts();

  const cartProductMap = new Map(cartProductsArray);

  const filteredProducts = cartProducts
    .filter((product: any) => cartProductMap.has(product.id.toString()))
    .map((product: any) => ({
      ...product,
      quantity: cartProductMap.get(product.id.toString()),
    }));

  const totalPrice = filteredProducts.reduce((acc: number, item: any) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  console.log(filteredProducts);
  // useEffect(() => {
  //   setCachedValue(SelectedProducts);
  // }, [SelectedProducts, setCachedValue]);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // const changeQuantity = (
  //   action: "INCREMENT" | "DECREMENT" | "REMOVE",
  //   card: Product
  // ) => {
  //   dispatch({ type: action, payload: card });
  // };

  // const handleProductRemove = (action: "RESET") => {
  //   dispatch({ type: action });
  // };

  return (
    <div className="cart">
      <Title titleName={t("cart")} />
      <div className="cart-container">
        <Link href="/" className="button back-to-shop-button">
          {t("backToShop")}
        </Link>
        <ClearCartButton />
        <div className="cart-items">
          {filteredProducts.map((item: any) => (
            <div key={item.id} className="product-card">
              <div className="product-image">
                <Image
                  src={item.photo_gallery[0].img_url}
                  width={50}
                  height={50}
                  alt={item.title}
                />
              </div>
              <div className="product-details">
                <h2>{item.title}</h2>
                <p>{item.brand}</p>
                <p className="prod-price">${item.price}</p>
              </div>
              <ChangeQuantityButton
                id={item.id}
                quantity={item.quantity}
                price={item.price}
              />
              <RemoveFromCartButton id={item.id} />
            </div>
          ))}
          <span>
            {t("totalPrice")}: ${totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
