import LoginForm from "../../components/LoginForm/LoginForm";
import "../../styles/Login.css";

export default async function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
