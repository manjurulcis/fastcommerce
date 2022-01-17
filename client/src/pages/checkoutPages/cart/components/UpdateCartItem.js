import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import { updateQuantity } from "@actions/cartActions";
import { removeFromCart } from "@actions/cartActions";
import DialogTitle from "@components/layouts/DialogTitle";
import LoadingButton from "@components/loading/LoadingButton";

const UpdateCartItem = ({ id, quantity, available_count }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(removeFromCart(id, handleClose));
  };

  const handleAdd = () => {
    dispatch(updateQuantity(id, quantity + 1));
  };

  const handleRemove = () => {
    dispatch(updateQuantity(id, quantity - 1));
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="split button"
        size="small"
      >
        {quantity !== 1 ? (
          <Button onClick={handleRemove}>
            <RemoveIcon fontSize="small" />
          </Button>
        ) : (
          <Button>
            <DeleteIcon onClick={handleOpen} fontSize="small" />
          </Button>
        )}
        <Button>{quantity}</Button>
        <Button onClick={handleAdd} disabled={available_count === quantity}>
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle onClose={handleClose}>Remove item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            No, Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
          >
            Yes, Remove
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateCartItem;
