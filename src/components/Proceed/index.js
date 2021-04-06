import React, {useEffect, useState} from "react";
import Loader from "react-loader-spinner";
import {createPortal} from "react-dom";


export const Proceed = ({ className = 'root-portal', el = 'div', wrapper="body"}) => {
	const [container] = useState(document.createElement(el))

	container.classList.add(className)

	useEffect(() => {
		document.querySelector(wrapper).appendChild(container)
		return () => {
			document.querySelector(wrapper).removeChild(container)
		}
	}, [])

	return createPortal(
		<Loader
			type="ThreeDots"
			color="#FFF"
			height={"20vh"}
			width={"20vh"}
		/>, container
	)
}