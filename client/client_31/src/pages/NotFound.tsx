import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold mt-2">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to={"/list-post"}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go to posts
      </Link>
    </div>
  );
}
