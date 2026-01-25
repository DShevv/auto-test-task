import { createSlice } from "@reduxjs/toolkit";
import { loadStoreFromLocalStorage, saveStoreToLocalStorage } from "../../utils";

export type ThemeT = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

interface ThemeState {
  theme: ThemeT;
}

function getInitialTheme() {
  const storedTheme = loadStoreFromLocalStorage<ThemeState["theme"]>(THEME_STORAGE_KEY);
  if (storedTheme) {
    return storedTheme;
  }
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return userPrefersDark ? 'dark' : 'light';
}

function applyTheme(theme: ThemeT) {
  document.documentElement.setAttribute('data-theme', theme);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

const initialState: ThemeState = {
  theme: initialTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveStoreToLocalStorage<ThemeState["theme"]>(state.theme, THEME_STORAGE_KEY);
      applyTheme(state.theme);
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  }
})

export const { toggleTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;

export default themeSlice.reducer;