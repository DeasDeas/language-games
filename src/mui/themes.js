import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import MiuButton from "@material-ui/core/Button";

export const mainTheme = createMuiTheme({
	overrides: {
		MuiOutlinedInput: {
			input: {
				padding: '0.5rem'
			},
		},
		MuiInputLabel:{
			outlined:{
				transform: "translate(14px, 10px) scale(1)",
			}
		},
		MuiFormControl: {
			root: {
				width: "100%"
			}
		},
		MuiButton: {
			root: {
				minWidth: "25px"
			}
		},
		MuiAvatar: {
			root: {
				width: "75px",
				height: "75px",
				textTransform: "uppercase",
				fontSize: "2.5rem"
			}
		},
		MuiCardContent: {
			root: {
				padding: 0,
			}
		}
	},
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#fff',
		},
	}
});

mainTheme.palette.green = mainTheme.palette.augmentColor({
	main: '#51c68e',
	contrastText: '#ffffff',
});

mainTheme.palette.red = mainTheme.palette.augmentColor({
	main: '#f60000',
	contrastText: '#ffffff',
});

mainTheme.palette.orange = mainTheme.palette.augmentColor({
	main: '#ffab40',
	contrastText: '#ffffff',
});

const colors = ['primary', 'secondary', 'green', 'red', 'orange']

export const Button = withStyles(theme => ({
	root: props => {
		const color = colors.filter(col => props.color === col)
		if (!!color && props.variant === "contained") {
			return {
				color: mainTheme.palette[color].contrastText,
				backgroundColor: mainTheme.palette[color].main,
				"&:hover": {
					backgroundColor: mainTheme.palette[color].dark,
					// Reset on touch devices, it doesn't add specificity
					"@media (hover: none)": {
						backgroundColor: mainTheme.palette[color].main
					}
				}
			}
		}
		else {
			return {}
		}
	}
}))(MiuButton);

export const IconButton = withStyles(theme => ({
	root: {
		padding: "2.5px",
	}
}))(Button);