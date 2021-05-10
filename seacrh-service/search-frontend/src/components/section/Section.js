import './Section.css'; 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import store from '../../stores/app.store';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function Section(props) {
    const classes = useStyles();
    const {link, text} = props;

    return (
        <section className="search-section">
            <Card className={classes.root}>
                <CardActionArea>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <a href={link}>{link.slice(0, 40)}...</a>
                    </Typography>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{__html: text}}>
                       
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </section>
    )
}