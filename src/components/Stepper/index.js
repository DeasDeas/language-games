import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import useWindowDimensions from "../../features/hooks/useWindowDimensions";
import {VIEWPORTS} from "../../vars/consts";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

export const Stepper = ({length=10, stepForward, stepBackward}) => {
	const { width } = useWindowDimensions(),
		classes = useStyles(),
		theme = useTheme(),
		[activeStep, setActiveStep] = React.useState(0);

	const variant = width < VIEWPORTS.MEDIUM ? "text" : "dots";

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		stepForward && stepForward();
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		stepBackward && stepBackward();
	};

	return (
		<MobileStepper
			variant={variant}
			steps={length}
			position="static"
			activeStep={activeStep}
			className={classes.root}
			nextButton={
				<Button size="small" onClick={handleNext} disabled={activeStep === length - 1}>
					Next
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</Button>
			}
			backButton={
				<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
					Back
				</Button>
			}
		/>
	);
}