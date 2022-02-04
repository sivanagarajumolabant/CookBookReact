// import { DASHBOARD_DRAWER_OPEN } from "../actions/action-type";

const initialState = {
  drawerOpen: false,

  menuitem: null,
  headerValue: { title: "Oracle To Postgres" },
  updatedValue: false,
  createFeature: false,
  details: {}
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_MENU":
      return {
        ...state,
        menuitem: action.payload
      };
    case "SELECTED_DROPDOWN":
      return {
        ...state,
        headerValue: action.payload
      };
    case "REALOAD_LIST":
      return {
        ...state,
        updatedValue: action.payload
      };


    case "CREATE_FEATURE":
      return {
        ...state,
        createFeature: action.payload?.id,
        details: action.payload.data
      };

    case "CREATE_REMOVED":
      return {
        ...state,
        createFeature: action.payload,
        details: {}
      };
    default:
      return state;
  }
};

export default dashboardReducer;