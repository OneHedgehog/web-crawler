export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE'

export const searchRequestAction = query => ({
    type: SEARCH_REQUEST,
    payload: {
      query
    }
  });
  
  export const searchRequestSuccessAction = searchResponse => ({
    type: SEARCH_REQUEST_SUCCESS,
    payload: {
      data: searchResponse
    }
  });
  
  
  
  export const searchRequestErrorAction = err => ({
    type: SEARCH_REQUEST_FAILURE,
    payload: {
      error: err
    }
  });