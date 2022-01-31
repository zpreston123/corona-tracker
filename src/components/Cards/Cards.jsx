import React from 'react';
import { Typography, Grid } from '@mui/material';
import CardComponent from './Card/Card';

import useStyles from './styles';

const Info = React.memo(({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    const classes = useStyles();

	if (!confirmed) {
	    return 'Loading...';
	}

	return (
		<div className={classes.container}>
	        <Typography variant="h4" component="h2">Global</Typography>
			<Grid container justifyContent="center">
				<CardComponent
					className={classes.infected}
					cardTitle="Infected"
					value={confirmed}
					lastUpdate={lastUpdate}
					cardSubtitle="Number of active cases from COVID-19."
				/>
				<CardComponent
					className={classes.recovered}
					cardTitle="Recovered"
					value={recovered}
					lastUpdate={lastUpdate}
					cardSubtitle="Number of recoveries from COVID-19."
				/>
				<CardComponent
					className={classes.deaths}
					cardTitle="Deaths"
					value={deaths}
					lastUpdate={lastUpdate}
					cardSubtitle="Number of deaths caused by COVID-19."
				/>
			</Grid>
		</div>
	);
});

export default Info;
