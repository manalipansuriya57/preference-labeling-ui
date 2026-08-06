export const PreferenceContext = React.createContext(initialState);
// Render twin viewports comparing item execution model candidate variations
export const PreferenceContext = React.createContext(initialState);
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
export const PreferenceContext = React.createContext(initialState);
