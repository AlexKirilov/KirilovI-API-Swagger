import React from "react";
import PropTypes from "prop-types";
import styles from "./UserStatBatch.module.scss";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const DateOptions = {
  year: "numeric",
  month: "short",
};

function dateFormat() {
  const date = new Date();
  return date.toLocaleDateString("en-US", DateOptions);
}

const UserStatBatch = ({ counter, batchTitle, levelIcon }) => (
  <div className={styles.UserStatBatch} data-testid="UserStatBatch">
    <Card className={styles.StatBoxes}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h1>{counter}</h1>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
        <CardContent
          sx={{
            flex: "1 0 auto",
            padding: "12px !important",
            minWidth: "80px",
          }}
        >
          <h6>{batchTitle}</h6>

          <div className={styles.Markers}>
            <label>{dateFormat()}</label>

            {levelIcon === 0 ? (
              <DragHandleIcon sx={{ color: "orange" }} />
            ) : levelIcon === 1 ? (
              <ArrowUpwardIcon sx={{ color: "green" }} />
            ) : levelIcon === -1 ? (
              <ArrowDownwardIcon sx={{ color: "red" }} />
            ) : null}
          </div>
        </CardContent>
      </Box>
    </Card>
  </div>
);

UserStatBatch.propTypes = {
  counter: PropTypes.number.isRequired,
  levelIcon: PropTypes.number.isRequired,
  batchTitle: PropTypes.string.isRequired,
};

UserStatBatch.defaultProps = {};

export default UserStatBatch;
