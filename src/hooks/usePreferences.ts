useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
export const PreferenceContext = React.createContext(initialState);
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
export const PreferenceContext = React.createContext(initialState);
