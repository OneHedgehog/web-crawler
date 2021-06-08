import './Footer.css'
import store from '../../stores/app.store';
import {fetchSearchResults} from '../../thunks';

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    copyright: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    pagination: {
        width: 252,
        margin: "0 auto",
        padding: "10px",
    }
});

const RECORDS_PER_PAGE = 5;

function Footer() {
    const classes = useStyles();
    const searchSize = useSelector(state => state.search.searchData.size);
    const searchQuery = useSelector(state => state.search.query); 

    const [page, setPage] = useState(1);

    const handlePageChange = (e , newPage) => {
        setPage(newPage);
        console.log('newPage', newPage);
        store.dispatch(fetchSearchResults(searchQuery, newPage));
    }

    return (
        searchSize &&  searchSize >  RECORDS_PER_PAGE 
        ?   <footer className={classes.footer}>
                <Pagination page={page} onChange={handlePageChange} className={classes.pagination} count={Math.ceil(searchSize/RECORDS_PER_PAGE)} size="small"/>
                <Typography className={classes.copyright} color="textSecondary" gutterBottom>
                    Developed by the OneHedgehog
                </Typography>
            </footer>
        : ''
    );
}

export default Footer;