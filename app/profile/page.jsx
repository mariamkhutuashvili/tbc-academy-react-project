"use client";

import React, { useState } from "react";
import "../../styles/Profile.css";

export default function Profile() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("New password saved:", newPassword);

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile-container">
      <h1>User Information</h1>
      <div className="user-info">
        <p>
          <strong>Name:</strong> Mariam Khutuashvili
        </p>
        <p>
          <strong>Email:</strong> khutuashvili.mariam@gmail.com
        </p>
      </div>
      <div className="password-update">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className="button save-button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
