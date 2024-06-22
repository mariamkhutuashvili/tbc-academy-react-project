"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "../../locales/client";

export default function ProfileDropdown({ userInfo }: { userInfo: User }) {
  const t = useI18n();

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
        <Image
          src={userInfo?.picture}
          alt={userInfo?.name}
          width={30}
          height={30}
          priority
        />
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
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
              strokeWidth="1.5"
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
        </div>
      )}
    </div>
  );
}
