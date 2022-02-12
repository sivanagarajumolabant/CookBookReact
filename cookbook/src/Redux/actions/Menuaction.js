
const ActionMenu = (value) => {
   return dispatch => {

      dispatch({
         type: "SELECTED_MENU",
         payload: value
      })
   }




}

const dropdown = (value) => {
   return dispatch => {

      dispatch({
         type: "SELECTED_DROPDOWN",
         payload: value
      })
   }




}

const reloadAction = (value) => {
   return dispatch => {

      dispatch({
         type: "REALOAD_LIST",
         payload: value
      })
   }
}


const CreateFeature = (value) => {
   return dispatch => {

      dispatch({
         type: "CREATE_FEATURE",
         payload: {
            id: true,
            data: value
         }
      })
   }
}
const Createremoved = (value) => {
   return dispatch => {

      dispatch({
         type: "CREATE_REMOVED",
         payload: false
      })
   }
}
const PreviewFeature = (value) => {
   return dispatch => {

      dispatch({
         type: "PREVIEW_FEATURE",
         payload: {
            id: true,
            data: value
         }
      })
   }
}
const EditPreviewFeature = (value) => {
   return dispatch => {

      dispatch({
         type: "EDIT_PREVIEW_FEATURE",
         payload: {
            id: true,
            data: value
         }
      })
   }
}

export default { ActionMenu, dropdown, reloadAction, CreateFeature, Createremoved, EditPreviewFeature, PreviewFeature }