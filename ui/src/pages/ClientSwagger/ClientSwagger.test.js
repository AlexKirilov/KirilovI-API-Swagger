import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClientSwagger from './ClientSwagger';

describe('<ClientSwagger />', () => {
  test('it should mount', () => {
    render(<ClientSwagger />);
    
    const clientSwagger = screen.getByTestId('ClientSwagger');

    expect(clientSwagger).toBeInTheDocument();
  });
});