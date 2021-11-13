const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true }

    case "REGISTER_SUCCESS":
      return { ...state, isLoading: false, user: action.payload }

    case "REGISTER_ERROR":
      return { ...state, isLoading: false, user: null, showAlert: true }

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

    case "ADD_OWNSTOCK_ITEM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          ownItems: [...state.stockItems.ownItems, action.payload],
        },
      }

    case "ADD_COMMONSTOCK_ITEM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          commonItems: [...state.stockItems.ownItems, action.payload],
        },
      }

    case "EDIT_OWNSTOCK_ITEM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          ownItems: [
            ...state.stockItems.ownItems.map((item) =>
              item._id === action.payload._id
                ? { ...item, ...action.payload }
                : item
            ),
          ],
        },
      }

    case "EDIT_COMMONSTOCK_ITEM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          commonItems: [
            ...state.commonItems.map((item) =>
              item._id === action.payload._id
                ? { ...item, ...action.payload }
                : item
            ),
          ],
        },
      }

    default:
      return state
  }
}

export { Reducer }
