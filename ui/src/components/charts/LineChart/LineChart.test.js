import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LineChart from './LineChart';

describe('<LineChart />', () => {
  test('it should mount', () => {
    render(<LineChart />);
    
    const lineChart = screen.getByTestId('LineChart');

    expect(lineChart).toBeInTheDocument();
  });
});