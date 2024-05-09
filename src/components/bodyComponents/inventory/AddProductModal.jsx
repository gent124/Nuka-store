import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  
  
  // eslint-disable-next-line react/prop-types
  const AddProductModal = ({ open, onClose, onAddProduct }) => {
    console.log('Add Product Modal')
    const [productName, setProductName] = useState("");
    const [stock, setStock] = useState("");
  
    const handleProductNameChange = (event) => {
      setProductName(event.target.value);
    };
  
    const handleStockChange = (event) => {
      setStock(event.target.value);
    };
  
    const handleSubmit = async () => {
      console.log('inside the handle submit event');
      const stockNumber = parseInt(stock, 10); 
      onAddProduct({ name: productName, stock: stockNumber });
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 6,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shto Produktin
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Box fullWidth sx={{ p: 2 }}>
              <InputLabel shrink>Emri i Produktit</InputLabel>
              <TextField
                variant="outlined"
                value={productName}
                onChange={handleProductNameChange}
                size="medium"
                fullWidth // Ensure the TextField takes full width
              />
            </Box>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Box fullWidth sx={{ p: 2 }}>
              <InputLabel shrink>Stock</InputLabel>
              <TextField
                type="number"
                variant="outlined"
                value={stock}
                onChange={handleStockChange}
                size="medium"
                fullWidth // Ensure the TextField takes full width
              />
            </Box>
          </FormControl>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} type="submit">
            Shto Produktin
          </Button>
        </Box>
      </Modal>
    );
  };
  
  export default AddProductModal;
  