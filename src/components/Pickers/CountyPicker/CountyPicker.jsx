import React, { useState, useEffect } from 'react';
import { fetchCountiesByState } from '../../../api';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';
import styles from './CountyPicker.module.css';

const CountyPicker = ({ state, handleCountyChange }) => {
	const [fetchedCounties, setFetchedCounties] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCounties(await fetchCountiesByState(state));
		}

		fetchAPI();
	}, [state]);

	return (
		<FormControl className={styles.formControl}>
	        <InputLabel shrink htmlFor="county-native-label-placeholder">Select County</InputLabel>
			<NativeSelect defaultValue="" onChange={(event) => handleCountyChange(event.target.value, state)}
				inputProps={{
		            name: 'county',
		            id: 'county-native-label-placeholder'
				}}
			>
				<option value="">Select an option</option>
				{fetchedCounties.map((county, i) => <option key={i} value={county}>{county}</option>)}
			</NativeSelect>
		</FormControl>
	)
}

export default CountyPicker;
