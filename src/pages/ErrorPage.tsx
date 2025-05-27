import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="max-width min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl font-black mb-2 text-primary">404</h1>
      <h4 className="text-2xl font-semibold mb-2 ">
        OOPS! THAT PAGE CAN'T BE FOUND.
      </h4>
      <p className="max-w-[500px] text-center text-gray-600 text-sm">
        It looks like nothing was found at this location. You can either go back
        to the last page or go to homepage
      </p>
      <Link
        className="mt-4 bg-primary hover:bg-primary/85 text-white font-medium py-3 px-6 rounded-lg duration-300"
        to={"/"}
      >
        Back Home
      </Link>
    </section>
  );
};

export default ErrorPage;
