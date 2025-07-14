import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiType, FiRefreshCw } from "react-icons/fi";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onReformulate: () => void;
  isLoading: boolean;
  language: "french" | "english";
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onReformulate,
  isLoading,
  language,
}) => {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onReformulate();
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 h-full transition-colors duration-300"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <FiType className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-colors duration-300" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
          {language === "french" ? "Texte à reformuler" : "Text to reformulate"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        <div className="flex-1 mb-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              language === "french"
                ? "Entrez votre texte ici..."
                : "Enter your text here..."
            }
            className="w-full h-full max-h-64 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 transition-colors duration-300"
            maxLength={maxChars}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div
            className={`text-sm transition-colors duration-300 ${
              charCount > maxChars * 0.8
                ? "text-orange-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {charCount}/{maxChars} caractères
          </div>
          <div className="flex space-x-2">
            <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
              <div
                className={`h-full transition-all duration-300 ${
                  charCount > maxChars * 0.8 ? "bg-orange-500" : "bg-blue-500"
                }`}
                style={{ width: `${(charCount / maxChars) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!value.trim() || isLoading}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            !value.trim() || isLoading
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
          }`}
          whileHover={!value.trim() || isLoading ? {} : { scale: 1.02 }}
          whileTap={!value.trim() || isLoading ? {} : { scale: 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <FiRefreshCw className="w-5 h-5 animate-spin" />
              <span>
                {language === "french"
                  ? "Reformulation..."
                  : "Reformulating..."}
              </span>
            </div>
          ) : (
            <span>{language === "french" ? "Reformuler" : "Reformulate"}</span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TextInput;
