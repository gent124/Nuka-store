import { DataGrid } from "@mui/x-data-grid";
import Product from "./Product";
import AddProductModal from "./AddProductModal"; // Import the modal component
import { useState, useEffect} from "react";
import axios from 'axios';

export default function Products() {
  const [productList, setProductList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        if (response.status === 200) {
          setProductList(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [productList]); 

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3000/products', newProduct);
      if (response.status === 201) {
        setOpenModal(false); 
        setProductList([...productList, response.data])
      }
    } catch (error) {
      console.error('Error adding product:', error);
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
      headerName: "Product",
      width: 400, 
      description: "",
      renderCell: (cellData) => {
        return <Product productName={cellData.row.name} />;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      description: "category of the product",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
      description: "how many items in the stock",
      valueGetter: (params) => params.row.stock,
    },
  ];

  return (
    <div>
      <DataGrid
        sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0 }}
        rows={productList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
      <AddProductModal open={openModal} onClose={() => setOpenModal(false)} onAddProduct={handleAddProduct} />
    </div>
  );
}
