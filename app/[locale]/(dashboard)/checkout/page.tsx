import Image from "next/image";
import CheckoutInfo from "../../../../components/checkoutInfo/CheckoutInfo";
import { getProducts, getUserCart, getUserInfo } from "../../../api";
import Title from "../../../../components/UI/Title";
import { getI18n } from "../../../../locales/server";
import "../../../../styles/Checkout.css";

export default async function Checkout() {
  const cart = await getUserCart();
  const cartProductsArray = cart ? Object.entries(cart?.products) : [];
  const cartProducts = await getProducts();
  const user = await getUserInfo();
  const t = await getI18n();

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
    <div className="checkout-container">
      <Title titleName={t("orderInformation")} />
      <div className="checkout-container-wrapper">
        <div className="order-form">
          <CheckoutInfo authUser={user} selectedProducts={filteredProducts} />
        </div>
        <div className="order-summary">
          {filteredProducts.map((product: ActiveProductFromVercel) => {
            return (
              <div className="checkout-product" key={product.id}>
                <div className="checkout-image-wrapper">
                  <Image
                    width={90}
                    height={90}
                    objectFit="cover"
                    alt="product"
                    src={product?.photo_gallery[0].img_url}
                  />
                </div>
                <div className="checkout-details">
                  <span>
                    {t("product")}: {product.title}
                  </span>
                  <span>
                    {t("price")}: ${product.price}
                  </span>
                  <span>
                    {t("quantity")}: {product.quantity}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="total-price-wrap">
            <span className="total-price-title">{t("totalPrice")}</span>
            <span className="checkout-total-price">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
