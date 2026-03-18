import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mascot } from './components/Mascot';
import { games, ClassLevel, BreakType, Game, levelValue } from './data/games';
import { powerups } from './data/powerups';
import { Play, RotateCcw, StopCircle, HeartHandshake, Zap, CheckCircle } from 'lucide-react';

type AppState = 'setup' | 'playing' | 'levelup';

export default function App() {
  const [appState, setAppState] = useState<AppState>('setup');
  const [selectedLevel, setSelectedLevel] = useState<ClassLevel>('P');
  const [selectedBreak, setSelectedBreak] = useState<BreakType>('Mica');
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [currentPowerup, setCurrentPowerup] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (appState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (appState === 'playing' && timeLeft === 0) {
      setCurrentPowerup(powerups[Math.floor(Math.random() * powerups.length)]);
      setAppState('levelup');
    }
    return () => clearInterval(timer);
  }, [appState, timeLeft]);

  const selectGame = () => {
    let validGames = games.filter(g => levelValue(g.minLevel) <= levelValue(selectedLevel));
    
    if (selectedBreak === 'Mica') {
      validGames = validGames.filter(g => g.duration <= 35);
    }

    let availableGames = validGames.filter(g => !history.includes(g.id));
    
    if (availableGames.length === 0) {
      availableGames = validGames;
    }

    const weightedPool: Game[] = [];
    availableGames.forEach(g => {
      weightedPool.push(g);
      if (g.category === 'Mixare') {
        weightedPool.push(g);
        weightedPool.push(g);
      }
    });

    const randomGame = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    
    setCurrentGame(randomGame);
    setTimeLeft(randomGame.duration);
    setAppState('playing');
    
    setHistory(prev => {
      const newHistory = [randomGame.id, ...prev];
      return newHistory.slice(0, 5);
    });
  };

  const stopApp = () => {
    setAppState('setup');
    setCurrentGame(null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          
          {/* SETUP SCREEN */}
          {appState === 'setup' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center">
                <h1 className="text-4xl font-black tracking-tight text-violet-600 mb-2">Pauza Level Up</h1>
                <p className="text-slate-500 font-medium">Conectare, cooperare, bucurie.</p>
              </div>

              <Mascot state="splash" />

              <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Nivelul Clasei</label>
                  <div className="flex flex-wrap gap-2">
                    {(['P', '1', '2', '3', '4'] as ClassLevel[]).map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          selectedLevel === level 
                            ? 'bg-violet-600 text-white shadow-md shadow-violet-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {level === 'P' ? 'Preg.' : `Clasa ${level}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Tipul Pauzei</label>
                  <div className="flex gap-2">
                    {(['Mica', 'Mare'] as BreakType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedBreak(type)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          selectedBreak === type 
                            ? 'bg-violet-600 text-white shadow-md shadow-violet-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Pauză {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={selectGame}
                  className="w-full py-4 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1"
                >
                  <Play fill="currentColor" />
                  START
                </button>
              </div>
            </motion.div>
          )}

          {/* PLAYING SCREEN */}
          {appState === 'playing' && currentGame && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="relative w-full flex justify-center">
                <Mascot state="playing" />
                {/* Speech Bubble */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-0 right-0 max-w-[150px] bg-white p-3 rounded-2xl rounded-bl-none shadow-md text-sm font-medium text-slate-700 border border-slate-100 z-10"
                >
                  "{currentGame.mascotQuote}"
                </motion.div>
              </div>

              <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider rounded-full">
                    {currentGame.category}
                  </span>
                  <span className="text-slate-400 font-mono text-sm font-medium">
                    {currentGame.duration} sec
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                  {currentGame.title}
                </h2>
                
                <p className="text-slate-600 text-lg leading-relaxed">
                  {currentGame.description}
                </p>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mt-2 flex gap-3 items-start">
                  <HeartHandshake className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-amber-800 font-bold text-sm uppercase tracking-wide mb-1">Regula de Aur</h4>
                    <p className="text-amber-900 text-sm font-medium leading-snug">{currentGame.rule}</p>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="w-full bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-end mb-2 px-1">
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">Timp rămas</span>
                  <span className="text-3xl font-black text-violet-600 font-mono">{formatTime(timeLeft)}</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-violet-500"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / currentGame.duration) * 100}%` }}
                    transition={{ ease: "linear", duration: 1 }}
                  />
                </div>
              </div>
              
              <button 
                onClick={stopApp}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <StopCircle size={16} /> Oprește jocul
              </button>
            </motion.div>
          )}

          {/* LEVEL UP SCREEN */}
          {appState === 'levelup' && (
            <motion.div 
              key="levelup"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <Mascot state="levelup" />
              
              <div className="text-center">
                <motion.h2 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="text-5xl font-black text-emerald-500 tracking-tighter mb-2"
                >
                  LEVEL UP!
                </motion.h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Echipa a crescut</p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-gradient-to-br from-violet-600 to-indigo-700 p-8 rounded-3xl shadow-xl shadow-indigo-200 text-center relative overflow-hidden"
              >
                <Zap className="absolute top-4 right-4 text-white/20" size={64} />
                <h3 className="text-white/80 font-bold text-sm uppercase tracking-widest mb-4">Power-Up Deblocat</h3>
                <p className="text-2xl font-bold text-white leading-snug relative z-10">
                  "{currentPowerup}"
                </p>
              </motion.div>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={selectGame}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-200 hover:-translate-y-1"
                >
                  <RotateCcw size={24} />
                  Încă unul!
                </button>
                <button 
                  onClick={stopApp}
                  className="w-full py-4 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all border border-slate-200"
                >
                  <CheckCircle size={20} />
                  Gata pauza
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
