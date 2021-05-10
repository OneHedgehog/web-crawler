import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic'
import { Typography } from '@material-ui/core';

import store from '../../stores/app.store';
import {fetchSearchResults} from '../../thunks';

const useStyles = makeStyles((theme) => ({
    mainHeader: {
      textAlign: 'center',
      fontSize: '34px',
      padding: '20px 0px'
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      margin: '0 auto'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

const getSearchFromUrl = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('search') || '';
}  

function Header() {
    const classes = useStyles();
    const defaultSearchVal =  getSearchFromUrl();
    const [search, setSearch] = useState(defaultSearchVal);

    useEffect(() => {
      if (search.length > 0) {
        onSearchRequest();
      }
    }, []);

    const onSearchInputChange = (e) => {
      setSearch(e.target.value)
    }

    const onSearchRequest = (e) => {
      if (e) {
        e.preventDefault();
      }

      const query = { search } 
      window.history.replaceState(null, null, `?search=${query.search}`);
      store.dispatch(fetchSearchResults(query.search));

      console.log(store.getState());
    }


    return(
        <div>
          <Typography className={classes.mainHeader} variant="h1">Web Crawler Search</Typography>
          <Paper component="form" className={classes.root} onSubmit={onSearchRequest}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={search} 
              onChange={onSearchInputChange}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
              <MicIcon />
            </IconButton>
          </Paper>
        </div>     
    )
}


export default Header;
