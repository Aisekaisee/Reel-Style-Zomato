import React, { useEffect, useState } from "react";

export const authPageClassNames = {
  page: "relative min-h-screen overflow-hidden bg-(--app-bg) px-4 py-6 text-slate-900 transition-colors duration-300 dark:text-slate-100 sm:px-6 lg:px-8",
  background:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.10),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_36%)]",
  shell:
    "relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col gap-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center",
  heroCard:
    "rounded-4xl border border-white/60 bg-white/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-950/50 sm:p-8 lg:p-10",
  formCard:
    "rounded-4xl border border-white/60 bg-white/85 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-950/70 sm:p-8",
  themeButton:
    "inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900",
  quickLink:
    "rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-orange-400/40 dark:hover:text-orange-300",
};

export const inputClassName =
  "w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-300 dark:focus:ring-orange-500/20";

export const buttonClassName =
  "w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400";

export const themeIcons = {
  light: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
    </svg>
  ),
  dark: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
    </svg>
  ),
};

export const quickLinks = [
  { to: "/user/register", label: "Register as a user" },
  { to: "/food-partner/register", label: "Register as a food partner" },
];

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("zomato-reel-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useAuthTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("zomato-reel-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};