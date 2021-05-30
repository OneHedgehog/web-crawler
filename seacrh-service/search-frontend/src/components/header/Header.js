import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic'

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Typography } from '@material-ui/core';

import store from '../../stores/app.store';
import {fetchSearchResults} from '../../thunks';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

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
    const [voiceModal, toggleVoiceModal] = useState(false);
    const [voiceRecognizedWords, setVoiceRecognizedWords] = useState([]);
    const [speechRegognizedPressed, setSpeechRecognizedPressed] = useState(false);
    const [speechRecognitionProcessing, setSeechRecognitionProcessing] = useState(false);

    useEffect(() => {
      if (search.length > 0) {
        onSearchRequest();
      }

    }, []);

    const onSearchInputChange = e => {
      setSearch(e.target.value);
    }

    const onSearchRequest = e => {
      if (e) {
        e.preventDefault();
      }

      const query = { search }; 
      window.history.replaceState(null, null, `?search=${query.search}`);
      store.dispatch(fetchSearchResults(query.search));
    }

    const onVoiceRecognition = () => {
      setSeechRecognitionProcessing(true);
      setSpeechRecognizedPressed(true);
      toggleVoiceModal(true);
      recognition.start();
    }

    recognition.onresult = event => {
      setSeechRecognitionProcessing(false);
      setVoiceRecognizedWords(Array.from(event.results[0]).map((voiceRecognizedResult) => {
        return voiceRecognizedResult.transcript;
      }));
    }

    recognition.onspeechend = () => {
      recognition.stop();
    }

    const handleVoiceRegonizedSentenceClick = sentence => {
      setSpeechRecognizedPressed(false);
      toggleVoiceModal(false);
      setSearch(sentence);
      window.history.replaceState(null, null, `?search=${sentence}`);
      store.dispatch(fetchSearchResults(sentence));
    }

    return(
        <div>
          <Dialog open={voiceModal}>
            <DialogTitle>Voice recognition possible results:</DialogTitle>
            {speechRecognitionProcessing 
              ?   <LinearProgress />
              :   <List>
                    {voiceRecognizedWords.map((sentence, key) => {
                      return (
                        <ListItem key={key} button onClick={handleVoiceRegonizedSentenceClick.bind(this, sentence)}>
                          <ListItemText primary={sentence} />
                        </ListItem>
                      )
                    })}
                  </List>
            }
          </Dialog>
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
              {speechRegognizedPressed ? <CircularProgress /> : <MicIcon />}
            </IconButton>
          </Paper>
        </div>     
    )
}


export default Header;
