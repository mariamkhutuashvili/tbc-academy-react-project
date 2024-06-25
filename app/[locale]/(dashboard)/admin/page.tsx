import Title from "../../../../components/UI/Title";
import Image from "next/image";
import { getI18n } from "../../../../locales/server";
import {
  getBlogs,
  getFormEntries,
  getOrders,
  getProducts,
  getReviews,
  getUsers,
} from "../../../api";
// import AddNewUser from "../../../../components/adminPanel/userManagement/AddNewUser";
import DeleteUser from "../../../../components/adminPanel/userManagement/DeleteUser";
import EditUser from "../../../../components/adminPanel/userManagement/EditUser";
import AddNewBlog from "../../../../components/adminPanel/blogManagement/AddNewBlog";
import DeleteBlog from "../../../../components/adminPanel/blogManagement/DeleteBlog";
import EditBlog from "../../../../components/adminPanel/blogManagement/EditBlog";
import DeleteEntry from "../../../../components/adminPanel/entryManagement/DeleteEntry";
import AddNewProduct from "../../../../components/adminPanel/productManagement/AddNewProduct";
import EditProduct from "../../../../components/adminPanel/productManagement/EditProduct";
import DeleteProduct from "../../../../components/adminPanel/productManagement/DeleteProduct";
import RefundButton from "../../../../components/adminPanel/orderManagement/RefundButton";
import DeleteReview from "../../../../components/adminPanel/reviewManagement/DeleteReview";
import "../../../../styles/Admin.css";

export const metadata = {
  title: "Admin Panel",
  description: "Admin Panel - Manage Your Content",
};

export default async function Admin() {
  const t = await getI18n();

  const users = await getUsers();
  const blogs = await getBlogs();
  const products = await getProducts();
  const formEntries = await getFormEntries();
  const orders = await getOrders();
  const reviews = await getReviews();

  return (
    <div className="admin-container">
      <div className="users-management">
        <div className="admin-header">
          <Title titleName={t("users")} />
          {/* <AddNewUser /> */}
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("phone")}</th>
              <th>{t("address")}</th>
              <th>{t("role")}</th>
              <th>{t("image")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <Image
                    src={user.picture}
                    alt="User Image"
                    width={50}
                    height={50}
                    priority
                  />
                </td>
                <td className="admin-table-cell-actions">
                  <div className="admin-actions-container">
                    <EditUser userData={user} id={user.id} />
                    <DeleteUser id={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="blogs-management">
        <div className="admin-header">
          <Title titleName={t("blog")} />
          <AddNewBlog />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("description")}</th>
              <th>{t("image")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: BlogData) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{`${blog.description
                  .split(" ")
                  .slice(0, 30)
                  .join(" ")}} ...`}</td>
                <td>
                  <Image
                    src={blog.photo}
                    alt="Blog Image"
                    width={50}
                    height={50}
                    priority
                  />
                </td>
                <td className="admin-table-cell-actions">
                  <div className="admin-actions-container">
                    <EditBlog blogData={blog} />
                    <DeleteBlog id={blog.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="products-management">
        <div className="admin-header">
          <Title titleName={t("products")} />
          <AddNewProduct />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("description")}</th>
              <th>{t("price")}</th>
              <th>{t("discountPrice")}</th>
              <th>{t("stock")}</th>
              <th>{t("brand")}</th>
              <th>{t("category")}</th>
              <th>{t("photoGallery")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductFromVercel) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{`${product.description
                  .split(" ")
                  .slice(0, 30)
                  .join(" ")}} ...`}</td>
                <td>{product.price}</td>
                <td>{product.discountprice}</td>
                <td>{product.stock}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  {product.photo_gallery.map((image) => {
                    return (
                      <Image
                        key={image.id}
                        src={image.img_url}
                        alt="Products Image"
                        width={50}
                        height={50}
                        priority
                      />
                    );
                  })}
                </td>
                <td className="admin-table-cell-actions">
                  <div className="admin-actions-container">
                    <EditProduct product={product} />
                    <DeleteProduct id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="entries-management">
        <div className="admin-header">
          <Title titleName={t("formEntries")} />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("phone")}</th>
              <th>{t("message")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {formEntries.map((entry: EntryData) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.phone}</td>
                <td>{entry.message}</td>
                <td className="admin-table-cell-actions">
                  <div className="admin-actions-container">
                    <DeleteEntry id={entry.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="orders-management">
        <div className="admin-header">
          <Title titleName={t("orders")} />
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
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
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
                <td className="admin-table-cell-actions">
                  <div className="admin-actions-container">
                    <RefundButton
                      id={order.latest_charge.id}
                      refunded={order.latest_charge.refunded}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reviews-management">
        <div className="admin-header">
          <Title titleName={t("reviews")} />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("product")}</th>
              <th>{t("star")}</th>
              <th>{t("comment")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.reviews?.map((review: Reviews) => (
              <tr key={review.review_id}>
                <td>{review.user_name}</td>
                <td>{review.email}</td>
                <td>{review.product_name}</td>
                <td>{review.star}</td>
                <td>{review.comment}</td>
                <td className="admin-table-cell-actions">
                  <div className="admin-actions-container">
                    <DeleteReview id={review.review_id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
