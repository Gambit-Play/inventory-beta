import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Utils
import { convertArrayToObject } from './utils/global-utils';

// Routes
import * as ROUTES from './routes/routes';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { setMenus } from './redux/menus/menus.actions';

// Data
// import { MenusData } from './data/newData';

// Firebase
import {
	auth,
	createUserProfileDocument,
	getCollection,
	getDocument,
	// removeDocument,
	// addCollectionAndDocument,
} from './firebase/firebase.utils';

// Components
import SideMenu from './components/Layouts/SideMenu/SideMenu.Component';
import EnhancedTable from './components/Lists/EnhancedTable/EnhancedTable.Component';
import Detail from './components/Details/Detail.Component';
import SelectTable from './components/SelectTable/SelectTable.Component';
import MainContainer from './components/StyledComponents/MainContainer/MainContainer.component';

class App extends React.Component {
	unsubscribeFromAuth = null;
	unsubscribeFromMenus = null;

	componentDidMount() {
		const { setCurrentUser, setMenus } = this.props;
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
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
		});

		(async function () {
			try {
				const docData = await getDocument(
					'Menus',
					'dk1UtNcqFzXY3niclrQw'
				);
				console.log(docData);
			} catch (error) {
				console.log(error);
			}
		})();

		// const getDoc = async () => {
		// 	const docData = await getDocument('Menus', '9xZv0jxTTOjH5OxVlMH4');
		// 	console.log(docData);
		// };

		// getDoc();

		const setNewMenus = async () => {
			const collectionRef = await getCollection('Menus');
			this.unsubscribeFromMenus = collectionRef.onSnapshot(snapshot => {
				const data = snapshot.docs.map(doc => doc.data());

				const menus = convertArrayToObject(data, 'id');
				setMenus(menus);
				console.log(menus);
			});
		};

		setNewMenus();
		// Unquote the code below, if you want to create a new "Menus" collection in firebase.
		// addCollectionAndDocument('Menus', MenusData);
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
		this.unsubscribeFromMenus();
	}

	render() {
		return (
			<Switch>
				<React.Fragment>
					<MainContainer>
						<SideMenu>
							<Route
								path={ROUTES.LIST}
								component={EnhancedTable}
							/>
							<Route path={ROUTES.DETAIL} component={Detail} />
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
	setCurrentUser: user => dispatch(setCurrentUser(user)),
	setMenus: menus => dispatch(setMenus(menus)),
});

export default connect(null, mapDispatchToProps)(App);
