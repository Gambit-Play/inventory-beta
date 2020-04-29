import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Routes
import * as ROUTES from '../../../routes/routes';

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
	const { location } = props;

	const isCurrent = linkLocation => {
		if (linkLocation === location.pathname) return true;

		return false;
	};
	const iconActive = linkLocation => {
		if (linkLocation === location.pathname) return 'primary';

		return;
	};

	return (
		<div>
			<ListItem
				selected={isCurrent(ROUTES.LANDING) ? true : false}
				button
				component={Link}
				to={ROUTES.LANDING}
			>
				<ListItemIcon>
					<DashboardIcon color={iconActive(ROUTES.LANDING)} />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem
				selected={isCurrent(ROUTES.TABLE) ? true : false}
				button
				component={Link}
				to={ROUTES.TABLE}
			>
				<ListItemIcon>
					<ShoppingCartIcon color={iconActive(ROUTES.TABLE)} />
				</ListItemIcon>
				<ListItemText primary='Tables' />
			</ListItem>
			<ListItem
				selected={isCurrent(ROUTES.MENUS_LIST) ? true : false}
				button
				component={Link}
				to={ROUTES.MENUS_LIST}
			>
				<ListItemIcon>
					<PeopleIcon color={iconActive(ROUTES.MENUS_LIST)} />
				</ListItemIcon>
				<ListItemText primary='Menus List' />
			</ListItem>
			<ListItem
				selected={isCurrent(ROUTES.ITEMS_LIST) ? true : false}
				button
				component={Link}
				to={ROUTES.ITEMS_LIST}
			>
				<ListItemIcon>
					<BarChartIcon color={iconActive(ROUTES.ITEMS_LIST)} />
				</ListItemIcon>
				<ListItemText primary='Items List' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='--Integrations--' />
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
			<ListItemText primary='--Current month--' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='--Last quarter--' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='--Year-end sale--' />
		</ListItem>
	</div>
);

const SideMenuList = ({ match, location, history }) => {
	return (
		<React.Fragment>
			<List>
				<MainListItems
					history={history}
					match={match}
					location={location}
				/>
			</List>
			<Divider />
			<List> {SecondaryListItems} </List>
		</React.Fragment>
	);
};

export default withRouter(SideMenuList);
