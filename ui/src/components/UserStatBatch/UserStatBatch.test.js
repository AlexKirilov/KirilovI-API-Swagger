import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserStatBatch from './UserStatBatch';

describe('<UserStatBatch />', () => {
  test('it should mount', () => {
    render(<UserStatBatch />);
    
    const userStatBatch = screen.getByTestId('UserStatBatch');

    expect(userStatBatch).toBeInTheDocument();
  });
});