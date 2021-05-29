export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

  
export const showToast = (toastMessage, toastType) => 
{
  return ({
    type: SHOW_TOAST,
    payload: {
      toastType,
      toastMessage
    }
  })
}

export const hideToast = (index) => {
  return ({
    type: HIDE_TOAST,
    payload: index
  })
}