import './Footer.css'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

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

function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Pagination defaultPage={1} className={classes.pagination} count={10} size="small"/>
            <Typography className={classes.copyright} color="textSecondary" gutterBottom>
                Developed by the OneHedgehog
            </Typography>
        </footer>
    );
}

export default Footer;