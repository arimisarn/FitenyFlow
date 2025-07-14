import React from "react";
import { motion } from "framer-motion";
import StatsChart from "../components/StatsChart";

const Statistics: React.FC = () => {
  return (
    <motion.div
      className="mt-12 min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300 mb-4">
            Statistiques d'utilisation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Découvrez vos habitudes de reformulation
          </p>
        </motion.div>

        <StatsChart />
      </div>
    </motion.div>
  );
};

export default Statistics;
