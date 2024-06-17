import Title from "../../../../components/UI/Title";
import Image from "next/image";
import { getI18n } from "../../../../locales/server";
import { getBlogs, getFormEntries, getProducts, getUsers } from "../../../api";
import AddNewUser from "../../../../components/adminPanel/userManagement/AddNewUser";
import DeleteUser from "../../../../components/adminPanel/userManagement/DeleteUser";
import EditUser from "../../../../components/adminPanel/userManagement/EditUser";
import AddNewBlog from "../../../../components/adminPanel/blogManagement/AddNewBlog";
import DeleteBlog from "../../../../components/adminPanel/blogManagement/DeleteBlog";
import EditBlog from "../../../../components/adminPanel/blogManagement/EditBlog";
import DeleteEntry from "../../../../components/adminPanel/entryManagement/DeleteEntry";
import AddNewProduct from "../../../../components/adminPanel/productManagement/AddNewProduct";
import EditProduct from "../../../../components/adminPanel/productManagement/EditProduct";
import DeleteProduct from "../../../../components/adminPanel/productManagement/DeleteProduct";
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

  return (
    <div className="admin-container">
      <div className="users-management">
        <div className="admin-header">
          <Title titleName={t("users")} />
          <AddNewUser />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("role")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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
                <td>{blog.description}</td>
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
                <td>{product.description}</td>
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
    </div>
  );
}
