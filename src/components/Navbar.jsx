import { memo } from "react";
import Layout from "../layout/layout";

const Navbar = () => {
  return (
    <Layout>
      <div className="border-b border-gray-100 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="navbar min-h-[56px] px-0">

            {/* LEFT */}
            <div className="navbar-start gap-3">
              {/* Mobile menu */}
              <div className="dropdown">
                <label
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden px-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h10m-10 6h16"
                    />
                  </svg>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-base-100 p-2 shadow"
                >
                  <li><a href="#simulation">Simulation</a></li>
                  <li><a href="#how-it-works">How it works</a></li>
                  <li><a href="#feedback">Feedback</a></li>
                  <li><a href="#output">What you receive</a></li>
                </ul>
              </div>

              {/* Brand */}
              <a
                href="#simulation"
                className="text-xl font-extrabold tracking-tight text-gray-900"
              >
                Verve<span className="text-blue-600">Uni</span>
              </a>
            </div>

            {/* CENTER (DESKTOP) */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-6 px-0 text-sm font-medium text-gray-600">
                <li>
                  <a href="#simulation" className="hover:text-gray-900">
                    Simulation
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-gray-900">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="hover:text-gray-900">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#output" className="hover:text-gray-900">
                    Output
                  </a>
                </li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end">
              <a
                href="#simulation"
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white px-5"
              >
                Start
              </a>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default memo(Navbar);
