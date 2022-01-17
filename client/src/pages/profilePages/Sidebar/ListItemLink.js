import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

const ListItemLink = props => {
  return <ListItem button component={Link} {...props} />;
};

ListItemLink.defaultProps = {
  to: ""
};

export default ListItemLink;
