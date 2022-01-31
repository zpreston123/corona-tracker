import { Card, CardContent, Typography, Grid } from '@mui/material';
import CountUp from 'react-countup';
import cx from 'classnames';

import useStyles from './styles';

const CardComponent = ({ className, cardTitle, value, lastUpdate, cardSubtitle }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={3} padding="12px" component={Card} className={cx(classes.card, className)}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {cardTitle}
                </Typography>
                <Typography variant="h5" component="h2">
                    <CountUp start={0} end={value} duration={2.75} separator=","/>
                </Typography>
                <Typography color="textSecondary">
                    {new Date(lastUpdate).toDateString()}
                </Typography>
                <Typography variant="body2" component="p">
                    {cardSubtitle}
                </Typography>
            </CardContent>
        </Grid>
    );
};

export default CardComponent;
