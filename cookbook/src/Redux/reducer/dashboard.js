// import { DASHBOARD_DRAWER_OPEN } from "../actions/action-type";

const initialState = {
  drawerOpen: false,

  menuitem: null,
  headerValue: { title: "Oracle TO Postgres" , code:1},
  updatedValue: false,
  createFeature: false,
  preview: false,
  editpreview: false,
  details: {},
  editPreviewdetails: {},
   ITEMlIST:[],
   DropDownValues:[ { title: "Oracle TO Postgres", code:'Oracle_TO_Postgres' },
   { title: "SQLServer TO Postgres", code: '"SQLServer_TO_Postgres'},
   { title: "MYSQL TO Postgres", code: 'MYSQL_TO_Postgres' },]
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
        createFeature: true,
        details: action.payload.data,
        editpreview: false,
        preview: false

      };
    case "PREVIEW_FEATURE":
      return {
        ...state,
        preview: true,
        details: action.payload.data,
        editpreview: false,
        createFeature: false

      };
    case "EDIT_PREVIEW_FEATURE":
      return {
        ...state,
        editpreview: true,
        editPreviewdetails: action.payload.data,
        preview: false,
        createFeature: false

      };

    case "CREATE_REMOVED":
      return {
        ...state,
        createFeature: action.payload,
        details: {}
      };
    
      case "SELECTED_ITEM":
        return {
          ...state,
         ITEMlIST:action.payload
        };
        case "DROP_DOWN_LIST":
          return {
            ...state,
           DropDownValues:action.payload
          };
  


        
        case "UPDATE_SELECTED_ITEM":
          return {
            ...state,
           ITEMlIST:action.payload
          };
          case "DELETE_SELECTED_ITEM":
            return {
              ...state,
             ITEMlIST:action.payload
            };

          
    default:
      return state;
  }
};

export default dashboardReducer;