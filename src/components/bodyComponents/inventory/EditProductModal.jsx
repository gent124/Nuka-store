import { Box, Button, FormControl, InputLabel, Modal, TextField, Typography } from "@mui/material";
import { useState,useEffect } from "react";

// eslint-disable-next-line react/prop-types
const EditProductModal = ({ open, onClose, onUpdateProduct, productId, productName, stock }) => {
  const [editedProductName, setEditedProductName] = useState(productName);
  const [editedStock, setEditedStock] = useState(stock);

  const handleProductNameChange = (event) => {
    setEditedProductName(event.target.value);
  };

  const handleStockChange = (event) => {
    setEditedStock(event.target.value);
  };

  const handleSubmit = async () => {
    onUpdateProduct(productId, { name: editedProductName, stock: parseInt(editedStock, 10) });
  };

  useEffect(() => {
    setEditedProductName(productName);
    setEditedStock(stock);
  }, [productName, stock]);
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
          Perditeso Produktin
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Box fullWidth sx={{ p: 2 }}>
            <InputLabel shrink>Emri i Produktit</InputLabel>
            <TextField
              variant="outlined"
              value={editedProductName}
              onChange={handleProductNameChange}
              size="medium"
              fullWidth
            />
          </Box>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Box fullWidth sx={{ p: 2 }}>
            <InputLabel shrink>Sasia</InputLabel>
            <TextField
              type="number"
              variant="outlined"
              value={editedStock}
              onChange={handleStockChange}
              size="medium"
              fullWidth
            />
          </Box>
        </FormControl>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Perditeso Produktin
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
