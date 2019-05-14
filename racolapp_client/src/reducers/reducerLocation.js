const initialState = {
    location : {},
    events : []
  };
  
 const reducer = (state = initialState, action) => {
    switch (action.type){
      case 'SET_LOCATION': {
        return {
          ...state,
          location: action.value
        };
      }
      case 'GET_ALL_EVENTS': {
        return {
          ...state,
          events: action.value
        };
      }
      default: return state
    };
  }

  export default reducer;