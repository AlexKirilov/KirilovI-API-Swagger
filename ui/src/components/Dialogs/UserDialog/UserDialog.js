import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./UserDialog.module.scss";
import { UserDetailsI } from "../../../Core/Models/user.interface";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import Divider from "@mui/material/Divider";
// import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const UserDialog = ({
  isOpen,
  title,
  errorMsg,
  userDetails,
  toggleDialog,
  updateDetails,
}) => {
  const [details, setDetails] = React.useState(userDetails);

  useEffect(() => {
    setDetails(userDetails);
  }, [userDetails]);

  const handleClose = () => {
    toggleDialog(false);
  };

  const confirmUpdate = () => {
    updateDetails(details);
    // Do not close the dialog here. ensure there are no API errors before close
  };

  const handleInput = ($event, prop1, prop2) => {
    if (prop2) {
      details[prop1] = { ...details[prop1], [prop2]: $event.target.value };
      setDetails(details);
    } else setDetails({ ...details, [prop1]: $event.target.value });
  };

  return (
    <div className={styles.UserDialog} data-testid="UserDialog">
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={"md"}
        keepMounted
        aria-describedby="user-details"
      >
        <DialogTitle className={styles.DialogTitle}>{title}</DialogTitle>

        <DialogContent>
          {!errorMsg ? null : <DialogContentText>{errorMsg}</DialogContentText>}

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              id="user-username"
              label="Username"
              variant="standard"
              value={details?.username}
              onChange={(e) => handleInput(e, "username")}
            />

            <TextField
              id="user-fname"
              label="First Name"
              variant="standard"
              value={details?.firstname}
              onChange={(e) => handleInput(e, "firstname")}
            />

            <TextField
              id="user-lname"
              label="Last Name"
              variant="standard"
              value={details?.lastname}
              onChange={(e) => handleInput(e, "lastname")}
            />

            {/* <Divider /> */}

            <TextField
              id="user-email"
              label="Email"
              type="email"
              variant="standard"
              value={details?.email}
              onChange={(e) => handleInput(e, "email")}
            />

            <TextField
              id="user-position"
              label="Position"
              variant="standard"
              value={details?.levelAuth}
              onChange={(e) => handleInput(e, "levelAuth")}
            />

            <TextField
              id="user-discount"
              label="Discount"
              variant="standard"
              value={details?.personalDiscount}
              onChange={(e) => handleInput(e, "personalDiscount")}
            />

            {/* <Divider /> */}

            <TextField
              id="user-country"
              label="Country"
              variant="standard"
              value={details?.address?.country}
              onChange={(e) => handleInput(e, "address", "country")}
            />

            <TextField
              id="user-town"
              label="Town"
              variant="standard"
              value={details?.address?.town}
              onChange={(e) => handleInput(e, "address", "town")}
            />

            <TextField
              id="user-address"
              label="Address"
              variant="standard"
              value={details?.address?.address}
              onChange={(e) => handleInput(e, "address", "address")}
            />

            <TextField
              id="user-postcode"
              label="Postcode"
              variant="standard"
              value={details?.address?.postcode}
              onChange={(e) => handleInput(e, "address", "postcode")}
            />

            <TextField
              id="user-phones"
              label="Phones"
              variant="standard"
              value={details?.address?.phone}
              onChange={(e) => handleInput(e, "address", "phone")}
            />

            {/* <TextField
              error
              id="standard-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            /> */}
          </Box>
        </DialogContent>

        <DialogActions className={styles.DialogActions}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmUpdate} variant="contained">
            {/* <SaveIcon sx={{marginRight: 1}}/> Save */}
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

UserDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
  userDetails: PropTypes.object.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  updateDetails: PropTypes.func.isRequired,
};

UserDialog.defaultProps = {
  title: "User",
  errorMsg: null,
  userDetails: new UserDetailsI(),
};

export default UserDialog;
