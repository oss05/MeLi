import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="text-gray-600 body-font shadow-md bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="/"
        >
          <img
            src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp"
            alt="MeLi logo"
            className="w-32"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
