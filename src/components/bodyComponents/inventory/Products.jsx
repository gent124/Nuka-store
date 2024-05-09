import { DataGrid } from "@mui/x-data-grid";
import { Button, TableCell, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditProductModal from "./EditProductModal";

// eslint-disable-next-line react/prop-types
const Products = ({ newProduct, search }) => {
  const [productList, setProductList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductStock, setSelectedProductStock] = useState("");
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        if (response.status === 200) {
          setProductList(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [newProduct]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products/search",
        {
          searchTerm: search,
        }
      );
      if (response.status === 201) {
        setProductList(response.data);
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleIncrementStock = async (productId) => {
    try {
      await axios.patch(`http://localhost:3000/products/${productId}/stock`, {
        increment: true,
      });
      // Refresh the product list after updating stock
      handleSearch();
    } catch (error) {
      console.error("Error incrementing stock:", error);
    }
  };

  const handleDecrementStock = async (productId) => {
    try {
      await axios.patch(`http://localhost:3000/products/${productId}/stock`, {
        increment: false,
      });
      // Refresh the product list after updating stock
      handleSearch();
    } catch (error) {
      console.error("Error decrementing stock:", error);
    }
  };

  const handleOpenEditModal = (productId, productName, stock) => {
    console.log(productId, productName, stock);
    setSelectedProductId(productId);
    setSelectedProductName(productName);
    setSelectedProductStock(stock);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleUpdateProduct = async (productId, updatedProductData) => {
    try {
      // Send the updated product data to the backend
      await axios.patch(
        `http://localhost:3000/products/${productId}`,
        updatedProductData
      );
      // Close the modal and refresh the product list
      handleCloseEditModal();
      handleSearch();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditProduct = (productId) => {
    const selectedProduct = productList.find(
      (product) => product.id === productId
    );
    if (selectedProduct) {
      const { name, stock } = selectedProduct;
      console.log(name, stock);
      handleOpenEditModal(productId, name, stock);
    }
  };

  const handleDeleteSelectedProducts = async () => {
    try {

      const productIdsToDelete = idsToDelete.map(id => Number(id))
      console.log(productIdsToDelete);
      await axios.delete("http://localhost:3000/products", {
        data: productIdsToDelete,
      });
      handleSearch();
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      description: "id of the product",
    },
    {
      field: "product",
      headerName: "Produkti",
      width: 300,
      description: "",
      valueGetter: (params) => params.row.name,
    },
    {
      field: "category",
      headerName: "Kategoria",
      width: 200,
      description: "category of the product",
    },
    {
      field: "stock",
      headerName: "Sasia",
      width: 100,
      description: "how many items in the stock",
      valueGetter: (params) => params.row.stock,
      renderCell: (params) => <TableCell>{params.value}</TableCell>,
    },
    {
      width: 300,
      renderCell: (cellData) => {
        const productId = cellData.row.id;

        return (
          <TableCell>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => handleDecrementStock(productId)}
              disabled={cellData.row.stock === 0} // Disable button if stock is 0
              sx={{ marginRight: 1 }}
            >
              <RemoveIcon></RemoveIcon>
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleIncrementStock(productId)}
              sx={{ marginRight: 1 }}
            >
              <AddIcon></AddIcon>
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleEditProduct(productId)}
              sx={{ marginRight: 1, width: "10px" }}
            >
              <EditIcon></EditIcon>
            </Button>
          </TableCell>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid
        sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0 }}
        rows={productList}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick={true}
        onRowSelectionModelChange={(ids) => {
          setIdsToDelete(ids)
        }}
        />

      <Box mt={2} textAlign="right">
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteSelectedProducts}
          disabled={idsToDelete.length == 0}
        >
          Fshij Produktet e selektuara
        </Button>
      </Box>
      <EditProductModal
        productName={selectedProductName}
        open={editModalOpen}
        onClose={handleCloseEditModal}
        onUpdateProduct={handleUpdateProduct}
        productId={selectedProductId}
        stock={selectedProductStock}
      />
    </div>
  );
};
export default Products;
