import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from './popup';

describe('Popup component', () => {
  const vehicles = [
    { name: 'Car 1', model: 'Model 1', manufacturer: 'Manufacturer 1', vehicle_class: 'Class 1' },
    { name: 'Car 2', model: 'Model 2', manufacturer: 'Manufacturer 2', vehicle_class: 'Class 2' },
  ];

  test('renders table with vehicle data', async () => {
    render(<Popup id="popup" open={true} anchor={null} vehicles={vehicles} />);
    
    // Check if the table with vehicle data is rendered
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check if the table headers are rendered correctly
    const nameHeader = screen.getByText('name');
    const modelHeader = screen.getByText('model');
    const manufacturerHeader = screen.getByText('manufacturer');
    const vehicleClassHeader = screen.getByText('vehicle class');
    expect(nameHeader).toBeInTheDocument();
    expect(modelHeader).toBeInTheDocument();
    expect(manufacturerHeader).toBeInTheDocument();
    expect(vehicleClassHeader).toBeInTheDocument();

    // Check if the vehicle data rows are rendered correctly
    const vehicleRows = screen.getAllByRole('row');
    expect(vehicleRows).toHaveLength(vehicles.length + 1); // +1 for the header row

    // Check if the vehicle data is displayed correctly in the table
    vehicles.forEach((vehicle, index) => {
      const nameCell = screen.getByText(vehicle.name);
      const modelCell = screen.getByText(vehicle.model);
      const manufacturerCell = screen.getByText(vehicle.manufacturer);
      const vehicleClassCell = screen.getByText(vehicle.vehicle_class);
      expect(nameCell).toBeInTheDocument();
      expect(modelCell).toBeInTheDocument();
      expect(manufacturerCell).toBeInTheDocument();
      expect(vehicleClassCell).toBeInTheDocument();
    });
  });

  test('renders "Empty Data" message if there are no vehicles', () => {
    render(<Popup id="popup" open={true} anchor={null} vehicles={[]} />);
    
    // Check if the "Empty Data" message is rendered
    const emptyDataMessage = screen.getByText('Empty Data');
    expect(emptyDataMessage).toBeInTheDocument();

    // Check if the table is not rendered
    const table = screen.queryByRole('table');
    expect(table).toBeNull();
  });
});