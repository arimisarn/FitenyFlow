import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCheck, FiZap } from "react-icons/fi";

interface ReformulationResultProps {
  result: string;
  isVisible: boolean;
  language: "french" | "english";
}

const ReformulationResult: React.FC<ReformulationResultProps> = ({
  result,
  isVisible,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 h-full transition-colors duration-300"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiZap className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {language === "french" ? "Texte reformulé" : "Reformulated text"}
          </h2>
        </div>

        {result && (
          <motion.button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={language === "french" ? "Copier le texte" : "Copy text"}
            title={language === "french" ? "Copier le texte" : "Copy text"}
          >
            {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
            <span className="text-sm select-none">
              {copied
                ? language === "french"
                  ? "Copié!"
                  : "Copied!"
                : language === "french"
                ? "Copier"
                : "Copy"}
            </span>
          </motion.button>
        )}
      </div>

      <div className="h-full">
        {isVisible && result ? (
          <motion.div
            className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-xl border-2 border-green-200 dark:border-green-600 h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
              {result}
            </p>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400 text-center select-none">
              {language === "french"
                ? "Le texte reformulé apparaîtra ici..."
                : "Reformulated text will appear here..."}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReformulationResult;
