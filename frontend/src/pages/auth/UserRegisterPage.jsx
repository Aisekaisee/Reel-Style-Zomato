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

const UserRegisterPage = () => {
  const { theme, setTheme } = useAuthTheme();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("Submitting user registration with:", { name, email, password });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: name,
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        },
      );

      console.log("User registered successfully:", response.data);
      // Redirect to home page after successful registration
      navigate("/");
    } catch (error) {
      console.error(
        "Error registering user:",
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
                For customers exploring meals, offers, and orders.
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
              Create account
            </span>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
              User
            </span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Join and start ordering in minutes
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              A clean account setup for browsing restaurants, saving addresses,
              and placing orders.
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
                Registration
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
                User
              </h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
              register
            </div>
          </div>

          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Full name
              </span>
              <input
                type="text"
                placeholder="Enter your full name"
                className={inputClassName}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Email address
              </span>
              <input
                type="email"
                placeholder="you@example.com"
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
                placeholder="Create a secure password"
                className={inputClassName}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              className={buttonClassName}
            >
              Create user account
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/user/login"
              className="font-semibold text-orange-500 transition hover:text-orange-600 dark:text-orange-300 dark:hover:text-orange-200"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default UserRegisterPage;
