'use client';
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "filled" | "outlined";
  classname?: string;
  children?: React.ReactNode;
}

const Button = ({
  text,
  onClick,
  variant = "filled",
  classname = "",
  children,
}: ButtonProps) => {
  const baseStyle =
    "px-4 py-3 rounded-lg cursor-pointer font-semibold transition duration-300 ease-in-out";
  const variantStyle =
    variant === "filled"
      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
      : "border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900";
  const combinedStyle = `${baseStyle} ${variantStyle} ${classname}`;

  return (
    <button onClick={onClick} className={combinedStyle}>
      {children ?? text}
    </button>
  );
};

export default Button;
