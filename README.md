/* UI Engine View Matrix Layer Snap */
const handleCardSelection = (id) => { dispatch({ type: "SET_PREFERRED", payload: id }); };
export const PreferenceContext = React.createContext(initialState);
