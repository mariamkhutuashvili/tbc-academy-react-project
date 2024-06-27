"use client";

import Link from "next/link";
import { useI18n } from "../../locales/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Footer.css";

export default function Footer() {
  const t = useI18n();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("emailIsNotValid"))
      .required(t("emailRequired")),
  });

  const handleSubmit = async (values: { email: string }) => {
    console.log("Form submitted with email:", values.email);
  };

  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>{t("quickLinks")}</h3>
        <div className="footer-nav">
          <Link href="/products" className="footer-link">
            {t("products")}
          </Link>
          <Link href="/about" className="footer-link">
            {t("about")}
          </Link>
          <Link href="/blog" className="footer-link">
            {t("blog")}
          </Link>
          <Link href="/contact" className="footer-link">
            {t("contact")}
          </Link>
        </div>
      </div>
      <div className="footer-section">
        <h3>{t("information")}</h3>
        <a href="#terms" className="footer-link">
          {t("termsAndConditions")}
        </a>
        <a href="#privacy" className="footer-link">
          {t("privacyPolicy")}
        </a>
      </div>
      <div className="footer-section">
        <h3>{t("newsletter")}</h3>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="newsletter-form">
              <label htmlFor="email">{t("subscribeToOurNewsletter")}</label>
              <div className="form-group newsletter-input-container">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder={t("enterYourEmail")}
                  className={`form-input ${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                />
                <button type="submit" className="button subscribe-button">
                  {t("subscribe")}
                </button>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="footer-copyright">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://catshop.ge/" className="hover:underline">
            CatShop©
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
