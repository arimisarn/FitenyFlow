import React from 'react';
import { motion } from 'framer-motion';
import { FiFlag } from 'react-icons/fi';

interface LanguageSelectorProps {
  selectedLanguage: 'french' | 'english';
  onLanguageChange: (language: 'french' | 'english') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: 'french', label: 'Français', flag: '🇫🇷' },
    { code: 'english', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <motion.div
      className="flex flex-col space-y-3 transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Titre */}
      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
        <FiFlag className="w-5 h-5" />
        <span className="font-semibold">
          Langue de reformulation
        </span>
      </div>

      {/* Boutons */}
      <div className="flex space-x-3">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;

          return (
            <motion.button
              key={lang.code}
              onClick={() =>
                onLanguageChange(lang.code as 'french' | 'english')
              }
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md dark:bg-blue-900 dark:text-blue-100 dark:border-blue-400'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LanguageSelector;
