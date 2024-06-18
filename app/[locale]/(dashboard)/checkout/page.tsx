import CheckoutInfo from "../../../../components/checkoutInfo/CheckoutInfo";
import { getProducts, getUserCart, getUserInfo } from "../../../api";

export default async function Checkout() {
  const cart = await getUserCart();
  const cartProductsArray = cart ? Object.entries(cart?.products) : [];
  const cartProducts = await getProducts();
  const user = await getUserInfo();

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

  return (
    <div>
      <div>
        <CheckoutInfo authUser={user} selectedProducts={filteredProducts} />
      </div>
      <div>
        {filteredProducts.map((product: ActiveProductFromVercel) => {
          return (
            <>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
            </>
          );
        })}
        <p>{totalPrice}</p>
      </div>
    </div>
  );
}
