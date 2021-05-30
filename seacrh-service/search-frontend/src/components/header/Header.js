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

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

recognition.lang = 'en-US';
recognition.maxAlternatives = 10; // possible need more then one
recognition.interimResults = false;
recognition.continuous = false;

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
    }

    const onVoiceRecognition = () => {
      console.log('speech start');
      recognition.start();
    }

    recognition.onresult = function(event) {
      console.log('event', event);
      console.log('all vals',  event.results[0]);
      console.log('first val', event.results[0][0].transcript);
    }

    recognition.onspeechend = function() {
      console.log('speech end');
      recognition.stop();
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
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={onVoiceRecognition}>
              <MicIcon />
            </IconButton>
          </Paper>
        </div>     
    )
}


export default Header;
