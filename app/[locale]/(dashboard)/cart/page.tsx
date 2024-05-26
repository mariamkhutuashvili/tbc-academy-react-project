// import Image from "next/image";
// import { useEffect, useReducer, useState } from "react";
// import { useLocalStorage } from "../../../useLocalStorageHook";
// import { reducer } from "../../../useReducerHook";
import "../../../../styles/Cart.css";
import { getProducts, getUserCart } from "../../../api";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export default async function Cart() {
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

  // console.log(filteredProducts);
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
    // <div className="cart-container">
    //   <button
    //     onClick={() => handleProductRemove("RESET")}
    //     className="button clear-cart-button"
    //   >
    //     Clear Cart
    //   </button>
    //   <div>
    //     {isClient &&
    //       cardsData.map((item: any) => (
    //         <div key={item.id} className="product-card">
    //           <div className="product-image">
    //             <Image
    //               src={item.selectedCard.thumbnail}
    //               width={300}
    //               height={300}
    //               alt={item.selectedCard.title}
    //             />
    //           </div>
    //           <div className="product-details">
    //             <h2>{item.selectedCard.title}</h2>
    //             <p>{item.selectedCard.brand}</p>
    //             <p>{item.selectedCard.description}</p>
    //             <p className="prod-price">${item.selectedCard.price}</p>
    //           </div>
    //           <div className="quantity-control">
    //             {item.count > 1 ? (
    //               <button
    //                 className="decrease-button"
    //                 onClick={() =>
    //                   changeQuantity("DECREMENT", item.selectedCard)
    //                 }
    //               >
    //                 -
    //               </button>
    //             ) : (
    //               <button disabled>-</button>
    //             )}
    //             <span>{item.count}</span>
    //             <button
    //               className="increase-button"
    //               onClick={() => changeQuantity("INCREMENT", item.selectedCard)}
    //             >
    //               +
    //             </button>
    //             <button
    //               className="remove-button"
    //               onClick={() => changeQuantity("REMOVE", item.selectedCard)}
    //             >
    //               Remove
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </div>
    <div>ss</div>
  );
}
