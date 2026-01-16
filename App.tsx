
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import { supabase } from './services/supabaseService';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) setView('dashboard');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setView('dashboard');
        setShowAuth(false);
      } else {
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      setView('dashboard');
    } else {
      setShowAuth(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing');
  };

  return (
    <div className="min-h-screen">
      {view === 'landing' ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <Dashboard 
          onBackToHome={() => setView('landing')} 
          onLogout={handleLogout}
          user={user}
        />
      )}

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onSuccess={(user) => {
            setUser(user);
            setView('dashboard');
            setShowAuth(false);
          }} 
        />
      )}
    </div>
  );
};

export default App;
