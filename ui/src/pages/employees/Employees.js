import React, { useEffect } from "react";
import { connect } from "react-redux";

import { headCells } from "./EmployeeTableColsData";
import PropTypes from "prop-types";
import styles from "./Employees.module.scss";
import TableComp from "../../components/TableComp/TableComp.lazy";
import UserDialog from "../../components/Dialogs/UserDialog/UserDialog.lazy";
import UserStatBatch from "../../components/UserStatBatch/UserStatBatch.lazy";
import { useDispatch } from "react-redux";
import {
  loadEmployeeListAction,
  deleteEmployeeListAction,
} from "../../Core/redux/Actions/employee.actions";
import { UserDetailsI } from "../../Core/Models/user.interface";
import {
  createEmployeeAction,
  patchExistingEmployeeByIdAction,
} from "../../Core/redux/Actions/employee.actions";

const Employees = ({ employeeList }) => {
  const [isDialogOpen, toggleDialog] = React.useState(false);
  const [dialogErrMsg, setDialogErrMsg] = React.useState(null);
  const [dialogTitle, setDialogTitle] = React.useState("New Employee");
  const [editEEDialog, setSelectedEE] = React.useState(new UserDetailsI());

  const [employees, setEmployees] = React.useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    if (!employeeList) loadEmployeeListAction(dispatch);
    else setEmployees(employeeList?.results || []);
  }, [employeeList]);

  // Handle on Add Btn and open the Dialog Screen
  function handleOnNewItem() {
    setDialogTitle("New Employee");
    setSelectedEE(new UserDetailsI());
    toggleDialog(true);
  }

  // Handle on Delete Btn press and Send DELETE API request for selected items
  // the whole item will be returned as list of objects
  async function handleOnItemDelete($idList) {
    await deleteEmployeeListAction(dispatch, $idList)
  }

  function handleOpenEdit(event, row) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setDialogTitle("Edit Employee");
    setSelectedEE(row);
    toggleDialog(true);
    console.log(editEEDialog);
  }

  function handleUpNewEE(details) {
    if (details) {
      if (details.id)
        patchExistingEmployeeByIdAction(dispatch, details)
          .then((res) => {
            toggleDialog(false);
            setDialogErrMsg(null); // Clear the Dialog Error msg for next openings
            // TODO: Snack Bar for created new EE
          })
          .catch((err) => {
            // Do not close the Dialog, but display the error message
            setDialogErrMsg(err?.message || null);
          });
      else
        createEmployeeAction(dispatch, details)
          .then((res) => {
            toggleDialog(false);
            setDialogErrMsg(null); // Clear the Dialog Error msg for next openings
            // TODO: Snack Bar for created new EE
          })
          .catch((err) => {
            // Do not close the Dialog, but display the error message
            setDialogErrMsg(err?.message || null);
          });
    }
  }

  return (
    <div className={styles.Employees} data-testid="Employees">
      <header>
        <UserStatBatch counter={1} batchTitle={"New Employees"} levelIcon={1} />
        <UserStatBatch
          counter={2}
          batchTitle={"Left Employees"}
          levelIcon={-1}
        />
        <UserStatBatch counter={0} batchTitle={"No Change"} levelIcon={0} />
        <UserStatBatch
          counter={employeeList?.results?.length}
          batchTitle={"All Employees"}
          levelIcon={null}
        />
      </header>

      <main>
        <TableComp
          isAdmin={true}
          rowsData={employees}
          headCells={headCells}
          handleOpenEdit={handleOpenEdit}
          handleOnNewItem={handleOnNewItem}
          handleOnItemDelete={handleOnItemDelete}
        />
      </main>

      <UserDialog
        title={dialogTitle}
        isOpen={isDialogOpen}
        errorMsg={dialogErrMsg || null}
        userDetails={editEEDialog}
        toggleDialog={toggleDialog}
        updateDetails={handleUpNewEE}
      />
    </div>
  );
};

Employees.propTypes = {
  employeeList: PropTypes.object.isRequired,
};

Employees.defaultProps = {};

function mapStateToProps(state) {
  return {
    employeeList: state.employeeReducer?.employeeList,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
// export default Employees;
