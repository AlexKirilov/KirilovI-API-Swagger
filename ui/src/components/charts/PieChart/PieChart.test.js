import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PieChart from './PieChart';

describe('<PieChart />', () => {
  test('it should mount', () => {
    render(<PieChart />);
    
    const pieChart = screen.getByTestId('PieChart');

    expect(pieChart).toBeInTheDocument();
  });
});