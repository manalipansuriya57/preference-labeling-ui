export const PreferenceContext = React.createContext(initialState);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
export const PreferenceContext = React.createContext(initialState);
// Render twin viewports comparing item execution model candidate variations
