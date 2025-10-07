import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiEdit3, FiBarChart, FiMenu, FiX } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import logo from "../assets/logo.png";
import { MdTranslate } from "react-icons/md";
const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour fermer le menu quand on clique sur un lien
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      className="mb-2 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-500 fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={logo}
              alt="Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />

            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all"
              whileHover={{ scale: 1.02 }}
            >
              FitenyFlow
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 sm:space-x-6 transition-all">
            <Link to="/" onClick={closeMenu}>
              <motion.button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiEdit3 className="w-4 h-4" />
                <span>Reformuler</span>
              </motion.button>
            </Link>
            <Link to="/translate" onClick={closeMenu}>
              <motion.button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdTranslate className="w-4 h-4" />
                <span>Traduire</span>
              </motion.button>
            </Link>
            <Link to="/statistics" onClick={closeMenu}>
              <motion.button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === "/statistics"
                    ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-100 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBarChart className="w-4 h-4" />
                <span>Statistiques</span>
              </motion.button>
            </Link>

            <DarkModeToggle />
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.nav
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg fixed top-16 left-0 right-0 z-40 flex flex-col space-y-1 py-4 px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Link to="/translate" onClick={closeMenu}>
            <motion.button
              className={`w-full text-left flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === "/"
                  ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdTranslate className="w-5 h-5" />
              <span>Traduire</span>
            </motion.button>
          </Link>

          <Link to="/statistics" onClick={closeMenu}>
            <motion.button
              className={`w-full text-left flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === "/statistics"
                  ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-100 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBarChart className="w-5 h-5" />
              <span>Statistiques</span>
            </motion.button>
          </Link>

          <Link to="/translate" onClick={closeMenu}>
            <motion.button
              className={`w-full text-left flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === "/translate"
                  ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-100 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdTranslate className="w-5 h-5" />
              <span>Traduire</span>
            </motion.button>
          </Link>

          {/* Dark Mode Toggle */}
          <div className="px-4 pt-2">
            <DarkModeToggle />
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
