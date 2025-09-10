// src/pages/Translate.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ReformulationResult from "../components/ReformulationResult";
import { translateText } from "../services/translateApi";
import TextInputTrad from "../components/TextInputTrad";

const Translate: React.FC = () => {
  const [targetLanguage, setTargetLanguage] = useState<"french" | "english">(
    "english"
  );
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setShowResult(false);

    try {
      const result = await translateText(inputText, targetLanguage);
      setTranslatedText(result);
      setShowResult(true);

      // Optionnel: copier dans le presse-papiers
      await navigator.clipboard.writeText(result);
    } catch (error) {
      console.error("Error translating text:", error);
      setTranslatedText(
        targetLanguage === "french"
          ? "Erreur lors de la traduction."
          : "Error during translation."
      );
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen mt-12 bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {targetLanguage === "french"
              ? "Traduisez vos textes en français"
              : "Translate your texts into English"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {targetLanguage === "french"
              ? "Transformez vos phrases en français"
              : "Transform your sentences in English"}
          </p>
        </motion.div>

        {/* Choix de langue simple (au lieu de LanguageSelector complet) */}
        {/* Choix de langue style Header */}
        <div className="flex justify-center mb-6 space-x-4">
          <motion.button
            onClick={() => setTargetLanguage("english")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              targetLanguage === "english"
                ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🇬🇧 English</span>
          </motion.button>

          <motion.button
            onClick={() => setTargetLanguage("french")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              targetLanguage === "french"
                ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-100 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🇫🇷 Français</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[500px]">
          <TextInputTrad
            value={inputText}
            onChange={setInputText}
            onReformulate={handleTranslate}
            isLoading={isLoading}
            language={targetLanguage}
          />

          <ReformulationResult
            result={translatedText}
            isVisible={showResult}
            language={targetLanguage}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Translate;
