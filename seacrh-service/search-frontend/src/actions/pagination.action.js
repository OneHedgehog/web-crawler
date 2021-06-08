export const CHANGE_PAGE = 'CHANGE_PAGE';

  
export const changePage = page => 
{
  return ({
    type: CHANGE_PAGE,
    payload: {
        page
    }
  })
}