import React from "react";
import PropTypes from "prop-types";
import styles from "./ConfirmationDialog.module.scss";

const ConfirmationDialog = ({ isOpen, promptText, confirmResponse }) => {
  const handleClose = (bool = false) => {
    if (bool) confirmResponse(true);
    setOpen(false);
  };

  return (
    <div className={styles.ConfirmationDialog} data-testid="ConfirmationDialog">
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {promptText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={(e) => handleClose(e, true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  promptText: PropTypes.string.isRequired,
  confirmResponse: PropTypes.func.isRequired,
};

ConfirmationDialog.defaultProps = {
  isOpen: false,
  promptText: "Are you sure?",
};

export default ConfirmationDialog;
