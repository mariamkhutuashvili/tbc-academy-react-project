"use client";

import { useState } from "react";
import { useI18n } from "../../locales/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProfileInfo } from "../../app/actions";

export default function ProfileInfo({ user }: any) {
  const t = useI18n();

  const [infoUpdated, setInfoUpdated] = useState<Boolean>(false);

  const validationSchema = Yup.object({
    nickname: Yup.string().required(t("nameRequired")),
    phone: Yup.string().matches(/^[0-9]+$/, t("phoneIsNotValid")),
    address: Yup.string(),
  });

  const handleSubmit = async (
    values: ProfileData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formData: ProfileData = {
      userSub: user?.sub,
      nickname: values.nickname,
      phone: values.phone,
      address: values.address,
    };
    try {
      await editProfileInfo(formData);
      setInfoUpdated(true);
    } catch (error) {
      console.error("Error updating profile info:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="user-info-update">
      <p>
        <strong>{t("email")}: </strong>
        {user?.email}
      </p>
      <Formik
        initialValues={{
          userSub: user?.sub || "",
          nickname: user?.name || "",
          phone: user?.phone || "",
          address: user?.address || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, isSubmitting, isValid }) => (
          <Form>
            <div className="form-group">
              <label className="form-label" htmlFor="nickname">
                {t("name")}
              </label>{" "}
              <div className="input-margin">
                <Field
                  className={`form-input ${
                    touched.nickname && errors.nickname ? "input-error" : ""
                  }`}
                  type="text"
                  name="nickname"
                  placeholder={t("yourName")}
                />
                <ErrorMessage
                  name="nickname"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                {t("phone")}
              </label>
              <div className="input-margin">
                <Field
                  className={`form-input ${
                    touched.phone && errors.phone ? "input-error" : ""
                  }`}
                  type="text"
                  name="phone"
                  placeholder={t("phone")}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="address">
                {t("address")}
              </label>
              <div className="input-margin">
                <Field
                  className={`form-input ${
                    touched.address && errors.address ? "input-error" : ""
                  }`}
                  type="text"
                  name="address"
                  placeholder={t("address")}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="button submit-button"
                disabled={isSubmitting || !isValid}
              >
                {t("change")}
              </button>
            </div>
            {infoUpdated && <p>{t("yourInfoIsUpdated")}!</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
