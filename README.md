const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
// Render twin viewports comparing item execution model candidate variations
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
export const PreferenceContext = React.createContext(initialState);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
