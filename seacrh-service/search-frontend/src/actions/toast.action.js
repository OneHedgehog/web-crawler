export const TOAST_SUCCESS = 'TOAST_SUCCESS'
export const TOAST_FAILURE = 'TOAST_FAILURE'

  
export const toastSuccessAction = toastMessage => ({
    type: TOAST_SUCCESS,
    payload: {
        toastMessage
    }
  });
  
  
  
export const toastFailureAction = toastMessage => ({
    type: TOAST_FAILURE,
    payload: {
        toastMessage
    }
  });