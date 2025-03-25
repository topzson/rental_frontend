import React from "react";
import axios from "axios";
import { CircularProgress, Box, Typography, Paper, Grid } from "@mui/material";

interface Props {
  params: number | null;
}

export const ResultData = ({ params }: Props) => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      // Only fetch if params is provided
      if (!params) {
        setData(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const urlAPI = `http://localhost:5277/api/vehicles/${params}`;
        const response = await axios.get(urlAPI);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Failed to fetch vehicle data. Please try again.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (!params) {
    return (
      <Box p={2}>
        <Typography>Enter a contract ID and click "Get Data" to view details.</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p={2}>
        <Typography>No data found for contract ID: {params}</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Vehicle Details
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">ID</Typography>
            <Typography>{data.id}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">License Plate</Typography>
            <Typography>{data.licensePlate}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Brand</Typography>
            <Typography>{data.brand}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Model</Typography>
            <Typography>{data.model}</Typography>
          </Grid>
        </Grid>

        {data.rentalContract && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Rental Contract Details
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Contract ID</Typography>
                <Typography>{data.rentalContract.id}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Customer Name</Typography>
                <Typography>{data.rentalContract.customerName}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Start Date</Typography>
                <Typography>
                  {new Date(data.rentalContract.startDate).toLocaleDateString()}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">End Date</Typography>
                <Typography>
                  {new Date(data.rentalContract.endDate).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Paper>
  );
};
