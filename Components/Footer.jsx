import Image from "next/image";
import { Fot1, Fot2 } from "../Components/index";
import Link from "next/link";

const Footer = () => {
  const footerNav = [
    {
      href: "javascript.void()",
      name: "Terms",
    },
    {
      href: "javascript.void()",
      name: "License",
    },
    {
      href: "javascript.void()",
      name: "Privacy",
    },
    {
      href: "javascript.void()",
      name: "About Us",
    },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-6">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <Image
              src="https://www.floatui.com/logo.svg"
              width={150}
              height={50}
              alt="Logo img"
            />
            <p className="max-w-md">
              aut molestias asperiores vitae quo blanditiis, ipsa sed odit quas
              itaque.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNav.map((items, idx) => (
                <li
                  key={idx}
                  className="text-gray-800 hover:text-gray-500 duration-150"
                >
                  <Link href={items.href}>{items.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex items-center gap-3 mt-3 sm:block"></div>
            <Link href={"/"}>
              <Fot1 />
            </Link>
            <Link href={"/"} className="mt-0 block sm:mt-3">
              <Fot2 />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 py-10 border-r-teal-700 md:text-center">
        {" "}
        &copy; Afraz Ahmad. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
