import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Clients from './Clients';

describe('<Clients />', () => {
  test('it should mount', () => {
    render(<Clients />);
    
    const clients = screen.getByTestId('Clients');

    expect(clients).toBeInTheDocument();
  });
});