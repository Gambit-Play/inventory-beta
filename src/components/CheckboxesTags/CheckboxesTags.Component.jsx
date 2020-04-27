// CheckboxesTags
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const CheckboxesTags = props => {
	const handleChange = (event, value) => {
		console.log('@@ CheckboxesTags - onChange: ', value);
	};
	return (
		<Autocomplete
			multiple
			id='checkboxes-tags-demo'
			options={props.data}
			disableCloseOnSelect
			onChange={handleChange}
			getOptionLabel={option => option.name}
			renderOption={(option, { selected }) => (
				<React.Fragment>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.name}
				</React.Fragment>
			)}
			style={{ width: 500 }}
			renderInput={params => (
				<TextField
					{...params}
					variant='standard'
					label='Ingredients'
					placeholder='Search'
				/>
			)}
		/>
	);
};

export default CheckboxesTags;
