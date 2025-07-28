import { Disclosure, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  // EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import TopNavInfo from "./TopNavInfo";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import { IoMdHome } from "react-icons/io";

// Theme color variables - Updated to use teal theme
// const COLOR_NAV_BG = "#0f766e"; // teal-700 for top bar
const COLOR_NAV_OPTION_BG = "#fff";
const COLOR_NAV_TEXT = "#2c5252"; // teal-800
const COLOR_NAV_TEXT_HOVER = "#1e3a3a"; // teal-900
const COLOR_NAV_CENTER = "#0f766e"; // teal-700
const COLOR_NAV_BORDER = "#14b8a6"; // teal-500

const navigationLeft = [
  { name: "Home", href: "/", current: true },
  { name: "Tracks", href: "/6863a71585f2e21ce21c8d42", current: false },
  { name: "Committees", href: "/6863b4857b0acf10390f6b39", current: false },
];
const navigationRight = [
  {
    name: "Registration",
    href: "",
    current: false,
    subItems: [
      { name: "Registration Fee", href: "/6863b4cd7b0acf10390f6b3e" },
      { name: "Registration Link", href: "/6863b4da7b0acf10390f6b41" },
    ],
  },
  { name: "Location", href: "/6863bcdd9f5bf58c267f065c", current: false },
  
  { name: "Accommodation", href: "/6863b4e57b0acf10390f6b44", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const location = useLocation();

  const [navLeft, setNavLeft] = useState(navigationLeft);
  const [navRight, setNavRight] = useState(navigationRight);

  useEffect(() => {
    const updateCurrent = (navArray) =>
      navArray.map((item) => ({
        ...item,
        current: location.pathname.endsWith(item.href),
        subItems: item.subItems
          ? item.subItems.map((sub) => ({
              ...sub,
              current: location.pathname.endsWith(sub.href),
            }))
          : undefined,
      }));

    setNavLeft(updateCurrent(navigationLeft));
    setNavRight(updateCurrent(navigationRight));
  }, [location.pathname]);


  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar with Contact Info */}
      <div
        className="w-full flex items-center justify-between flex-wrap p-1 relative z-20"
        style={{ 
          height: "30px",
          background: "linear-gradient(90deg, #0f766e 0%, #2c5252 100%)"
        }}
      >
        <div className="flex w-full justify-between items-center text-white px-4 py-0 gap-2 sm:gap-4 flex-wrap">
          {/* Email */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Email Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 text-teal-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 16.5v-9m19.5 0l-9.75 6.75L2.25 7.5m19.5 0L12 14.25 2.25 7.5"
              />
            </svg>
            <a href="mailto:cipher@nitj.ac.in" className="text-[11px] sm:text-xs lg:text-sm font-medium tracking-wide text-teal-100 hover:text-white transition-colors">
              cipher@nitj.ac.in
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Phone Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 text-teal-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h3.375c.444 0 .84.255 1.03.654l1.174 2.348a1.125 1.125 0 01-.21 1.248l-1.239 1.238a11.25 11.25 0 005.303 5.303l1.238-1.239a1.125 1.125 0 011.248-.21l2.348 1.174c.399.19.654.586.654 1.03v3.375c0 .621-.504 1.125-1.125 1.125h-.75C10.67 20.25 3.75 13.33 3.75 5.25v-.75z"
              />
            </svg>
            <a href="tel:+911234567890" className="text-[11px] sm:text-xs lg:text-sm font-medium tracking-wide text-teal-100 hover:text-white transition-colors">
              +91-12345-67890
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Disclosure as="header" className="bg-white shadow relative">
        {({ open }) => (
          <>
            <div className="mx-auto relative z-20 bg-white">
              <div
                className="relative px-2 sm:px-4 lg:px-8 flex h-12 justify-between items-center"
                style={{ background: COLOR_NAV_OPTION_BG, borderColor: COLOR_NAV_BORDER }}
              >
                {/* Mobile menu button and logo */}
                <div className="flex items-center justify-between w-full lg:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-teal-800 hover:bg-teal-50 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                  <span className="text-xl font-bold text-teal-700">
                    CIPHER 2026
                  </span>
                  <div className="w-6" /> {/* Spacer for centering */}
                </div>
                
                <nav
                  className="hidden lg:flex items-center justify-between w-full px-4"
                  aria-label="Global"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    background: COLOR_NAV_OPTION_BG
                  }}
                >
                  {/* Left side with CIPHER text */}
                  <div className="flex items-center space-x-10">
                    <span
                      className="text-2xl whitespace-nowrap "
                      style={{ color: COLOR_NAV_CENTER }}
                    >
                      CIPHER 2026
                    </span>
                  </div>

                  {/* Center navigation */}
                  <div className="flex items-center justify-center space-x-6">
                    {navLeft.map((item) => (
                      <div key={item.name} className="relative group">
                        {item.subItems ? (
                          <>
                            <Link
                              to={item.href}
                              className="inline-flex items-center py-2 px-3 text-sm uppercase font-medium transition-colors duration-200"
                              style={{ color: COLOR_NAV_TEXT }}
                              aria-current={item.current ? "page" : undefined}
                              onMouseOver={e => (e.currentTarget.style.color = COLOR_NAV_TEXT_HOVER)}
                              onMouseOut={e => (e.currentTarget.style.color = COLOR_NAV_TEXT)}
                            >
                              {item.name}
                              <div className="absolute bottom-[3px] left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                                style={{ background: COLOR_NAV_TEXT }}
                              ></div>
                            </Link>
                            <div className="absolute left-0 hidden mt-0.5 w-64 origin-top-left bg-gray-50 border border-teal-100 rounded-md shadow-lg group-hover:block z-50">
                              <div className="py-1">
                                {item.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className="block px-4 py-2 text-sm text-teal-800 hover:bg-teal-50 hover:text-teal-900"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link
                            to={item.href}
                            className="inline-flex items-center py-2 px-1 text-sm uppercase transition-colors duration-200"
                            style={{ color: COLOR_NAV_TEXT }}
                            aria-current={item.current ? "page" : undefined}
                            onMouseOver={e => (e.currentTarget.style.color = COLOR_NAV_TEXT_HOVER)}
                            onMouseOut={e => (e.currentTarget.style.color = COLOR_NAV_TEXT)}
                          >
                            {item.name}
                            <div className="absolute bottom-[3px] left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                              style={{ background: COLOR_NAV_TEXT }}
                            ></div>
                          </Link>
                        )}
                      </div>
                    ))}

                    {/* Right nav items */}
                    {navRight.map((item) => (
                      <div
                        key={item.name}
                        className="relative group"
                        onMouseEnter={e => {
                          const submenu = e.currentTarget.querySelector('.submenu');
                          if (submenu) submenu.style.display = 'block';
                        }}
                        onMouseLeave={e => {
                          const submenu = e.currentTarget.querySelector('.submenu');
                          if (submenu) submenu.style.display = 'none';
                        }}
                      >
                        {item.subItems ? (
                          <>
                            <Link
                              to={item.href}
                              className="inline-flex items-center py-2 px-3 text-sm uppercase transition-colors duration-200"
                              style={{ color: COLOR_NAV_TEXT }}
                              aria-current={item.current ? "page" : undefined}
                              onMouseOver={e => (e.currentTarget.style.color = COLOR_NAV_TEXT_HOVER)}
                              onMouseOut={e => (e.currentTarget.style.color = COLOR_NAV_TEXT)}
                            >
                              {item.name}
                              <div className="absolute bottom-[3px] left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                                style={{ background: COLOR_NAV_TEXT }}
                              ></div>
                            </Link>
                            <div className="submenu absolute right-0 hidden mt-0.5 w-64 origin-top-right bg-gray-50 border border-teal-100 rounded-md shadow-lg z-50">
                              <div className="py-1">
                                {item.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className="block px-4 py-2 text-sm text-teal-800 hover:bg-teal-50 hover:text-teal-900"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link
                            to={item.href}
                            className="inline-flex items-center py-2 px-1 text-sm uppercase transition-colors duration-200"
                            style={{ color: COLOR_NAV_TEXT }}
                            aria-current={item.current ? "page" : undefined}
                            onMouseOver={e => (e.currentTarget.style.color = COLOR_NAV_TEXT_HOVER)}
                            onMouseOut={e => (e.currentTarget.style.color = COLOR_NAV_TEXT)}
                          >
                            {item.name}
                            <div className="absolute bottom-[3px] left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                              style={{ background: COLOR_NAV_TEXT }}
                            ></div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>
              </div>
            </div>

            {/* Mobile menu with animations */}
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform -translate-y-full opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-full opacity-0"
            >
              <Disclosure.Panel className="lg:hidden bg-white border-t border-teal-100 absolute top-full left-0 right-0 z-10 shadow-lg">
                {({ close }) => (
                  <div className="space-y-1 px-3 pb-3 pt-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                    {[...navLeft, ...navRight].map((item) => (
                      <div key={item.href} className="py-0.5">
                        {item.subItems ? (
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.current
                                      ? "bg-teal-50 text-teal-900"
                                      : "text-teal-800 hover:bg-teal-50 hover:text-teal-900",
                                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-base font-medium transition-colors"
                                  )}
                                >
                                  <span>{item.name}</span>
                                  <svg
                                    className={classNames(
                                      "transform transition-transform duration-200",
                                      open ? "rotate-180" : ""
                                    )}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Disclosure.Button>
                                <Transition
                                  enter="transition duration-100 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >
                                  <Disclosure.Panel className="mt-1 space-y-1">
                                    {item.subItems.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        to={subItem.href}
                                        className="block rounded-md py-2 pl-8 pr-3 text-sm font-medium text-teal-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                                        onClick={() => close()}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </Disclosure.Panel>
                                </Transition>
                              </>
                            )}
                          </Disclosure>
                        ) : (
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-teal-50 text-teal-900"
                                : "text-teal-800 hover:bg-teal-50 hover:text-teal-900",
                              "block rounded-lg px-3 py-2 text-base font-medium transition-colors"
                            )}
                            onClick={() => close()}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}


