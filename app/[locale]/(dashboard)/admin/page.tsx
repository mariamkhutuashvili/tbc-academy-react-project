import { getUsers } from "../../../api";
import AddNewUser from "../../../../components/UI/AddNewUser";
import DeleteUser from "../../../../components/UI/DeleteUser";
import EditUser from "../../../../components/UI/EditUser";
import "../../../../styles/Admin.css";

interface User {
  id:number;
  name:string,
  age:number,
  email:string,
}

export default async function Admin() {
  const users = await getUsers();

  return (
    <div className="admin-container">
      <AddNewUser />
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-table-cell">Name</th>
              <th className="admin-table-cell">Email</th>
              <th className="admin-table-cell">Age</th>
              <th className="admin-table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="admin-table-row">
                <td className="admin-table-cell-bordered">{user.name}</td>
                <td className="admin-table-cell-bordered">{user.email}</td>
                <td className="admin-table-cell-bordered">{user.age}</td>
                <td className="admin-table-cell-bordered admin-actions-cell">
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
