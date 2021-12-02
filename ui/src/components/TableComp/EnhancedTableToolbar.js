import PropTypes from "prop-types";
import { Delete, Add } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";

const EnhancedTableToolbar = ({ numSelected, addNewHandler, deleteHandler }) => {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        position: "relative",
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography id="tableTitle" component="div" sx={{ flex: "1 1 100%" }}>
          {/* <Button variant="contained"> <Add /> New</Button> */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete onClick={deleteHandler}/>
          </IconButton>
        </Tooltip>
      ) : (
        <ButtonGroup>
          <Button variant="contained" onClick={addNewHandler}>
            <Add sx={{ marginRight: 1 }} /> New
          </Button>
        </ButtonGroup>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  addNewHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
