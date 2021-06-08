import {searchRequestAction, searchRequestSuccessAction, searchRequestErrorAction, showToast} from '../actions/index'
 
const fetchSearchData = async (searchString, page) => {
    const searchDataResponse = await fetch(`http://localhost:4222?search=${searchString}&page=${page}`);
    return searchDataResponse.json()
}

export const fetchSearchResults = (searchString, page = 1) => async (dispatch) => {
    dispatch(searchRequestAction(searchString, page));
    try {
        const searchData = await fetchSearchData(searchString, page);
        dispatch(searchRequestSuccessAction(searchData));
    } catch (e) {
        dispatch(searchRequestErrorAction(e));
        dispatch(showToast(e.message, 'error'));
    }
}