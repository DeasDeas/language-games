import React from "react";
import Box from "@material-ui/core/Box";
import classes from "./styles.module.css";
import "../styles.css";
import Typography from "@material-ui/core/Typography";
import {Button} from "../../mui/themes";
import {paths} from "../../vars/paths";
import {NavLink} from "react-router-dom";

export const MainPage = () => {
  return (
    <Box className="templateB">
      <section className={`gridElement ${classes.description}`}>
        <Typography variant="h4" component="h1">
          Lorem Ipsum
        </Typography>
        <Typography variant="body1" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
	      <Box className="sectionRow">
		      <NavLink to={paths.gamesPage}>
			      <Button className="sectionRow__item" variant="contained" color="primary">
				      ИГРАТЬ
			      </Button>
		      </NavLink>
	      </Box>
      </section>
      <aside className={`${classes.games} gridElement`}>
        <Typography variant="h5" component="h2">
          Dolor Sit Amet
        </Typography>
        <Typography variant="body2" component="p">
          Risus in hendrerit gravida rutrum. Tortor aliquam nulla facilisi cras.
          Semper viverra nam libero justo laoreet sit amet cursus sit. At risus
          viverra adipiscing at. Dignissim cras tincidunt lobortis feugiat
          vivamus at augue eget arcu. Elit duis tristique sollicitudin nibh. Sed
          libero enim sed faucibus turpis in. Fermentum odio eu feugiat pretium
          nibh ipsum. Vitae tempus quam pellentesque nec nam aliquam sem.
          Penatibus et magnis dis parturient montes nascetur ridiculus mus.
          Aliquam etiam erat velit scelerisque in. Euismod elementum nisi quis
          eleifend quam adipiscing vitae. Et netus et malesuada fames. Mi quis
          hendrerit dolor magna eget est.
        </Typography>
      </aside>
    </Box>
  );
};