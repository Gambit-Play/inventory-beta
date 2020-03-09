import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	divider: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4)
	},
	deleteButton: {
		marginLeft: 'auto'
	},
	cancelButton: {
		marginLeft: theme.spacing(3)
	}
}));

export default useStyles;
