const SEARCH_API_ROOT = 'http://localhost:3000'

const sendSearchRequest = (searchQuery) => {
    const searchUrl = `${SEARCH_API_ROOT}/?search=${searchQuery}` 
    return fetch(searchUrl)
        .then(searchedDataResponse => earchedDataResponse.json())
}

export const sendRequestMiddleware = store => next => action => {

    return sendSearchRequest
        .then(searchedData => next(action))
        .catch(err => next(action))
}

    