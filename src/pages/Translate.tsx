// src/pages/Translate.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TextInput from "../components/TextInput";
import ReformulationResult from "../components/ReformulationResult";
import { translateText } from "../services/translateApi";

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
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTargetLanguage("english")}
            className={`px-4 py-2 rounded-l-lg border ${
              targetLanguage === "english"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setTargetLanguage("french")}
            className={`px-4 py-2 rounded-r-lg border ${
              targetLanguage === "french"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            Français
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[500px]">
          <TextInput
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
