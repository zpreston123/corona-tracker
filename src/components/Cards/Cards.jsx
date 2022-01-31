import React from 'react';
import { Typography, Grid } from '@mui/material';
import CardComponent from './Card/Card';

import styles from './Cards.module.css';

const Info = React.memo(({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
	if (!confirmed) {
	    return 'Loading...';
	}

	return (
		<div className={styles.container}>
	        <Typography variant="h4" component="h2">Global</Typography>
			<Grid container justifyContent="center">
				<CardComponent
					className={styles.infected}
					cardTitle="Infected"
					value={confirmed}
					lastUpdate={lastUpdate}
					cardSubtitle="Number of active cases from COVID-19."
				/>
				<CardComponent
					className={styles.recovered}
					cardTitle="Recovered"
					value={recovered}
					lastUpdate={lastUpdate}
					cardSubtitle="Number of recoveries from COVID-19."
				/>
				<CardComponent
					className={styles.deaths}
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
