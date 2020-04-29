// Data

export const createRowData = (
	name,
	description,
	price,
	createdBy,
	createdAt
) => {
	return { name, description, price, createdBy, createdAt };
};

export const rows = [
	createRowData('Cupcake', 305, 3.7, 67, 4.3),
	createRowData('Donut', 452, 25.0, 51, 4.9),
	createRowData('Eclair', 262, 16.0, 24, 6.0),
	createRowData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createRowData('Gingerbread', 356, 16.0, 49, 3.9),
	createRowData('Honeycomb', 408, 3.2, 87, 6.5),
	createRowData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createRowData('Jelly Bean', 375, 0.0, 94, 0.0),
	createRowData('KitKat', 518, 26.0, 65, 7.0),
	createRowData('Lollipop', 392, 0.2, 98, 0.0),
	createRowData('Marshmallow', 318, 0, 81, 2.0),
	createRowData('Nougat', 360, 19.0, 9, 37.0),
	createRowData('Oreo', 437, 18.0, 63, 4.0),
];

export const menusHeadCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Menu',
	},
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'Description',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
	},
	{
		id: 'createdBy',
		numeric: true,
		disablePadding: false,
		label: 'Created By',
	},
	{
		id: 'createdAt',
		numeric: true,
		disablePadding: false,
		label: 'Created At',
	},
];

export const itemsHeadCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Item',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'Quantity',
	},
	{
		id: 'cost',
		numeric: true,
		disablePadding: false,
		label: 'Cost',
	},
	{
		id: 'unit',
		numeric: true,
		disablePadding: false,
		label: 'Unit',
	},
	{
		id: 'createdBy',
		numeric: true,
		disablePadding: false,
		label: 'Created By',
	},
	{
		id: 'createdAt',
		numeric: true,
		disablePadding: false,
		label: 'Created At',
	},
];

export const headCells_Example = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Dessert (100g serving)',
	},
	{
		id: 'calories',
		numeric: true,
		disablePadding: false,
		label: 'Calories',
	},
	{
		id: 'fat',
		numeric: true,
		disablePadding: false,
		label: 'Fat (g)',
	},
	{
		id: 'carbs',
		numeric: true,
		disablePadding: false,
		label: 'Carbs (g)',
	},
	{
		id: 'protein',
		numeric: true,
		disablePadding: false,
		label: 'Protein (g)',
	},
];
