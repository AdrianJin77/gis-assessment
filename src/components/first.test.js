import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import First from '../first';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const mockPeople = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
    edited: '2014-12-20T21:17:56.891Z',
    vehicles: ['http://swapi.dev/api/vehicles/14/', 'http://swapi.dev/api/vehicles/30/']
  }
  // Add more mock people data if needed
];
const initialState = {
  people: {
    value: mockPeople
  }
};

const store = mockStore(initialState);

describe('First', () => {
  test('renders table with people data', async () => {
    render(
      <Provider store={store}>
        <First />
      </Provider>
    );

    // Check if the table is rendered
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check if the people data is displayed in the table
    const nameCell = screen.getByText('Luke Skywalker');
    expect(nameCell).toBeInTheDocument();
    // Add assertions for other table cells

    // Check if the "Show vehicles" button is rendered
    const showVehiclesButton = screen.getByText('Show vehicles');
    expect(showVehiclesButton).toBeInTheDocument();
  });

  // Add more test cases if needed
});