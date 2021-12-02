import React, { useEffect } from "react";
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import styles from "./Employees.module.scss";
import TableComp from "../../components/TableComp/TableComp.lazy";
import { useDispatch} from "react-redux";
import { loadEmployeeList } from "../../Core/redux/Actions/employee.actions";


const headCells = [
    {
    id: "username",
    align: "start",
    icon: false,
    date: false,
    numeric: false,
    disablePadding: true,
    label: "Username / Names",
  },
  {
    id: "email",
    align: "start",
    icon: false,
    date: false,
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "levelAuth",
    align: "start",
    icon: false,
    date: false,
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "lastLogin",
    align: "end",
    icon: false,
    date: true,
    numeric: false,
    disablePadding: false,
    label: "Last Login",
  },
  {
    id: "lastUpdate",
    align: "end",
    icon: false,
    date: true,
    numeric: false,
    disablePadding: false,
    label: "Account Updated",
  },
  {
    id: "created",
    align: "end",
    icon: false,
    date: true,
    numeric: false,
    disablePadding: false,
    label: "Registered",
  },
  {
    id: "active",
    align: "start",
    icon: true,
    date: false,
    numeric: false,
    disablePadding: true,
    label: "Active",
  }
];


const Employees = ({ employeeList }) => {
  const [employees, setEmployees] = React.useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    if (!employeeList) loadEmployeeList(dispatch)
    else {
      setEmployees(employeeList?.results || [])
      console.log('EE List => ', employees)
    }
  }, [employeeList])
  // Handle on Add Btn and open the Dialog Screen
  function handleOnNewItem() {
    // dispatch(loadEmployeeList())
  }

  // Handle on Delete Btn press and Send DELETE API request for selected items
  // the whole item will be returned as list of objects
  function handleOnItemDelete($itemList) { }

  return (
    <div className={styles.Employees} data-testid="Employees">
      <main>
        <TableComp rowsData={employees} headCells={headCells} handleOnNewItem={handleOnNewItem} handleOnItemDelete={handleOnItemDelete} isAdmin={true}/>
      </main>
    </div>
  );
};

Employees.propTypes = {
  employeeList: PropTypes.object.isRequired
};

Employees.defaultProps = {};

function mapStateToProps(state) {
  console.log('STATE => ', state)
  return {
    employeeList: state.employeeReducer.employeeList,
  }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
// export default Employees;
