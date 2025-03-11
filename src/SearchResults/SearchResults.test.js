import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchResults from './SearchResults';

describe('SearchResults Component', () => {
  it('should display the results on the page', () => {
    const mockResults = [
      {
        name: 'Test Song 1',
        artists: [{ name: 'Test Artist 1' }],
        album: { name: 'Test Album 1' },
      },
      {
        name: 'Test Song 2',
        artists: [{ name: 'Test Artist 2' }],
        album: { name: 'Test Album 2' },
      },
    ];
    const mockCallback = jest.fn();

    render(<SearchResults results={mockResults} callback={mockCallback} />);

    // Verify that the results are rendered correctly using a custom matcher
    expect(screen.getByText((content, element) => content.includes('Test Song 1'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Test Artist 1'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Test Album 1'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Test Song 2'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Test Artist 2'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('Test Album 2'))).toBeInTheDocument();
  });

  it('should call callback when an icon is clicked', () => {
    const mockResults = [
      {
        name: 'Test Song 1',
        artists: [{ name: 'Test Artist 1' }],
        album: { name: 'Test Album 1' },
      },
    ];
    const mockCallback = jest.fn();

    render(<SearchResults results={mockResults} callback={mockCallback} />);

    // Simulate clicking the icon
    const icon = screen.getByAltText('add_circle');
    userEvent.click(icon);

    // Verify that the callback is called with the correct result
    expect(mockCallback).toHaveBeenCalledWith(mockResults[0]);
  });
});
