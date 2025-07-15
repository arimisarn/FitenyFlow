import React, { useState } from "react";
import { motion } from "framer-motion";
import LanguageSelector from "../components/LanguageSelector";
import TextInput from "../components/TextInput";
import ReformulationResult from "../components/ReformulationResult";
import { updateStats } from "../utils/statistics";
import { reformulateText } from "../services/togetherApi";

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "french" | "english"
  >("french");
  const [inputText, setInputText] = useState("");
  const [reformulatedText, setReformulatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleReformulate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setShowResult(false);

    try {
      const result = await reformulateText(inputText, selectedLanguage);
      setReformulatedText(result);
      setShowResult(true);
      updateStats(selectedLanguage);

      // Auto-copy to clipboard
      await navigator.clipboard.writeText(result);
      // Optionnel : ajouter un petit feedback visuel ici, ex: toast
    } catch (error) {
      console.error("Error reformulating text:", error);
      const errorMessage =
        selectedLanguage === "french"
          ? "Erreur lors de la reformulation. Veuillez réessayer."
          : "Error during reformulation. Please try again.";
      setReformulatedText(errorMessage);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen mt-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
            {selectedLanguage === "french"
              ? "Reformulez vos textes avec FItenyFlow"
              : "Reformulate your texts with FitenyFlow"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {selectedLanguage === "french"
              ? "Transformez vos phrases en français ou en anglais"
              : "Transform your sentences in French or English"}
          </p>
        </motion.div>

        <div className="mb-8">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[500px]">
          <TextInput
            value={inputText}
            onChange={setInputText}
            onReformulate={handleReformulate}
            isLoading={isLoading}
            language={selectedLanguage}
          />

          <ReformulationResult
            result={reformulatedText}
            isVisible={showResult}
            language={selectedLanguage}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
