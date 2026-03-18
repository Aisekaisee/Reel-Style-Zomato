import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  authPageClassNames,
  buttonClassName,
  inputClassName,
  quickLinks,
  themeIcons,
  useAuthTheme,
} from "../../components/auth/authShared";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLoginPage = () => {
  const { theme, setTheme } = useAuthTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        },
      );

      console.log("Food partner logged in successfully:", response.data);
      // Redirect to createFood page after successful login
      navigate("/create-food");
    } catch (error) {
      console.error(
        "Error logging in food partner:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <main className={authPageClassNames.page}>
      <div className={authPageClassNames.background} />

      <div className={authPageClassNames.shell}>
        <section className={authPageClassNames.heroCard}>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
                Zomato Reel
              </p>
              <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                For restaurants managing listings, menus, and incoming orders.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setTheme((currentTheme) =>
                  currentTheme === "light" ? "dark" : "light",
                )
              }
              className={authPageClassNames.themeButton}
            >
              {themeIcons[theme]}
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
              Partner access
            </span>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
              Food Partner
            </span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Manage your outlet from one place
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Sign in to update your menu, pricing, and availability with ease.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={authPageClassNames.quickLink}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className={authPageClassNames.formCard}>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Authentication
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
                Food Partner
              </h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
              login
            </div>
          </div>

          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Business email
              </span>
              <input
                type="email"
                placeholder="owner@restaurant.com"
                className={inputClassName}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className={inputClassName}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button type="button" onClick={handleSubmit} className={buttonClassName}>
              Login as partner
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            New to the platform?{" "}
            <Link
              to="/food-partner/register"
              className="font-semibold text-orange-500 transition hover:text-orange-600 dark:text-orange-300 dark:hover:text-orange-200"
            >
              Register outlet
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default FoodPartnerLoginPage;
