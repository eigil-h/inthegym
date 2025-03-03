import { useState, useEffect } from 'react';
import { registerAuthStateChangeHandler, signOut } from '../data/firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // signOut(); // This is a hack to force the user to log in every time the app is started
    const unsubscribe = registerAuthStateChangeHandler((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading
  };
};

export default useAuth;
