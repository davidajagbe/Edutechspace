import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-neutral-900">404</h1>
        <h2 className="text-3xl font-semibold text-neutral-700 mt-4">Page Not Found</h2>
        <p className="text-lg text-neutral-600 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-neutral-900 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-neutral-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
