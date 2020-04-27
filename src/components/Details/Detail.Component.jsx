import React from 'react';
import { compose } from 'redux';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Utils
import { convertToFloat } from '../../utils/global-utils';

// Selectors
import { createStructuredSelector } from 'reselect';
import * as userSelectors from '../../redux/user/user.selectors';
import * as menusSelectors from '../../redux/menus/menus.selectors';
import * as itemsSelectors from '../../redux/items/items.selectors';
// Routes
import * as ROUTES from '../../routes/routes';

// Firebase Utils
import {
	addCollectionAndDocument,
	updateDocument,
} from '../../firebase/firebase.utils';
import * as COLLECTION_IDS from '../../firebase/collections.ids';

// Components
import CheckboxesTags from '../CheckboxesTags/CheckboxesTags.Component';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';

import useStyles from './Detail.Styles';
import { useState } from 'react';

const PriceFormatter = props => {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix={`€ `}
		/>
	);
};

const NumberFormatter = props => {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
		/>
	);
};

const Detail = ({ currentUser, history, match, menu, item, items }) => {
	const classes = useStyles();
	const [errors, setErrors] = useState({
		errorPrice: '',
		errorQuantity: '',
		errorName: '',
	});
	const [menuDetails, setMenuDetails] = useState({
		id: menu === undefined ? '' : menu.id,
		name: menu === undefined ? '' : menu.name,
		price: menu === undefined ? null : menu.price,
		description: menu === undefined ? '' : menu.description,
		createdAt: menu === undefined ? '' : menu.createdAt,
		createdBy: menu === undefined ? '' : menu.createdBy,
	});
	const [itemDetails, setItemDetails] = useState({
		id: item === undefined ? '' : item.id,
		name: item === undefined ? '' : item.name,
		quantity: item === undefined ? null : item.quantity,
		unit: item === undefined ? '' : item.unit,
		price: item === undefined ? null : item.price,
		createdAt: item === undefined ? '' : item.createdAt,
		createdBy: item === undefined ? '' : item.createdBy,
	});
	const { errorPrice, errorQuantity, errorName } = errors;
	const isItem = match.params.hasOwnProperty('itemId');
	const isMenu = match.params.hasOwnProperty('menuId');

	const menuSubmit = () => {
		if (menuDetails.name === '') {
			return setErrors({ errorName: 'Name is required' });
		}

		const newProductDetails = [
			{
				name: menuDetails.name,
				price: convertToFloat(menuDetails.price),
				description: menuDetails.description,
				createdAt: new Date().toISOString(),
				createdBy: currentUser.id,
			},
		];

		addCollectionAndDocument(COLLECTION_IDS.MENUS, newProductDetails);
		setMenuDetails({
			name: '',
			price: null,
			description: '',
		});
		setErrors({ errorName: '' });
		history.push(ROUTES.MENUS_LIST);
	};

	const itemSubmit = () => {
		if (itemDetails.name === '') {
			return setErrors({ errorName: 'Name is required' });
		}

		const newProductDetails = [
			{
				createdAt: new Date().toISOString(),
				createdBy: currentUser.id,
				name: itemDetails.name,
				price: convertToFloat(itemDetails.price),
				quantity: parseFloat(itemDetails.quantity),
				unit: itemDetails.unit,
			},
		];

		addCollectionAndDocument(COLLECTION_IDS.ITEMS, newProductDetails);
		setItemDetails({
			name: '',
			price: null,
			quantity: null,
			unit: '',
		});
		setErrors({ errorName: '' });
		history.push(ROUTES.ITEMS_LIST);
	};

	const menuUpdate = () => {
		const newProductDetails = {
			id: menuDetails.id,
			name: menuDetails.name,
			price: convertToFloat(menuDetails.price),
			description: menuDetails.description,
			createdAt: menuDetails.createdAt,
			createdBy: menuDetails.createdBy,
		};
		const updatedProductDetails = {
			...newProductDetails,
			updatedAt: new Date().toISOString(),
			updatedBy: currentUser.id,
		};

		updateDocument(
			COLLECTION_IDS.MENUS,
			menuDetails.id,
			updatedProductDetails
		);
		setMenuDetails({
			name: '',
			price: null,
			description: '',
		});
		setErrors({ errorName: '' });
		history.push(ROUTES.MENUS_LIST);
	};

	const itemUpdate = () => {
		const newProductDetails = {
			id: itemDetails.id,
			name: itemDetails.name,
			price: convertToFloat(itemDetails.price),
			quantity: parseFloat(itemDetails.quantity),
			unit: itemDetails.unit,
			createdAt: itemDetails.createdAt,
			createdBy: itemDetails.createdBy,
		};
		const updatedProductDetails = {
			...newProductDetails,
			updatedAt: new Date().toISOString(),
			updatedBy: currentUser.id,
		};

		updateDocument(
			COLLECTION_IDS.ITEMS,
			itemDetails.id,
			updatedProductDetails
		);
		setItemDetails({
			name: '',
			price: null,
			quantity: null,
			unit: '',
		});
		setErrors({ errorName: '' });
		history.push(ROUTES.ITEMS_LIST);
	};

	const handleCancel = event => {
		event.preventDefault();

		if (isMenu)
			setMenuDetails({
				name: '',
				price: null,
				description: '',
			});

		if (isItem)
			setItemDetails({
				name: '',
				price: null,
				quantity: null,
				unit: '',
			});

		setErrors({ errorName: '', errorPrice: '', errorQuantity: '' });

		history.goBack();
	};

	const handleSubmit = event => {
		event.preventDefault();

		if (isMenu) menuSubmit();
		if (isItem) itemSubmit();
	};

	const handleUpdate = event => {
		event.preventDefault();

		if (isMenu) menuUpdate();
		if (isItem) itemUpdate();
	};

	const handleChange = event => {
		const { name, value } = event.target;

		if (isMenu) setMenuDetails({ ...menuDetails, [name]: value });
		if (isItem) setItemDetails({ ...itemDetails, [name]: value });
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={8}>
				<Paper className={classes.root}>
					<Box display='flex' alignItems='start' paddingBottom={3}>
						<Typography
							component='h2'
							variant='h5'
							color='inherit'
							noWrap
							className={classes.title}
						>
							Basic Info
						</Typography>
						{isMenu && menu !== undefined && (
							<Button
								variant='contained'
								color='secondary'
								size='small'
								className={classes.deleteButton}
								startIcon={<DeleteIcon />}
							>
								Delete
							</Button>
						)}
						{isItem && item !== undefined && (
							<Button
								variant='contained'
								color='secondary'
								size='small'
								className={classes.deleteButton}
								startIcon={<DeleteIcon />}
							>
								Delete
							</Button>
						)}
					</Box>
					{isMenu && (
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									id='name'
									name='name'
									label='Name'
									value={menuDetails.name}
									fullWidth
									color='primary'
									helperText={errorName}
									error={errorName ? true : false}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id='price'
									name='price'
									label='Price'
									value={menuDetails.price}
									fullWidth
									color='primary'
									helperText={errorPrice}
									error={errorPrice ? true : false}
									onChange={handleChange}
									InputProps={{
										inputComponent: PriceFormatter,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<CheckboxesTags data={items} />
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='description'
									name='description'
									label='Description'
									value={menuDetails.description}
									fullWidth
									color='primary'
									multiline
									rows='6'
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
					)}
					{isItem && (
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									id='name'
									name='name'
									label='Name'
									value={itemDetails.name}
									fullWidth
									color='primary'
									helperText={errorName}
									error={errorName ? true : false}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id='price'
									name='price'
									label='Price'
									value={itemDetails.price}
									fullWidth
									color='primary'
									helperText={errorPrice}
									error={errorPrice ? true : false}
									onChange={handleChange}
									InputProps={{
										inputComponent: PriceFormatter,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id='quantity'
									name='quantity'
									label='Quantity'
									value={itemDetails.quantity}
									fullWidth
									color='primary'
									helperText={errorQuantity}
									error={errorQuantity ? true : false}
									onChange={handleChange}
									InputProps={{
										inputComponent: NumberFormatter,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id='unit'
									name='unit'
									label='Unit'
									value={itemDetails.unit}
									fullWidth
									color='primary'
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
					)}
					<Box display='flex' paddingTop={5}>
						{isMenu &&
							(menu === undefined ? (
								<Button
									variant='contained'
									color='primary'
									size='small'
									startIcon={<SaveIcon />}
									onClick={handleSubmit}
								>
									Save
								</Button>
							) : (
								<Button
									variant='contained'
									color='primary'
									size='small'
									startIcon={<SaveIcon />}
									onClick={handleUpdate}
								>
									Update
								</Button>
							))}
						{isItem &&
							(item === undefined ? (
								<Button
									variant='contained'
									color='primary'
									size='small'
									startIcon={<SaveIcon />}
									onClick={handleSubmit}
								>
									Save
								</Button>
							) : (
								<Button
									variant='contained'
									color='primary'
									size='small'
									startIcon={<SaveIcon />}
									onClick={itemUpdate}
								>
									Update
								</Button>
							))}

						<Button
							variant='contained'
							className={classes.cancelButton}
							size='small'
							startIcon={<BlockIcon />}
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state, ownProps) =>
	createStructuredSelector({
		currentUser: userSelectors.selectCurrentUser,
		menu: menusSelectors.selectSingleMenu(ownProps.match.params.menuId),
		item: itemsSelectors.selectSingleItem(ownProps.match.params.itemId),
		items: itemsSelectors.selectCurrentItems,
	});

export default compose(withRouter, connect(mapStateToProps))(Detail);
