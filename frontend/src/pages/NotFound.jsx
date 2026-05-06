import { Link } from "react-router-dom";
import Page from "../components/Page.jsx";

const NotFound = () => (
  <Page>
    <section className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center text-center">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-7xl font-black text-white">404</p>
        <h1 className="mt-4 text-3xl font-black text-white">Page not found</h1>
        <p className="mt-3 leading-7 text-slate-300">
          The route you requested does not exist or has moved.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex px-6 py-3 text-sm">
          Return Home
        </Link>
      </div>
    </section>
  </Page>
);

export default NotFound;
