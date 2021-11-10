import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import styles from './VaccineCandidatesTable.module.css';

const VaccineCandidatesTable = React.memo(({ data }) => {
    const table = (
        data.length
          ? (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Candidate</b></TableCell>
                            <TableCell><b>Mechanism</b></TableCell>
                            <TableCell><b>Sponsors</b></TableCell>
                            <TableCell><b>Trial Phase</b></TableCell>
                            <TableCell><b>Institutions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ candidate, mechanism, sponsors, trialPhase, institutions }) => (
                            <TableRow key={candidate}>
                                <TableCell>{candidate}</TableCell>
                                <TableCell>{mechanism}</TableCell>
                                <TableCell>{sponsors}</TableCell>
                                <TableCell>{trialPhase}</TableCell>
                                <TableCell>{institutions}</TableCell>
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
    );
});

export default VaccineCandidatesTable;
