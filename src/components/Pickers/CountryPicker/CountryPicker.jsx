import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@mui/material';

import { fetchCountries } from '../../../api';

import useStyles from './styles';

const CountryPicker = React.memo(({ handleCountryChange }) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		}

		fetchAPI();
	}, []);

	return (
		<FormControl className={classes.formControl}>
	        <InputLabel shrink variant="standard" htmlFor="country-native-label-placeholder">Select Country</InputLabel>
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
});

export default CountryPicker;
