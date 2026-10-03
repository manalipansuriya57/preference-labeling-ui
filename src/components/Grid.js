/* UI Engine View Matrix Layer Snap */
export const PreferenceContext = React.createContext(initialState);
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
export const PreferenceContext = React.createContext(initialState);
export const PreferenceContext = React.createContext(initialState);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
