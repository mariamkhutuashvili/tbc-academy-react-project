"use client";
import { deleteUser } from "../../app/[locale]/actions";

interface DeleteUserProps {
  id: number;
}

export default function DeleteUser({ id }: DeleteUserProps) {
  return (
    <div>
      <p onClick={() => deleteUser(id)}>X</p>
    </div>
  );
}
