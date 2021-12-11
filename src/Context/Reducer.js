const Reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return { ...state, sideBarOpen: true }

    case 'CLOSE_SIDEBAR':
      return { ...state, sideBarOpen: false }

    case 'SET_LOADING':
      return { ...state, isLoading: true }

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        errorMsg: null,
        showAlert: false,
        isLoading: false,
        user: action.payload,
      }

    case 'REGISTER_ERROR':
      return {
        ...state,
        isLoading: false,
        user: null,
        showAlert: true,
        errorMsg: action.payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        stockItems: [],
        missingItems: [],
        showAlert: false,
        sideBarOpen: false,
      }

    case 'TOGGLE_COMMON':
      return {
        ...state,
        isLoading: false,
        showOwn: !state.showOwn,
      }

    case 'GET_STOCK_ITEMS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ownItems: [...action.payload.ownItems],
          commonItems: [...action.payload.commonItems],
        },
        missingItems: {
          ownMissing: [...action.payload.ownMissing],
          commonMissing: [...action.payload.commonMissing],
        },
      }
    case 'GET_STOCK_ITEMS_ERROR':
      return {
        ...state,
        isLoading: false,
      }

    case 'ADD_OWNSTOCK_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          ownItems: [...state.stockItems.ownItems, action.payload],
        },
      }

    case 'ADD_COMMONSTOCK_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          commonItems: [...state.stockItems.commonItems, action.payload],
        },
      }

    case 'ADD_OWNMISSING_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        missingItems: {
          ...state.missingItems,
          ownMissing: [...state.missingItems.ownMissing, action.payload],
        },
      }

    case 'ADD_COMMONMISSING_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        missingItems: {
          ...state.missingItems,
          commonMissing: [...state.missingItems.commonMissing, action.payload],
        },
      }

    case 'EDIT_OWNSTOCK_ITEM_SUCCESS':
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

    case 'EDIT_COMMONSTOCK_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        stockItems: {
          ...state.stockItems,
          commonItems: [
            ...state.stockItems.commonItems.map((item) =>
              item._id === action.payload._id
                ? { ...item, ...action.payload }
                : item
            ),
          ],
        },
      }

    case 'EDIT_OWNMISSING_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        missingItems: {
          ...state.missingItems,
          ownMissing: [
            ...state.missingItems.ownMissing.map((item) =>
              item._id === action.payload._id
                ? { ...item, ...action.payload }
                : item
            ),
          ],
        },
      }

    case 'EDIT_COMMONMISSING_ITEM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        missingItems: {
          ...state.missingItems,
          commonMissing: [
            ...state.missingItems.commonMissing.map((item) =>
              item._id === action.payload._id
                ? { ...item, ...action.payload }
                : item
            ),
          ],
        },
      }

    case 'ITEM_OPERATION_ERROR':
      return {
        ...state,
        isLoading: false,
        showAlert: true,
      }

    case 'TOGGLE_ALERT':
      return {
        ...state,
        showAlert: false,
        errorMsg: null,
      }

    default:
      return state
  }
}

export { Reducer }
