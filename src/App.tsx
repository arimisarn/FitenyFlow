import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Translate from "./pages/Translate";

function App() {
  return (
    <Router>
      <div className="mt-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </motion.main>
        <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 transition-colors duration-500">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Développé par Arimisa Nathalie
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
