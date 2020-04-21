import React from 'react';
import { compose } from 'redux';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Utils
import { convertToFloat } from '../../utils/global-utils';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectSingleMenu } from '../../redux/menus/menus.selectors';

// Routes
import * as ROUTES from '../../routes/routes';

// Firebase Utils
import { addCollectionAndDocument } from '../../firebase/firebase.utils';

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

const Detail = ({ currentUser, history, menu }) => {
	const classes = useStyles();
	const [errors, setErrors] = useState({
		errorPrice: '',
		errorName: '',
	});
	const [menuDetails, setMenuDetails] = useState({
		name: menu === undefined ? '' : menu.name,
		price: menu === undefined ? null : menu.price,
		description: menu === undefined ? '' : menu.description,
	});
	const { name, price, description } = menuDetails;
	const { errorPrice, errorName } = errors;

	const handleCancel = event => {
		event.preventDefault();

		setMenuDetails({
			name: '',
			price: null,
			description: '',
		});
		setErrors({ errorName: '', errorPrice: '' });

		//TODO: Code below is a test
		// history.push(ROUTES.LIST);
		history.goBack();
	};

	const handleSubmit = event => {
		event.preventDefault();

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

		addCollectionAndDocument('Menus', newProductDetails);
		setMenuDetails({
			name: '',
			price: null,
			description: '',
		});
		setErrors({ errorName: '' });
		history.push(ROUTES.LIST);
	};

	const handleChange = event => {
		const { name, value } = event.target;

		setMenuDetails({ ...menuDetails, [name]: value });
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
						<Button
							variant='contained'
							color='secondary'
							size='small'
							className={classes.deleteButton}
							startIcon={<DeleteIcon />}
						>
							Delete
						</Button>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<TextField
								id='name'
								name='name'
								label='Name'
								value={name}
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
								value={price}
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
						<Grid item xs={12}>
							<TextField
								id='description'
								name='description'
								label='Description'
								value={description}
								fullWidth
								color='primary'
								multiline
								rows='6'
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Box display='flex' paddingTop={5}>
						{menu === undefined ? (
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
								onClick={handleCancel}
							>
								Update
							</Button>
						)}

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
		currentUser: selectCurrentUser,
		menu: selectSingleMenu(ownProps.match.params.menuId),
	});

export default compose(withRouter, connect(mapStateToProps))(Detail);
