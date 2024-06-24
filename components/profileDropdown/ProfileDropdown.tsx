"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "../../locales/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "../UI/LoginButton";

export default function ProfileDropdown({ userInfo }: { userInfo: User }) {
  const t = useI18n();

  const { user } = useUser();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-icon-container" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="profile-link">
        {userInfo ? (
          <Image
            src={userInfo?.picture}
            alt={userInfo?.name}
            width={30}
            height={30}
            priority
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {user ? (
            <>
              <Link href="/profile" className="dropdown-link">
                {t("profile")}
              </Link>
              <Link href="/profile/orders" className="dropdown-link">
                {t("orders")}
              </Link>
              <Link href="/profile/reviews" className="dropdown-link">
                {t("reviews")}
              </Link>
              <a
                href="/api/auth/logout"
                className="button logout-button dropdown-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                {t("logOut")}
              </a>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      )}
    </div>
  );
}
