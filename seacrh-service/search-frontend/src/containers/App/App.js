import Header from '../../components/header/Header';
import Main from '../../containers/main/Main';
import Footer from '../../components/footer/Footer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './App.css';

import store from '../../stores/app.store';
import { useSelector } from 'react-redux'

import {hideToast} from '../../actions/index'

function App() {

  const handleClose = (index) => {
    store.dispatch(hideToast(index));
  };

  const toasts = useSelector(state => state.toast.toasts);
  const toastsHtml = toasts.map(({toastMessage, toastType}, key) => {
    return (
    <Snackbar key={key} open={true} autoHideDuration={2000} onClose={handleClose.bind(this, key)} >
      <MuiAlert elevation={6}  severity={toastType} onClose={handleClose.bind(this, key)}>
        {toastMessage}
      </MuiAlert>
    </Snackbar>
    )
  })

  return (
    <div className="main-search-container">
      <Header />
      <Main />
      {toastsHtml}
      <Footer />
    </div>
  );
}

export default App;
