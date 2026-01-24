/* UI Engine View Matrix Layer Snap */
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
export const PreferenceContext = React.createContext(initialState);
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
