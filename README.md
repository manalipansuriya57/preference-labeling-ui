/* UI Engine View Matrix Layer Snap */
export const PreferenceContext = React.createContext(initialState);
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
export const PreferenceContext = React.createContext(initialState);
