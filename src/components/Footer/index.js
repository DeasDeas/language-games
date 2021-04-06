import Box from "@material-ui/core/Box";
import classes from './styles.module.css'

export const Footer = () => {
	return (
		<footer className={`outerWrapper ${classes.footer} background_primary`}>
			<Box className={`innerWrapper ${classes.footerInner}`}>
			</Box>
		</footer>
	);
};