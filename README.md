/* UI Engine View Matrix Layer Snap */
export const PreferenceContext = React.createContext(initialState);
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
