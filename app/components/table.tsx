"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { VehicleType, VehicleTable } from './types/vehiclesType';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'licensePlate',
    headerName: 'License Plate',
    width: 150,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 150,
    editable: true,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 110,
    editable: true,
  },
  {
    field: 'rentalId',
    headerName: 'Rental ID',
    width: 110,
    editable: true,
  },
  {
    field: 'customerName',
    headerName: 'Customer Name',
    width: 150,
    editable: true,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 150,
    editable: true,
    
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 150,
    editable: true,
   
  },
];

export const DataGrid_Vehicles = () => {
  const [rows, setRows] = React.useState<VehicleTable[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<typeof rows>([]);
  const [loading, setLoading] = React.useState(true);
  
  const [rentalIdSearch, setRentalIdSearch] = React.useState('');
  const [customerNameSearch, setCustomerNameSearch] = React.useState('');
  const [startDateSearch, setStartDateSearch] = React.useState('');
  const [endDateSearch, setEndDateSearch] = React.useState('');
  
  let urlAPI = 'http://localhost:5277/api/vehicles';

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlAPI);
        const data = response.data;
        console.log('API Response:', data);
        const vehiclesArray = Array.isArray(data) ? data : data.vehicles || [];
        const transformedData = vehiclesArray.map((vehicle: VehicleType) => ({
          id: vehicle.id,
          licensePlate: vehicle.licensePlate,
          brand: vehicle.brand,
          model: vehicle.model,
          rentalId: vehicle.rentalContract?.id || null,
          customerName: vehicle.rentalContract?.customerName || '',
          startDate: vehicle.rentalContract?.startDate || null,
          endDate: vehicle.rentalContract?.endDate || null,
        }));

        console.log('Transformed Data:', transformedData);
        setRows(transformedData);
        setFilteredRows(transformedData);
      } catch (error) {
        setRows([]);
        setFilteredRows([]);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = [...rows];

    if (rentalIdSearch) {
      filtered = filtered.filter((row) => {
        if (row.rentalId === null) return false;
        return row.rentalId.toString().includes(rentalIdSearch);
      });
    }

    if (customerNameSearch) {
      filtered = filtered.filter((row) => {
        return row.customerName.toLowerCase().includes(customerNameSearch.toLowerCase());
      });
    }

    if (startDateSearch && endDateSearch) {
      filtered = filtered.filter((row) => {
        if (!row.startDate || !row.endDate) return false;
        
        const rowStartDate = new Date(row.startDate);
        const rowEndDate = new Date(row.endDate);
        const filterStartDate = new Date(startDateSearch);
        const filterEndDate = new Date(endDateSearch);
        
        return (
          rowStartDate >= filterStartDate && 
          rowEndDate <= filterEndDate
        );
      });
    } else if (startDateSearch) {
      filtered = filtered.filter((row) => {
        if (!row.startDate) return false;
        const rowStartDate = new Date(row.startDate);
        const filterStartDate = new Date(startDateSearch);
        return rowStartDate >= filterStartDate;
      });
    } else if (endDateSearch) {
      filtered = filtered.filter((row) => {
        if (!row.endDate) return false;
        const rowEndDate = new Date(row.endDate);
        const filterEndDate = new Date(endDateSearch);
        return rowEndDate <= filterEndDate;
      });
    }

    setFilteredRows(filtered);
  };

  const resetFilters = () => {
    setRentalIdSearch('');
    setCustomerNameSearch('');
    setStartDateSearch('');
    setEndDateSearch('');
    setFilteredRows(rows);
  };

  const handleRentalIdSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRentalIdSearch(event.target.value);
  };

  const handleCustomerNameSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerNameSearch(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateSearch(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateSearch(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Rental ID"
            variant="outlined"
            size="small"
            value={rentalIdSearch}
            onChange={handleRentalIdSearchChange}
            fullWidth
            InputProps={{
              endAdornment: rentalIdSearch ? (
                <IconButton size="small" onClick={() => setRentalIdSearch('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Customer Name"
            variant="outlined"
            size="small"
            value={customerNameSearch}
            onChange={handleCustomerNameSearchChange}
            fullWidth
            InputProps={{
              endAdornment: customerNameSearch ? (
                <IconButton size="small" onClick={() => setCustomerNameSearch('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            size="small"
            value={startDateSearch}
            onChange={handleStartDateChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: startDateSearch ? (
                <IconButton size="small" onClick={() => setStartDateSearch('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            size="small"
            value={endDateSearch}
            onChange={handleEndDateChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: endDateSearch ? (
                <IconButton size="small" onClick={() => setEndDateSearch('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null,
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              onClick={resetFilters}
              startIcon={<ClearIcon />}
            >
              Clear Filters
            </Button>
            <Button 
              variant="contained" 
              onClick={applyFilters}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Stack>
        </Grid>
      </Grid>
      
      <Box
        sx={{
          height: 400,
          width: '100%',
          maxWidth: '100%',
          '@media (max-width: 600px)': {
            height: 300,
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '0.8rem',
            },
          }}
        />
      </Box>
    </Box>
  );
};
