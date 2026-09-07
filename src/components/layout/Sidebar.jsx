import { NavLink } from "react-router";

import {
  LayoutDashboard,
  ReceiptText,
  Settings as SettingsIcon,
  Wallet,
  Code2,
  X,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    name: "Expenses",
    path: "/expenses",
    icon: ReceiptText,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-[#0b1120] lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-blue-500 dark:shadow-blue-500/20">
              <Wallet size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Spendly
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Expense Tracker
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm dark:bg-blue-500 dark:shadow-lg dark:shadow-blue-500/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  }`
                }
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}

        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <Code2 size={19} />

            <span>GitHub</span>
          </a>

          <div className="mt-3 rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-800/60">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Simple expense tracking
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;