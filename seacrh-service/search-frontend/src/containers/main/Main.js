import './Main.css';
import Section from '../../components/section/Section';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '400px',
      margin: '0 auto',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

function Main() {
    const searchDataResults = useSelector(state => state.search.searchData) || null;
    const isLoading = useSelector(state => state.search.isLoading);

    const classes = useStyles();

    const loader =  isLoading ? <LinearProgress className='progressbar' /> : '';

    return (
        <main className="search-results">
            {loader}
            {searchDataResults && searchDataResults.searchResults
            ? searchDataResults.searchResults.map((searchDataResult, key) => 
            <Section
                key={key}     
                link={searchDataResult.link}
                text={searchDataResult.content}
                title={searchDataResult.title}
            />)
            : ''}
        </main>
    );
}

export default Main;
