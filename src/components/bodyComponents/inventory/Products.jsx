import { DataGrid } from "@mui/x-data-grid";
import Product from "./Product";
// import productList from "./productList";
import { useState, useEffect} from "react";
import axios from 'axios'

export default function Products() {
  const [productList, setProductList] = useState([])

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/products');
      console.log(response);
      if (response.status === 200) {
        setProductList(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();
}, []);


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
      //same here we have the cell data which i will get the value of the cells in the tables cellData.row.fieldName

      renderCell: (cellData) => {
        console.log("the cell data is : ", cellData.row.name);
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
      valueGetter: (params) => params.row.stock  ,
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
    </div>
  );
}
