import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { content } from '../data/content';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('uz');

  const toggle = useCallback(() => {
    setLang((l) => (l === 'uz' ? 'ru' : 'uz'));
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggle, t: content[lang] }),
    [lang, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
