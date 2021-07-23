import { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';

import { fetchCountries } from '../../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		}

		fetchAPI();
	}, []);

	return (
		<FormControl className={styles.formControl}>
	        <InputLabel shrink htmlFor="country-native-label-placeholder">Select Country</InputLabel>
			<NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value)}
				inputProps={{
		            name: 'country',
		            id: 'country-native-label-placeholder'
				}}
			>
				<option value="">Select an option</option>
				{fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
