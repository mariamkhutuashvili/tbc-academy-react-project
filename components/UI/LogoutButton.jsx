"use client";

export default function LogoutButton({ handleLogout }) {
  return (
    <button onClick={() => handleLogout()} className="button logout-button">
      Logout
    </button>
  );
}
