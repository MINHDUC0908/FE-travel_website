import { FaShoppingBag } from "react-icons/fa";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <FaShoppingBag className="text-blue-500 text-lg" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;