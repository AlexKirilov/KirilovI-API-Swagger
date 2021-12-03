import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDialog from './UserDialog';

describe('<UserDialog />', () => {
  test('it should mount', () => {
    render(<UserDialog />);
    
    const userDialog = screen.getByTestId('UserDialog');

    expect(userDialog).toBeInTheDocument();
  });
});