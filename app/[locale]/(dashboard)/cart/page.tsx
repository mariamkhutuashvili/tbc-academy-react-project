// import Image from "next/image";
// import { useEffect, useReducer, useState } from "react";
// import { useLocalStorage } from "../../../useLocalStorageHook";
// import { reducer } from "../../../useReducerHook";
import Title from "../../../../components/UI/Title";
import { getI18n } from "../../../../locales/server";
import ChangeQuantityButton from "../../../../components/UI/ChangeQuantityButton";
import ClearCartButton from "../../../../components/UI/ClearCartButton";
import { getProducts, getUserCart } from "../../../api";
import "../../../../styles/Cart.css";

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

  const cart = await getUserCart(7);
  const cartProductsArray = Object.entries(cart?.products);
  console.log(cartProductsArray);
  const cartProducts = await getProducts();

  const cartProductMap = new Map(cartProductsArray);

  const filteredProducts = cartProducts
    .filter((product: any) => cartProductMap.has(product.id.toString()))
    .map((product: any) => ({
      ...product,
      quantity: cartProductMap.get(product.id.toString()),
    }));

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
        <ClearCartButton />
        <div className="cart-items">
          {filteredProducts.map((item: any) => (
            <div key={item.id} className="product-card">
              {/* <div className="product-image">
                <Image
                  src={item.selectedCard.thumbnail}
                  width={300}
                  height={300}
                  alt={item.selectedCard.title}
                />
              </div> */}
              <div className="product-details">
                <h2>{item.title}</h2>
                <p>{item.brand}</p>
                <p className="prod-price">${item.price}</p>
              </div>
              <ChangeQuantityButton id={item.id} quantity={item.quantity} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
