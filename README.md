/* UI Engine View Matrix Layer Snap */
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
:root { --primary-accent: #2563eb; --background-muted: #f8fafc; transition: all 0.2s; }
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
useEffect(() => { syncPreferencesWithLocalStorage(); }, [preferences]);
