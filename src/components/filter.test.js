import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Filter from './Filter';
import { setPeople } from '../features/peopleSlice';
import { getData } from '../utils/api';

// Mock Redux store
const mockStore = createStore(() => ({ people: [] }));

// Mock the getData function
jest.mock('../utils/api', () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      results: [
        { name: 'Luke Skywalker', height: '172', mass: '77' },
        { name: 'Leia Organa', height: '150', mass: '49' },
      ],
    })
  ),
}));

describe('Filter', () => {
  test('renders search input and button', () => {
    render(
      <Provider store={mockStore}>
        <Filter />
      </Provider>
    );

    // Check if the search input is rendered
    const searchInput = screen.getByLabelText('search');
    expect(searchInput).toBeInTheDocument();

    // Check if the search button is rendered
    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  test('dispatches setPeople action on search button click', async () => {
    render(
      <Provider store={mockStore}>
        <Filter />
      </Provider>
    );

    // Type a search query in the input
    const searchInput = screen.getByLabelText('search');
    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });

    // Click the search button
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Wait for the asynchronous call to complete
    screen.findByText((element) => {
      const hasText = (text) => element.textContent === text;
      return hasText('Luke Skywalker');
    });
  });
});