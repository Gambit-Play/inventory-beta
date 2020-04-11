import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/* ================================================================ */
/*  Initializing Firebase Process                                   */
/* ================================================================ */

/* Development Firebase Project */
const devConfig = {
	apiKey: process.env.REACT_APP_DEV_API_KEY,
	authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
	projectId: process.env.REACT_APP_DEV_PROJECT_ID,
	storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_DEV_APP_ID,
	measurementId: process.env.REACT_APP_DEV_MEASUREMENT_ID,
};

/* Production Firebase Project */
const prodConfig = {
	apiKey: process.env.REACT_APP_PROD_API_KEY,
	authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
	projectId: process.env.REACT_APP_PROD_PROJECT_ID,
	storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_PROD_APP_ID,
	measurementId: process.env.REACT_APP_PROD_MEASUREMENT_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

firebase.initializeApp(config);

/* ================================================================ */
/*  Firebase Actions                                                */
/* ================================================================ */

export const createUserProfileDocument = async (userAuth, otherData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`Users/${userAuth.uid}`);
	const snapshot = await userRef.get();

	console.log(snapshot);

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date().toISOString();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...otherData,
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocument = async (collectionId, objectToAdd) => {
	const collectionRef = firestore.collection(collectionId);
	const batch = firestore.batch();

	objectToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();

		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// provider.addScope('profile');
// provider.addScope('email');
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
