import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Overview from "./Overview";
import Products from "./Products";
import axios from "axios";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [nameLabelShrink, setNameLabelShrink] = useState(false);
  const [stockLabelShrink, setStockLabelShrink] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleNameLabelShrink = () => {
    setNameLabelShrink(true);
  };

  const handleStockLabelShrink = () => {
    setStockLabelShrink(true);
  };

  const handleNameLabelBlur = () => {
    if (!productName) {
      setNameLabelShrink(false);
    }
  };

  const handleStockLabelBlur = () => {
    if (!stock) {
      setStockLabelShrink(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

const handleSubmit = async () => {
  try {
    const response = await axios.post("http://localhost:3000/products", {
      name: productName,
      stock: parseInt(stock, 10),
    });
    if (response.status === 201) {
      handleClose();
      setProductName("");
      setStock("");
      setNewProduct(response.data); // Update the newProduct state with the response
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

  return (
    <Box>
      <Grid container sx={{ mx: 3, p: 3 }}>
        <Grid item md={9}>
          <Box
            sx={{
              margin: 3,
              bgcolor: "white",
              borderRadius: 2,
              padding: 3,
              height: "100%",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
                Depo
              </Typography> 
              <Input placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
              <Button variant="contained" onClick={handleOpen}>
            Shto Produkt Te Ri
              </Button>
            </Box>
            <Products newProduct={newProduct} search={searchTerm}/>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box
            sx={{
              margin: 3,
              bgcolor: "white",
              borderRadius: 2,
              padding: 3,
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
              Total
            </Typography>
            <Overview />
          </Box>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
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
            Shto Produktin e Ri
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Box fullWidth sx={{ p: 2 }}>
              <InputLabel shrink>Emri i Produktit</InputLabel>
              <TextField
                variant="outlined"
                value={productName}
                onChange={handleProductNameChange}
                onFocus={handleNameLabelShrink}
                onBlur={handleNameLabelBlur}
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
                value={stock}
                onChange={handleStockChange}
                onFocus={handleStockLabelShrink}
                onBlur={handleStockLabelBlur}
                size="medium"
                fullWidth
              />
            </Box>
          </FormControl>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
            Shto Produktin
          </Button>
        </Box>
      </Modal>

      
    </Box>
  );
};

export default Inventory;
