import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the header and the SearchBar component', () => {
    render(<App />);
    
    // Check if the header is rendered
    const headerElement = screen.getByText(/Jammming/i);
    expect(headerElement).toBeInTheDocument();

    // Check if the SearchBar is rendered
    const searchBar = screen.getByRole('textbox'); // Assuming a search bar is a text input
    expect(searchBar).toBeInTheDocument();
  });
});
