import React from "react";
import axios from "axios";
import { 
  CircularProgress, 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Stack,
  IconButton 
} from "@mui/material";
import { 
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon 
} from '@mui/icons-material';
import { VehicleType } from "./types/vehiclesType";

interface Props {
  params: number | null;
}

export const ResultData = ({ params }: Props) => {
  const [data, setData] = React.useState<VehicleType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const urlAPI = params 
          ? `http://localhost:5277/api/vehicles/${params}`
          : `http://localhost:5277/api/vehicles`;
        const response = await axios.get(urlAPI);
        console.log(response.data);
        setData(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Failed to fetch vehicle data. Please try again.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setCurrentPage(0);
  }, [params]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box p={2}>
        <Typography>No data found{params ? ` for contract ID: ${params}` : ''}</Typography>
      </Box>
    );
  }

  const currentVehicle = data[currentPage];

  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Vehicle Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">ID</Typography>
            <Typography>{currentVehicle.id}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">License Plate</Typography>
            <Typography>{currentVehicle.licensePlate}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Brand</Typography>
            <Typography>{currentVehicle.brand}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Model</Typography>
            <Typography>{currentVehicle.model}</Typography>
          </Grid>
        </Grid>

        {currentVehicle.rentalContract && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Rental Contract Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Contract ID</Typography>
                <Typography>{currentVehicle.rentalContract.id}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Customer Name</Typography>
                <Typography>{currentVehicle.rentalContract.customerName}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Start Date</Typography>
                <Typography>
                  {currentVehicle.rentalContract.startDate 
                    ? new Date(currentVehicle.rentalContract.startDate).toLocaleDateString() 
                    : "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">End Date</Typography>
                <Typography>
                  {currentVehicle.rentalContract.endDate 
                    ? new Date(currentVehicle.rentalContract.endDate).toLocaleDateString() 
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <IconButton
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 0}
          >
            <NavigateBeforeIcon />
          </IconButton>

          <Typography>
            Page {currentPage + 1} of {data.length}
          </Typography>

          <IconButton
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === data.length - 1}
          >
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};
