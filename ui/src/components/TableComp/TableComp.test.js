import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableComp from './TableComp';

describe('<TableComp />', () => {
  test('it should mount', () => {
    render(<TableComp />);
    
    const tableComp = screen.getByTestId('TableComp');

    expect(tableComp).toBeInTheDocument();
  });
});