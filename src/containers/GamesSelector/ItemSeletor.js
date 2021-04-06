import React, { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import classes from "./styles.module.css";
import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import Fade from "@material-ui/core/Fade";
import { Proceed } from "../../components/Proceed";

export const ItemSelector = ({ title, items, flags, selectedItemId, pagination, handlers }) => {
	return (
		<section className={`gridElement ${classes.gamesSelector}`}>
			{flags.loading && <Proceed wrapper={"main"} />}
			<Typography variant="h4" component="h1">
				{title
					.slice(1)
					.split("-")
					.map((e) => _.capitalize(e))
					.join(" ")}
			</Typography>
			<Fade in={flags.animateListItem}>
				<List className={`${classes.itemsWrapper}`}>
					<Divider />
					{items
						.slice(pagination.startIdx, pagination.startIdx + pagination.items)
						.map((e) => (
							<Fragment key={e.id}>
								<ListItem
									button
									selected={selectedItemId === e.id}
									onClick={handlers.handleListItemClick}
									data-value={e.id}
								>
									<ListItemText primary={e.name} />
								</ListItem>
								<Divider />
							</Fragment>
						))}
				</List>
			</Fade>
			<IconButton
				data-value={"backward"}
				onClick={handlers.handleListScroll}
				disabled={pagination.startIdx === 0}
			>
				<NavigateBefore />
			</IconButton>
			<IconButton
				data-value={"forward"}
				onClick={handlers.handleListScroll}
				disabled={pagination.startIdx >= items.length - pagination.items}
			>
				<NavigateNext />
			</IconButton>
		</section>
	);
};
