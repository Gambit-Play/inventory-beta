import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Routes
import * as ROUTES from '../../../routes/routes';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const EnhancedTableBody = props => {
	const {
		page,
		dense,
		rowsPerPage,
		rows,
		selected,
		setSelected,
		history,
		items,
		menus,
		itemsTotal,
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
		if (menus) history.push(`${ROUTES.MENUS_LIST}/${rowId}`);
		if (items) history.push(`${ROUTES.ITEMS_LIST}/${rowId}`);
	};

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	return (
		<TableBody>
			{(rowsPerPage > 0
				? rows.slice(
						page * rowsPerPage,
						page * rowsPerPage + rowsPerPage
				  )
				: rows
			).map((row, index) => {
				const isItemSelected = isSelected(row.name);
				const labelId = `enhanced-table-checkbox-${index}`;

				return (
					<TableRow
						hover
						aria-checked={isItemSelected}
						tabIndex={-1}
						key={row.id}
						selected={isItemSelected}
					>
						<TableCell padding='checkbox'>
							<Checkbox
								checked={isItemSelected}
								onClick={event => handleClick(event, row.name)}
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
							onClick={event => handleRowClick(event, row.id)}
						>
							{row.name}
						</TableCell>
						{menus && (
							<TableCell
								onClick={event => handleRowClick(event, row.id)}
							>
								{row.description}
							</TableCell>
						)}
						<TableCell
							align='right'
							onClick={event => handleRowClick(event, row.id)}
						>
							€{parseFloat(row.price).toFixed(2)}
						</TableCell>
						{items && (
							<TableCell
								align='right'
								onClick={event => handleRowClick(event, row.id)}
							>
								{row.quantity}
							</TableCell>
						)}
						{items && (
							<TableCell
								align='right'
								onClick={event => handleRowClick(event, row.id)}
							>
								{!isNaN(row.cost) &&
									`€${parseFloat(row.cost).toFixed(2)}`}
							</TableCell>
						)}
						{items && (
							<TableCell
								align='right'
								onClick={event => handleRowClick(event, row.id)}
							>
								{row.unit}
							</TableCell>
						)}

						<TableCell
							align='right'
							onClick={event => handleRowClick(event, row.id)}
						>
							{row.createdBy}
						</TableCell>
						<TableCell
							align='right'
							onClick={event => handleRowClick(event, row.id)}
						>
							{row.createdAt}
						</TableCell>
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
			<TableRow>
				<TableCell colSpan={12} align='right'>
					<Typography
						variant='subtitle2'
						color='error'
					>{`Total Cost: €${parseFloat(itemsTotal).toFixed(
						2
					)}`}</Typography>{' '}
				</TableCell>
			</TableRow>
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
	history: PropTypes.object.isRequired,
	items: PropTypes.bool,
	menus: PropTypes.bool,
	itemsTotal: PropTypes.number.isRequired,
};

export default withRouter(EnhancedTableBody);
