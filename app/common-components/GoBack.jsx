import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto">
      <button onClick={() => router.back()}>
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 mr-2 cursor-pointer"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z" />
        </svg>
      </button>
    </div>
  );
};

export default GoBack;
