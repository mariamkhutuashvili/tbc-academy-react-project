import "./Profile.css";

function Profile() {
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
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm New Password" />
        <button type="button" className="button save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
