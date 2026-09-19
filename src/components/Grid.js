/* UI Engine View Matrix Layer Snap */
export const PreferenceContext = React.createContext(initialState);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
export const PreferenceContext = React.createContext(initialState);
