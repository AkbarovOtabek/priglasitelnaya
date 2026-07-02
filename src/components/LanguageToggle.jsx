import { useLang } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="fixed top-5 right-5 z-[900] flex items-center gap-1 glass rounded-full px-1 py-1 interactive">
      {['uz', 'ru'].map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest transition-all interactive ${
            lang === code ? 'bg-gold text-white font-medium' : 'text-ink-soft hover:text-gold-deep'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
