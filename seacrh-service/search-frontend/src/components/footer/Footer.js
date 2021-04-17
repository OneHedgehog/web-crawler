import './Footer.css'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    copyright: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

function Footer() {
    const classes = useStyles();

    return (
        <footer>
            <Typography className={classes.copyright} color="textSecondary" gutterBottom>
                Developed by the OneHedgehog
            </Typography>
        </footer>
    );
}

export default Footer;