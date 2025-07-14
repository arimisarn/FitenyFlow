import React from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { getStats, getStatsPercentage } from "../utils/statistics";

const StatsChart: React.FC = () => {
  const stats = getStats();
  const percentages = getStatsPercentage();

  const data = [
    { name: "Français", value: stats.french, color: "#3B82F6" }, // blue-500
    { name: "English", value: stats.english, color: "#8B5CF6" }, // purple-500
  ];

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Statistiques de reformulation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <div className="w-80 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tw-bg-opacity, 1) white",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    color: "#000",
                    // en dark mode, on peut surcharger par JS si besoin (voir remarque ci-dessous)
                  }}
                  formatter={(value, name) => [`${value} reformulations`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Textual Stats */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-800 dark:to-blue-900 p-6 rounded-xl transition-colors duration-300">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100 mb-2">
              Reformulations en français
            </h3>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                {stats.french}
              </span>
              <span className="text-lg text-blue-600 dark:text-blue-300">
                ({percentages.french}%)
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-800 dark:to-purple-900 p-6 rounded-xl transition-colors duration-300">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-100 mb-2">
              Reformulations en anglais
            </h3>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                {stats.english}
              </span>
              <span className="text-lg text-purple-600 dark:text-purple-300">
                ({percentages.english}%)
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-800 dark:to-green-900 p-6 rounded-xl transition-colors duration-300">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-100 mb-2">
              Total des reformulations
            </h3>
            <span className="text-3xl font-bold text-green-600 dark:text-green-300">
              {stats.total}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsChart;
