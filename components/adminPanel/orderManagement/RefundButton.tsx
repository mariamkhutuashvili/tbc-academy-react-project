"use client";

import { createRefund } from "../../../app/actions";
import { useI18n } from "../../../locales/client";

export default function RefundButton({
  id,
  refunded,
}: {
  id: string;
  refunded: boolean;
}) {
  const t = useI18n();

  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };

  return (
    <div>
      {refunded === false && (
        <button
          onClick={() => refundHandler(id)}
          type="button"
          className="button refund-button"
        >
          {t("refund")}
        </button>
      )}
    </div>
  );
}
