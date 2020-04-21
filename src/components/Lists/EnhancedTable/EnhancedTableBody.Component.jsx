import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Routes
import * as ROUTES from '../../../routes/routes';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const EnhancedTableBody = props => {
	const {
		page,
		dense,
		rowsPerPage,
		rows,
		selected,
		setSelected,
		history,
	} = props;

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleRowClick = (event, rowId) => {
		history.push(`${ROUTES.DETAIL}/${rowId}`);
	};

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	return (
		<TableBody>
			{rows
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row, index) => {
					const isItemSelected = isSelected(row.name);
					const labelId = `enhanced-table-checkbox-${index}`;

					return (
						<TableRow
							hover
							onClick={event => handleRowClick(event, row.id)}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={row.name}
							selected={isItemSelected}
						>
							<TableCell padding='checkbox'>
								<Checkbox
									checked={isItemSelected}
									onClick={event =>
										handleClick(event, row.name)
									}
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</TableCell>
							<TableCell
								component='th'
								id={labelId}
								scope='row'
								padding='none'
							>
								{row.name}
							</TableCell>
							<TableCell>{row.description}</TableCell>
							<TableCell align='right'>€ {row.price}</TableCell>
							<TableCell align='right'>{row.createdBy}</TableCell>
							<TableCell align='right'>{row.createdAt}</TableCell>
						</TableRow>
					);
				})}
			{emptyRows > 0 && (
				<TableRow
					style={{
						height: (dense ? 33 : 53) * emptyRows,
					}}
				>
					<TableCell colSpan={6} />
				</TableRow>
			)}
		</TableBody>
	);
};

EnhancedTableBody.propTypes = {
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	dense: PropTypes.bool.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	rows: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default withRouter(EnhancedTableBody);
