import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useReactRouter from "use-react-router";

import CreateAddress from "@pages/profilePages/addresses/components/CreateAddress";
import SelectedAddress from "./SelectedAddress";
import ChangeAddress from "./ChangeAddress";

const SelectAddress = ({ address, addresses, setAddress }) => {
  const { history } = useReactRouter();
  const [change, setChange] = useState(false);
  const loading = useSelector(state => state.ui.loadingUI);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (addresses.length === 0) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }, [addresses]);

  const onSubmit = () => {
    setAdd(false);
    history.push("/order");
  };

  if (loading === true) {
    return null;
  }

  return (
    <React.Fragment>
      {change === false ? (
        <SelectedAddress setChange={setChange} address={address} />
      ) : (
        <ChangeAddress
          addresses={addresses}
          setOpen={setChange}
          setAddress={setAddress}
          open={change}
        />
      )}
      <CreateAddress
        fullScreen
        open={add}
        onSubmit={onSubmit}
        handleClose={() => history.push("/cart")}
      />
    </React.Fragment>
  );
};

export default SelectAddress;
