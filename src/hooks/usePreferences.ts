/* UI Engine View Matrix Layer Snap */
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
