"use client";

import { useState } from "react";
import { useI18n } from "../../locales/client";
import { createContactAction } from "../../app/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactForm.css";

export default function ContactForm() {
  const t = useI18n();

  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string()
      .email(t("emailIsNotValid"))
      .required(t("emailRequired")),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t("phoneIsNotValid"))
      .required(t("phoneIsRequired")),
    message: Yup.string()
      .required(t("messageRequired"))
      .max(500, t("messageTooLong")),
  });

  const handleSubmit = async (
    values: ContactData,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createContactAction(values);
      resetForm();
      setMessageSent(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const [messageSent, setMessageSent] = useState(false);

  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <Form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">{t("name")}</label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder={t("yourName")}
              className={`form-input ${
                touched.name && errors.name ? "input-error" : ""
              }`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder={t("yourEmail")}
              className={`form-input ${
                touched.email && errors.email ? "input-error" : ""
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t("phone")}</label>
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder={t("yourPhone")}
              className={`form-input ${
                touched.phone && errors.phone ? "input-error" : ""
              }`}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t("message")}</label>
            <Field
              as="textarea"
              id="message"
              name="message"
              placeholder={t("writeSomething")}
              style={{ height: "200px" }}
              className={`form-input ${
                touched.message && errors.message ? "input-error" : ""
              }`}
            />
            <ErrorMessage
              name="message"
              component="div"
              className="error-message"
            />
          </div>

          <button
            type="submit"
            className="button submit-button"
            disabled={isSubmitting || !isValid}
          >
            {t("send")}
          </button>
          {messageSent && <p>{t("messageIsSent")}!</p>}
        </Form>
      )}
    </Formik>
  );
}
