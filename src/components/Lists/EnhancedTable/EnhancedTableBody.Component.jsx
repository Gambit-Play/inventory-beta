import React from 'react';
import PropTypes from 'prop-types';

import { stableSort, getComparator } from './EnhancedTable.Actions';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
export default function EnhancedTableBody(props) {
	const {
		order,
		orderBy,
		page,
		dense,
		rowsPerPage,
		rows,
		selected,
		setSelected
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

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	return (
		<TableBody>
			{stableSort(rows, getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((row, index) => {
					const isItemSelected = isSelected(row.name);
					const labelId = `enhanced-table-checkbox-${index}`;

					return (
						<TableRow
							hover
							onClick={event => handleClick(event, row.name)}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={row.name}
							selected={isItemSelected}
						>
							<TableCell padding='checkbox'>
								<Checkbox
									checked={isItemSelected}
									inputProps={{
										'aria-labelledby': labelId
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
							<TableCell align='right'>{row.calories}</TableCell>
							<TableCell align='right'>{row.fat}</TableCell>
							<TableCell align='right'>{row.carbs}</TableCell>
							<TableCell align='right'>{row.protein}</TableCell>
						</TableRow>
					);
				})}
			{emptyRows > 0 && (
				<TableRow
					style={{
						height: (dense ? 33 : 53) * emptyRows
					}}
				>
					<TableCell colSpan={6} />
				</TableRow>
			)}
		</TableBody>
	);
}

EnhancedTableBody.propTypes = {
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	dense: PropTypes.bool.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	rows: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired
};
