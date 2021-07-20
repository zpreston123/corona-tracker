import { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';

import { fetchUsaStates } from '../../../api';

import styles from './UsaStatePicker.module.css';

const UsaStatePicker = ({ handleUsaStateChange }) => {
	const [fetchedUsaStates, setFetchedUsaStates] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedUsaStates(await fetchUsaStates());
		}

		fetchAPI();
	}, []);

	return (
		<FormControl className={styles.formControl}>
	        <InputLabel shrink htmlFor="state-native-label-placeholder">Select State / Territory</InputLabel>
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
};

export default UsaStatePicker;
