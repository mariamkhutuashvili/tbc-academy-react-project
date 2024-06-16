import Title from "../../../../components/UI/Title";
import Image from "next/image";
import { getI18n } from "../../../../locales/server";
import { getBlogs, getFormEntries, getUsers } from "../../../api";
import AddNewUser from "../../../../components/adminPanel/userManagement/AddNewUser";
import DeleteUser from "../../../../components/adminPanel/userManagement/DeleteUser";
import EditUser from "../../../../components/adminPanel/userManagement/EditUser";
import AddNewBlog from "../../../../components/adminPanel/blogManagement/AddNewBlog";
import DeleteBlog from "../../../../components/adminPanel/blogManagement/DeleteBlog";
import EditBlog from "../../../../components/adminPanel/blogManagement/EditBlog";
import DeleteEntry from "../../../../components/adminPanel/entryManagement/DeleteEntry";
import "../../../../styles/Admin.css";

export const metadata = {
  title: "Admin Panel",
  description: "Admin Panel - Manage Your Content",
};

export default async function Admin() {
  const t = await getI18n();

  const users = await getUsers();
  const blogs = await getBlogs();
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
