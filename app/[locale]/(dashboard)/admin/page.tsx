import { getUsers } from "../../../api";
import Title from "../../../../components/UI/Title";
import { getI18n } from "../../../../locales/server";
import AddNewUser from "../../../../components/user/AddNewUser";
import DeleteUser from "../../../../components/user/DeleteUser";
import EditUser from "../../../../components/user/EditUser";
import "../../../../styles/Admin.css";

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function Admin() {
  const t = await getI18n();

  const users = await getUsers();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <Title titleName={t("users")} />
        <AddNewUser />
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("email")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
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
    </div>
  );
}
