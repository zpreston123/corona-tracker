import React from 'react';
import {
	Paper, Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow
} from '@material-ui/core';
import styles from './TopConfirmedStateTable.module.css';

const TopConfirmedStateTable = ({ data }) => {
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
					  	{data.map(item => (
					  		<TableRow key={item.state}>
						  		<TableCell>{item.state}</TableCell>
						  		<TableCell>{item.confirmed}</TableCell>
					  		</TableRow>
					  	))}
				  	</TableBody>
			  	</Table>
		  	</TableContainer>
		) : null
	);

	return (
		<div className={styles.container}>
			{table}
		</div>
	)
}

export default TopConfirmedStateTable;
