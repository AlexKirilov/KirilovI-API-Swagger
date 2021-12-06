import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Products.module.scss";
import { useDispatch } from "react-redux";

import { headCells } from "./ProductsTableColsData";
import { loadAllProductsListAction } from "../../Core/redux/Actions/products.action";

import TableComp from "../../components/TableComp/TableComp.lazy";
import UserStatBatch from "../../components/UserStatBatch/UserStatBatch.lazy";

const Products = ({ productList }) => {
  const [products, setProducts] = React.useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    console.log("PROD -> ", productList);
    if (!productList) loadAllProductsListAction(dispatch);
    else setProducts(productList?.results || []);
  }, [productList]);

  //#region Table
  function handleOpenEdit(event, row) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    // setDialogTitle("Edit Employee");
    // setSelectedEE(row);
    // toggleDialog(true);
    // console.log(editEEDialog);
  }

  // Handle on Add Btn and open the Dialog Screen
  function handleOnNewItem() {
    // setDialogTitle("New Employee");
    // setSelectedEE(new UserDetailsI());
    // toggleDialog(true);
  }

  // Handle on Delete Btn press and Send DELETE API request for selected items
  // the whole item will be returned as list of objects
  async function handleOnItemDelete($idList) {
    // await deleteEmployeeListAction(dispatch, $idList);
  }

  //#endregion Table

  return (
    <div className={styles.Products} data-testid="Products">
      
      <header>
        {/* <UserStatBatch counter={1} batchTitle={"New Employees"} levelIcon={1} />
        <UserStatBatch
          counter={2}
          batchTitle={"Left Employees"}
          levelIcon={-1}
        /> */}
        <UserStatBatch counter={0} batchTitle={"No Change"} levelIcon={0} />
        <UserStatBatch
          counter={productList?.results?.length}
          batchTitle={"All Products"}
          levelIcon={null}
        />
      </header>

      <main>
        <TableComp
          isAdmin={true}
          rowsData={products}
          headCells={headCells}
          handleOpenEdit={handleOpenEdit}
          handleOnNewItem={handleOnNewItem}
          handleOnItemDelete={handleOnItemDelete}
        />
      </main>
    </div>
  );
};

Products.propTypes = {
  productList: PropTypes.object.isRequired,
};

Products.defaultProps = {
  productList: [],
};

function mapStateToProps(state) {
  return {
    productList: state.productsReducer?.productList,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
