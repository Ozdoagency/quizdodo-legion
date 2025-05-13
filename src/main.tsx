import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuizProvider } from './context/QuizContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);