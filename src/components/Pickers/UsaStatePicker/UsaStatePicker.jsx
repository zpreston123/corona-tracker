import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@mui/material';

import { fetchUsaStates } from '../../../api';

import useStyles from './styles';

const UsaStatePicker = React.memo(({ handleUsaStateChange }) => {
	const [fetchedUsaStates, setFetchedUsaStates] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedUsaStates(await fetchUsaStates());
		}

		fetchAPI();
	}, []);

	return (
		<FormControl className={classes.formControl}>
	        <InputLabel shrink variant="standard" htmlFor="state-native-label-placeholder">Select State / Territory</InputLabel>
			<NativeSelect defaultValue="" onChange={(event) => handleUsaStateChange(event.target.value)}
				inputProps={{
		            name: 'state',
		            id: 'state-native-label-placeholder'
				}}
			>
				<option value="">Select an option</option>
				{fetchedUsaStates.map((state, i) => <option key={i} value={state}>{state}</option>)}
			</NativeSelect>
		</FormControl>
	);
});

export default UsaStatePicker;
