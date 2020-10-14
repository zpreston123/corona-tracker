import React, { useState, useEffect } from 'react';
import { fetchStates } from '../../../api';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';
import styles from './StatePicker.module.css';

const StatePicker = ({ handleStateChange }) => {
	const [fetchedStates, setFetchedStates] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedStates(await fetchStates());
		}

		fetchAPI();
	}, []);

	return (
		<FormControl className={styles.formControl}>
	        <InputLabel shrink htmlFor="state-native-label-placeholder">Select State / Territory</InputLabel>
			<NativeSelect defaultValue="" onChange={(event) => handleStateChange(event.target.value)}
				inputProps={{
		            name: 'state',
		            id: 'state-native-label-placeholder'
				}}
			>
				<option value="">Select an option</option>
				{fetchedStates.map((state, i) => <option key={i} value={state}>{state}</option>)}
			</NativeSelect>
		</FormControl>
	)
}

export default StatePicker;
