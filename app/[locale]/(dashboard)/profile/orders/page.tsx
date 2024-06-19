import { getSession } from "@auth0/nextjs-auth0";
import Title from "../../../../../components/UI/Title";
import { getI18n } from "../../../../../locales/server";
import { getOrders } from "../../../../api";

export const metadata = {
  title: "My Orders",
  description: "Your Orders - Manage Your Orders",
};

export default async function page() {
  const t = await getI18n();

  const orders = await getOrders();

  const session = await getSession();
  const sub = session?.user?.sub;

  const userOrders = orders.filter((order: any) => order.metadata.id === sub);

  return (
    <div className="orders-management">
      <div className="admin-header">
        <Title titleName={t("myOrders")} />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>{t("user")}</th>
            <th>{t("totalPrice")}</th>
            <th>{t("status")}</th>
            <th>{t("address")}</th>
            <th>{t("phone")}</th>
            <th>{t("comment")}</th>
            <th>{t("receipt")}</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order: Order) => (
            <tr key={order.latest_charge.id}>
              <td>{order.metadata.name}</td>
              <td>${(order.amount / 100).toFixed(2)}</td>
              <td>
                {order.latest_charge.refunded === true
                  ? t("refunded")
                  : t("paid")}
              </td>
              <td>{order.metadata.address}</td>
              <td>{order.metadata.phone}</td>
              <td>{order.metadata.comment}</td>
              <td>
                <a
                  href={order.latest_charge.receipt_url}
                  aria-label="Order Receipt"
                  target="_blank"
                  className="order-receipt"
                  rel="noopener noreferrer"
                >
                  {t("viewReceipt")}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
