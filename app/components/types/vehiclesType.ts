import { GridValidRowModel } from '@mui/x-data-grid';

export interface VehicleType extends GridValidRowModel {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  rentalContract?: {
    id: number | null;
    customerName: string;
    startDate: string | null;
    endDate: string | null;
  };
}

export interface VehicleTable {
  id: number;
      licensePlate: string;
      brand: string;
      model: string;
      rentalId: number | null;
      customerName: string;
      startDate: string | null;
      endDate: string | null;
}