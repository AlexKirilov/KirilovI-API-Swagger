import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteLogs from './SiteLogs';

describe('<SiteLogs />', () => {
  test('it should mount', () => {
    render(<SiteLogs />);
    
    const siteLogs = screen.getByTestId('SiteLogs');

    expect(siteLogs).toBeInTheDocument();
  });
});