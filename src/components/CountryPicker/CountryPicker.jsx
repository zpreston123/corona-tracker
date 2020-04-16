import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		}

		fetchAPI();
	}, [setFetchedCountries]);

	return (
		<FormControl className={styles.formControl}>
	        <InputLabel shrink htmlFor="country-native-label-placeholder">Select Country</InputLabel>
			<NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}
				inputProps={{
		            name: 'country',
		            id: 'country-native-label-placeholder'
				}}
			>
				<option value="">Global</option>
				{fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
			</NativeSelect>
		</FormControl>
	)
}

export default CountryPicker;
