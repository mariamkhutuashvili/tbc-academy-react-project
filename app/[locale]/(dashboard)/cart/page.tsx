import Image from "next/image";
import Link from "next/link";
import Title from "../../../../components/UI/Title";
import { getI18n } from "../../../../locales/server";
import { getProducts, getUserCart } from "../../../api";
import ClearCartButton from "../../../../components/cartControls/ClearCartButton";
import ChangeQuantityButton from "../../../../components/cartControls/ChangeQuantityButton";
import RemoveFromCartButton from "../../../../components/cartControls/RemoveFromCartButton";
import BackToShopButton from "../../../../components/UI/BackToShopButton";
import "../../../../styles/Cart.css";

export const metadata = {
  title: "Cart",
  description: "Shopping Cart - Review Your Items",
};

export default async function Cart() {
  const t = await getI18n();

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

  const totalPrice = filteredProducts
    .reduce((acc: number, item: any) => {
      return acc + parseFloat(item.price) * item.quantity;
    }, 0)
    .toFixed(2);

  const totalQuantity = filteredProducts.reduce((acc: number, item: any) => {
    return acc + item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <Title titleName={t("cart")} />
      {filteredProducts.length > 0 ? (
        <div className="cart-wrapper">
          <div className="cart-actions">
            <BackToShopButton />
            <ClearCartButton />
          </div>
          <div className="cart-header">
            <div className="header-item">{t("product")}</div>
            <div className="header-item">{t("category")}</div>
            <div className="header-item">{t("price")}</div>
            <div className="header-item">{t("quantity")}</div>
            <div className="header-item">{t("totalPrice")}</div>
          </div>
          <div className="cart-items">
            {filteredProducts.map((item: any) => (
              <div key={item.id} className="product-card">
                <div className="product-details">
                  <div className="remove-button">
                    <RemoveFromCartButton id={item.id} />
                  </div>
                  <div className="product-image">
                    <Image
                      src={item.photo_gallery[0].img_url}
                      width={70}
                      height={70}
                      alt={item.title}
                    />
                  </div>

                  <div className="detail-item title">
                    <h2>{item.title}</h2>
                  </div>
                  <div className="detail-item category">
                    <p>
                      {t(
                        item.category as
                          | "categories"
                          | "food"
                          | "toys"
                          | "beds"
                          | "accessories"
                          | "grooming"
                          | "litter"
                      )}
                    </p>
                  </div>
                  <div className="detail-item price">
                    <p className="prod-price">${item.price}</p>
                  </div>
                  <div className="detail-item quantity">
                    <ChangeQuantityButton
                      id={item.id}
                      quantity={item.quantity}
                    />
                  </div>
                  <div className="detail-item total-price">
                    <p className="subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-totals">
              <h2>{t("cartTotals")}</h2>
              <div className="cart-totals-item">
                <span>{t("totalQuantity")}: </span>
                <span>{totalQuantity}</span>
              </div>
              <div className="cart-totals-item">
                <span>{t("subtotal")}: </span>
                <span>${totalPrice}</span>
              </div>
              <Link href="/checkout" className="button proceed-button">
                {t("placeAnOrder")}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>{t("cartIsEmpty")}</p>
          <BackToShopButton />
        </>
      )}
    </div>
  );
}
