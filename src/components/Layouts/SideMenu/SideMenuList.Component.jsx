import React from 'react';
import { withRouter } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

const MainListItems = props => {
	const { history } = props;
	console.log(history);

	return (
		<div>
			<ListItem button onClick={() => history.push('/detail')}>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='Detail' />
			</ListItem>
			<ListItem button onClick={() => history.push('/tables')}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Tables' />
			</ListItem>
			<ListItem button onClick={() => history.push('/list')}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='List' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary='Reports' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Integrations' />
			</ListItem>
		</div>
	);
};

const SecondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Current month' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Last quarter' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Year-end sale' />
		</ListItem>
	</div>
);

const SideMenuList = ({ history }) => {
	return (
		<React.Fragment>
			<List>
				{' '}
				<MainListItems history={history} />{' '}
			</List>
			<Divider />
			<List> {SecondaryListItems} </List>
		</React.Fragment>
	);
};

export default withRouter(SideMenuList);
