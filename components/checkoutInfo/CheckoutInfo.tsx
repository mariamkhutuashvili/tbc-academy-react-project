"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../../locales/client";
import { checkout } from "../../app/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t("phoneIsNotValid"))
      .required(t("phoneIsRequired")),
    address: Yup.string().required(t("addressIsRequired")),
    comment: Yup.string().max(500, t("commentMaxLength")),
  });

  const handleSubmit = async (values: any) => {
    await checkout(cartProducts, values);
  };

  return (
    <Formik
      initialValues={profile}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <Form className="checkout-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t("name")}
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className={`form-input ${
                touched.name && errors.name ? "input-error" : ""
              }`}
              placeholder={t("yourName")}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              {t("phone")}
            </label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${
                touched.phone && errors.phone ? "input-error" : ""
              }`}
              placeholder={t("yourPhone")}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              {t("address")}
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              className={`form-input ${
                touched.address && errors.address ? "input-error" : ""
              }`}
              placeholder={t("yourAddress")}
            />
            <ErrorMessage
              name="address"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment" className="form-label">
              {t("comment")}
            </label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              className={`form-input ${
                touched.comment && errors.comment ? "input-error" : ""
              }`}
              placeholder={t("yourComment")}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="error-message"
            />
          </div>
          <button
            type="submit"
            className="button submit-button"
            disabled={isSubmitting || !isValid}
          >
            {t("pay")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
