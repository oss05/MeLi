import Link from "next/link";

type ButtonProps = {
  hasLink?: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button = ({
  hasLink = false,
  href = "/",
  onClick,
  children,
  className,
}: ButtonProps) => {
  const button = hasLink ? (
    <Link
      className={`uppercase flex items-center justify-center text-primary bg-secondary border-0 py-2 px-8 focus:outline-none rounded hover:bg-primary hover:text-white text-lg ${className}`}
      href={href}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`uppercase flex items-center justify-center text-primary bg-secondary border-0 py-2 px-8 focus:outline-none hover:bg-primary hover:text-white rounded text-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return button;
};

export default Button;
