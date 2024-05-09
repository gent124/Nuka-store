import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios  from "axios";
export default function Overview() {
  const [overviewStats, setOverviewStats] = useState([]);

  const getStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/products/overview"
      );
      if (response.status === 200) {
        setOverviewStats(response.data);
      }
    } catch (error) {
      console.log("Error while fetching overview", error.message);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Sasia Totale e Produkteve</TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {overviewStats.total}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Produkti me sasin me te madhe</TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {overviewStats.mostLeftStock}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Produkti me i shitur</TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {overviewStats?.mostSoldProduct?.name ?? ''}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Produkti me pak i shitur</TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {overviewStats.leastSoldProduct?.name ?? ''}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
