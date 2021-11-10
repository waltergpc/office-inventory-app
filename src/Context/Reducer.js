const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true }

    case "REGISTER_SUCCESS":
      return { ...state, isLoading: false, user: action.payload }

    case "REGISTER_ERROR":
      return { ...state, isLoading: false, user: null, showAlert: true }

    case "LOGIN":
      return { ...state, user: action.payload }

    case "LOGOUT":
      return {
        ...state,
        user: null,
        stockItems: [],
        missingItems: [],
        showAlert: false,
      }

    case "GET_STOCK_ITEMS_SUCCESS":
      return { ...state, isLoading: false, stockItems: action.payload }

    case "ADD_STOCK_ITEM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        stockItems: [...state.stockItems, action.payload],
      }

    default:
      return state
  }
}

export { Reducer }
