import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ItemSelector } from "./ItemSeletor";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/selectors";
import {ANIMATION_SPEED} from "../../vars/consts";

export const GamesSelector = (props) => {
  let history = useHistory();
  const [selectedItemId, setSelectedItemId] = useState(null),
    [pagination, setPagination] = useState({}),
    [animateListItem, setAnimateListItem] = useState(true),
    [loading, setLoading] = useState(false),
    animationSpeed = ANIMATION_SPEED.QUICK,
    { url } = useRouteMatch(),
    user = useSelector(selectCurrentUser);

  useEffect(() => {
    setAnimateListItem(false);
    setTimeout(() => setAnimateListItem(true), animationSpeed);
  }, []);

  useEffect(() => {
    setPagination({
      startIdx: 0,
      items: 6,
    });
  }, [props.items]);

  const handleListScroll = (event) => {
    const direction = event.currentTarget.getAttribute("data-value");

    function paginate(direction) {
      if (direction === "forward") {
        setPagination({
          startIdx: pagination.startIdx + pagination.items,
          items: pagination.items,
        });
      } else if (direction === "backward") {
        setPagination({
          startIdx: pagination.startIdx - pagination.items,
          items: pagination.items,
        });
      }
    }
    setAnimateListItem(false);
    setTimeout(() => setAnimateListItem(true), animationSpeed);
    setTimeout(() => paginate(direction), animationSpeed);
  };

  const handleListItemClick = (event) => {
    const itemId = event.currentTarget.getAttribute("data-value");
    setSelectedItemId(itemId);
    setLoading(true);
    setTimeout(() => {
      history.push(url + "/" + itemId);
      setLoading(false);
    }, animationSpeed);
  };

  const newProps = {
    ...props,
    handlers: {
      handleListItemClick: handleListItemClick,
      handleListScroll: handleListScroll,
    },
    pagination: pagination,
    flags: {
      animateListItem: animateListItem,
      loading: loading,
    },
    selectedItemId: selectedItemId,
    isAuthenticated: !!user.id,
  };

  return <ItemSelector {...newProps} />;
};
