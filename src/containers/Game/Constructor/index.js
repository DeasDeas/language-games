import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import classes from "../styles.module.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Button, IconButton} from "../../../mui/themes";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { PAGE_STATE } from "../../../vars/consts";
import Typography from "@material-ui/core/Typography";
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const offsetTop = (x) => { return { marginTop: x }}

export const Constructor = ({ gameState }) => {
  return (
    gameState === PAGE_STATE.PREPARING && <></>,
    gameState === PAGE_STATE.RUNNING && (<>
	    <SetControlsForm />
	    <ItemChangeForm />
    </>)
  );
};

const SetControlsForm = () => {

	return (
  <>
	  <Box className={classes.asideChangeForm} component="form">
		  <Typography variant="body1" component="span">
			  {"Сет: "}
		  </Typography>
		  <Typography variant="h6" component="span">
			  "SET 1"
		  </Typography>
		  <TextField
			  style={offsetTop("5px")}
			  className={`${classes.inputField}`}
			  label="Title"
		  />
		  <TextField
			  style={offsetTop("5px")}
			  className={`${classes.inputField} ${classes.offsetTop1X}`}
			  label="Subtitle"
			  multiline={true}
			  spellCheck={false}
		  />
		  <Box className={`${classes.offsetTop4X} ${classes.controls}`}>
			  <IconButton className={classes.iconButton} variant="contained" color="primary">
				  <SaveIcon/>
			  </IconButton>
			  <Button variant="contained" color="red">
				  УДАЛИТЬ СЕТ
			  </Button>
		  </Box>
	  </Box>
  </>);
};

const ItemChangeForm = () => {
	const [type, setType] = useState("10");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <>
      <Box className={classes.asideChangeForm} component="form">
        <Box className={classes.imageWrapper}>
          <img
            src={"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
            alt="1"
          />
        </Box>

        <TextField
	        style={offsetTop("5px")}
	        className={`${classes.inputField}`}
          label="Image"
        />
        <TextField
	        style={offsetTop("5px")}
	        className={`${classes.inputField}`}
          label="Word"
        />
        <Box className={`${classes.selectorWrapper} ${classes.offsetTop2X}`}>
          <InputLabel id="type-selector" shrink>
            Type
          </InputLabel>
          <Select
            className={classes.typeSelector}
            labelId="type-selector"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={10}>All</MenuItem>
          </Select>
        </Box>
        <Box className={`${classes.offsetTop4X} ${classes.controls}`}>
	        <IconButton className={classes.iconButton} variant="contained" color="primary">
            <SaveIcon/>
          </IconButton>
	        <IconButton className={classes.iconButton} variant="contained" color="red">
		        <DeleteForeverIcon/>
	        </IconButton>
        </Box>
      </Box>
    </>
  );
};