import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClick = () => {
    setMenuVisible((visible) => !visible);
  };

  return (
    <>
      {/* mobile menu bar */}
      <div className="flex justify-between bg-gray-800 text-gray-100 md:hidden">
        {/* logo */}
        <a href="/" className="block p-4 font-bold text-white">
          Awesome App
        </a>
        <button
          id="mobile-menu"
          className="p-4 focus:bg-gray-600 md:hidden"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* sidebar */}
      <div
        id="sidebar"
        className={`absolute inset-y-0 left-0 w-64 transform space-y-6 bg-gray-800 px-2 py-7 text-blue-100 transition duration-200 ease-in-out md:relative md:translate-x-0 ${
          menuVisible ? "" : "-translate-x-full"
        }`}
      >
        {/* logo */}
        <div className="flex flex-col">
          <a href="#" className="flex items-center space-x-2 px-4 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
            <span className="text-2xl font-extrabold">Awesome App</span>
          </a>
          <p className="ml-5">Pages - T3</p>
        </div>
        {/* nav */}
        <nav>
          <Link
            href="/"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="features"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            About
          </Link>
          <Link
            href="#"
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Other
          </Link>
        </nav>
      </div>
    </>
  );
}
