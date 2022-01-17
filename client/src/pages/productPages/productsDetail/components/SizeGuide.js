import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import DialogTitle from "@components/layouts/DialogTitle";

const SizeGuide = ({ open, setOpen, sizes }) => {
  const theme = useTheme();
  const responsiveFullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      fullScreen={responsiveFullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>Size Guide</DialogTitle>
      <DialogContent>
        <Typography>The unit of measurement is CM</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Waist</TableCell>
              <TableCell align="center">Hip</TableCell>
              <TableCell align="center">Height</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.map(size => (
              <TableRow key={size.id}>
                <TableCell align="center">{size.size}</TableCell>
                <TableCell align="center">
                  {size.waist_min_size} <br />
                  {size.waist_max_size && (
                    <React.Fragment>
                      - <br />
                      {size.waist_max_size}
                    </React.Fragment>
                  )}
                </TableCell>
                <TableCell align="center">
                  {size.hip_min_size} <br />
                  {size.hip_max_size && (
                    <React.Fragment>
                      - <br />
                      {size.hip_max_size}
                    </React.Fragment>
                  )}
                </TableCell>
                <TableCell align="center">
                  {size.height_min_size} <br />
                  {size.height_max_size && (
                    <React.Fragment>
                      - <br />
                      {size.height_max_size}
                    </React.Fragment>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;
