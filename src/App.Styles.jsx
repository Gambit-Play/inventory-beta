import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#f5f5f5',
		minHeight: '100vh'
	},
	content: {
		padding: 24,
		marginTop: 64,
		maxHeight: 'calc(100vh - 64px)',
		overflow: 'auto',
		width: '100%'
	}
}));

export default useStyles;
