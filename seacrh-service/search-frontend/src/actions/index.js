export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'
export const SEARCH_REQUEST_FAILURE = 'SEARCH_REQUEST_FAILURE'

const fetchSearch = login => ({
    "[Search]": {
      types: [ SEARCH_REQUEST, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_FAILURE ],
      endpoint: `users/${login}`,
      schema: null
    }
  })