import Link from "next/link";
import Button from "./common-components/Button";

const Custom404 = () => {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="text-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/013/743/772/original/sad-face-emoji-png.png"
          alt="MeLi logo"
          className="w-96 mb-8"
        />
        <h1 className="text-4xl font-bold text-primary m-4">
          Oops! - Error 404
        </h1>
        <p className="text-lg text-gray-500 mb-4">
          No encontramos la pagina que buscas.
        </p>
        <Button hasLink href="/">
          Ir al inicio
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
