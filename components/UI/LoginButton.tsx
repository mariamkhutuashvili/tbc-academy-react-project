"use client";

import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/api/auth/login");
  };
  return (
    <button onClick={handleLogin} className="button login-button">
      Login
    </button>
  );
}
