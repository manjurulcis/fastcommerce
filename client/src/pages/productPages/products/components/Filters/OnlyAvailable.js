import React, { useState, useEffect } from "react";
import queryString from "query-string";
import useReactRouter from "use-react-router";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";

import { appendQuery, removeQuery } from "./utils";

const OnlyAvailable = () => {
  const { history, location } = useReactRouter();
  const { available } = queryString.parse(location.search);
  const [value, setValue] = useState(Boolean(available));

  useEffect(() => {
    setValue(Boolean(available));
  }, [available]);

  const handleChange = e => {
    const checked = e.target.checked;
    if (checked === true) {
      history.push(appendQuery(location, { available: true }));
    } else if (checked === false) {
      history.push(removeQuery(location, "available"));
    }
    setValue(checked);
  };

  return (
    <Paper style={{ marginBottom: "8px" }}>
      <div style={{ padding: "8px" }}>
        <FormGroup row>
          <FormControlLabel
            control={<Switch checked={value} onChange={handleChange} />}
            label="Only available products"
          />
        </FormGroup>
      </div>
    </Paper>
  );
};

export default OnlyAvailable;
