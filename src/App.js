import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import * as ROUTES from './routes/routes';

// Redux
import { connect } from 'react-redux';
import * as userActions from './redux/user/user.actions';
import * as menusActions from './redux/menus/menus.actions';
import * as itemsActions from './redux/items/items.actions';

// Data
// import { MenusData, ItemsData } from './data/newData';

// Firebase
import {
	auth,
	createUserProfileDocument,
	// addCollectionAndDocument,
} from './firebase/firebase.utils';
// import * as COLLECTION_IDS from './firebase/collections.ids';

// Components
import SideMenu from './components/Layouts/SideMenu/SideMenu.Component';
import MenuList from './components/MenuList/MenuList.Component';
import ItemsList from './components/ItemsList/ItemsList.Component';
import Detail from './components/Details/Detail.Component';
import SelectTable from './components/SelectTable/SelectTable.Component';
import MainContainer from './components/StyledComponents/MainContainer/MainContainer.component';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const {
			fetchCurrentUserSuccess,
			fetchAllUsersStart,
			fetchItemsCollectionStart,
			fetchCollectionsStart,
		} = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const otherData = {
					firstName: '',
					lastName: '',
					avatar: '',
					company: '',
					role: '',
				};
				const userRef = await createUserProfileDocument(
					userAuth,
					otherData
				);

				userRef.onSnapshot(snapshot => {
					fetchCurrentUserSuccess({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			} else {
				fetchCurrentUserSuccess(userAuth);
			}
		});

		fetchAllUsersStart();
		fetchCollectionsStart();
		fetchItemsCollectionStart();

		// Unquote the code below, if you want to create a new "Menus" collection in firebase.
		// addCollectionAndDocument(COLLECTION_IDS.ITEMS, ItemsData);
	}

	componentWillUnmount() {
		const {
			removeCollectionListener,
			removeItemsCollectionListener,
		} = this.props;
		this.unsubscribeFromAuth();
		removeCollectionListener();
		removeItemsCollectionListener();
	}

	render() {
		return (
			<Switch>
				<React.Fragment>
					<MainContainer>
						<SideMenu>
							<Route exact path={ROUTES.LANDING} />
							<Route
								exact
								path={ROUTES.MENUS_LIST}
								component={MenuList}
							/>
							<Route
								exact
								path={ROUTES.ITEMS_LIST}
								component={ItemsList}
							/>
							<Route
								path={`${ROUTES.MENUS_LIST}/:menuId`}
								component={Detail}
							/>
							<Route
								path={`${ROUTES.ITEMS_LIST}/:itemId`}
								component={Detail}
							/>
							<Route
								path={ROUTES.TABLE}
								component={SelectTable}
							/>
						</SideMenu>
					</MainContainer>
				</React.Fragment>
			</Switch>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	// Start
	fetchItemsCollectionStart: () =>
		dispatch(itemsActions.fetchItemsCollectionStart()),
	fetchCollectionsStart: () => dispatch(menusActions.fetchCollectionsStart()),
	fetchAllUsersStart: () => dispatch(userActions.fetchAllUsersStart()),
	// Success
	fetchCurrentUserSuccess: user =>
		dispatch(userActions.fetchCurrentUserSuccess(user)),
	fetchCollectionsSuccess: menus =>
		dispatch(menusActions.fetchCollectionsSuccess(menus)),
	// Failure
	fetchCollectionsFailure: error =>
		dispatch(menusActions.fetchCollectionsFailure(error)),
	// Listeners
	removeCollectionListener: () =>
		dispatch(menusActions.removeCollectionListener()),
	removeItemsCollectionListener: () =>
		dispatch(itemsActions.removeItemsCollectionListener()),
});

export default connect(null, mapDispatchToProps)(App);
