import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import useStyles from './styles';

const UsaStatesTable = React.memo(({ data }) => {
	const classes = useStyles();

	const table = (
		data.length
		  ? (
		  	<TableContainer component={Paper}>
			  	<Table>
				  	<TableHead>
					  	<TableRow>
						  	<TableCell><b>State</b></TableCell>
						  	<TableCell><b>Total</b></TableCell>
					  	</TableRow>
				  	</TableHead>
				  	<TableBody>
					  	{data.map(({ state, total }) => (
					  		<TableRow key={state}>
						  		<TableCell>{state}</TableCell>
						  		<TableCell>{total}</TableCell>
					  		</TableRow>
					  	))}
				  	</TableBody>
			  	</Table>
		  	</TableContainer>
		) : null
	);

	return (
		<div className={classes.container}>
			{table}
		</div>
	);
});

export default UsaStatesTable;
