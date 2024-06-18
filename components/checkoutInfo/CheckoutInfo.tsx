"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useI18n } from "../../locales/client";
import { checkout } from "../../app/actions";
import "./CheckoutInfo.css";

export default function CheckoutInfo({
  selectedProducts,
  authUser,
}: {
  selectedProducts: any[];
  authUser: any;
}) {
  const t = useI18n();

  const [cartProducts, setCartProducts] = useState<any[] | []>([]);
  const [profile, setProfile] = useState<any>({
    name: "",
    address: "",
    phone: "",
    comment: "",
    sub: "",
  });

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartProducts(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    if (authUser) {
      setProfile({
        name: authUser.name || "",
        address: authUser.address || "",
        phone: authUser.phone || "",
        comment: "",
        sub: authUser.sub || "",
      });
    }
  }, [authUser]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  console.log(profile);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // setLoading(true);
    e.preventDefault();
    await checkout(cartProducts, profile);
    // setLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h2 className="form-title">{t("orderInformation")}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t("name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="form-input"
                placeholder={t("yourName")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                {t("phone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="form-input"
                placeholder={t("yourPhone")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                {t("address")}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="form-input"
                placeholder={t("yourAddress")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment" className="form-label">
                {t("comment")}
              </label>
              <textarea
                id="comment"
                name="comment"
                value={profile.comment}
                onChange={handleChange}
                className="form-input"
                placeholder={t("yourComment")}
              />
            </div>
            <button type="submit" className="button submit-button">
              {t("pay")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
