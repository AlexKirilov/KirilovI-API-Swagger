import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SiteDetails from './SiteDetails';

describe('<SiteDetails />', () => {
  test('it should mount', () => {
    render(<SiteDetails />);
    
    const siteDetails = screen.getByTestId('SiteDetails');

    expect(siteDetails).toBeInTheDocument();
  });
});