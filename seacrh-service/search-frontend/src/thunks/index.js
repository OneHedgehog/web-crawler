import {searchRequestAction, searchRequestSuccessAction, searchRequestErrorAction} from '../actions/index'

const fetchSearchData = async searchString => {
    const searchDataResponse = await fetch(`http://localhost:4222?search=${searchString}`);
    return searchDataResponse.json()
}

export const fetchSearchResults = (searchString) => async (dispatch) => {
    dispatch(searchRequestAction(searchString));
    try {
        const searchData = await fetchSearchData(searchString);
        dispatch(searchRequestSuccessAction(searchData));
    } catch (e) {
        dispatch(searchRequestErrorAction(e));
    }
}