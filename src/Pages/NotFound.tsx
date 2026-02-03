import { Link } from "react-router"

export default function NotFound() {
  return (
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Emoji / Icon */}
      <div className="text-6xl mb-6 animate-pulse">⚠️</div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-xl mb-6 text-center">
        The page you are looking for does not exist or an error occurred.
      </p>

      {/* Button to return */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Return to Main Page
      </Link>
    </div>
  )
}
  