import React from "react";
import { useSelector } from "react-redux";

import LoadingDialog from "./LoadingDialog";

const Loading = ({ inFetching }) => {
  if (inFetching) {
    const open = useSelector(state => state.ui.loadingUI);

    return <LoadingDialog open={open || false} />;
  }
  return <LoadingDialog open={true} />;
};

export default Loading;
