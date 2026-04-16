import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShortlistContext = createContext();

const STORAGE_KEY = '@scoutiq_shortlist';

export const ShortlistProvider = ({ children }) => {
  const [shortlist, setShortlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setShortlist(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load shortlist:', e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  // Persist whenever shortlist changes (after initial load)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(shortlist)).catch((e) =>
      console.warn('Failed to save shortlist:', e)
    );
  }, [shortlist, loaded]);

  const addToShortlist = (athlete) => {
    setShortlist((prev) => {
      if (prev.find((a) => a.id === athlete.id)) return prev;
      return [...prev, athlete];
    });
  };

  const removeFromShortlist = (athleteId) => {
    setShortlist((prev) => prev.filter((a) => a.id !== athleteId));
  };

  const isShortlisted = (athleteId) => shortlist.some((a) => a.id === athleteId);

  const averageScore =
    shortlist.length > 0
      ? Math.round(shortlist.reduce((sum, a) => sum + a.score, 0) / shortlist.length)
      : 0;

  return (
    <ShortlistContext.Provider
      value={{
        shortlist,
        addToShortlist,
        removeFromShortlist,
        isShortlisted,
        averageScore,
        loaded,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => useContext(ShortlistContext);