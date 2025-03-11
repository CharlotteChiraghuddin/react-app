import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('should change input value when typed into', async () => {
    render(<SearchBar onSearch={jest.fn()}/>);
    const input = screen.getByPlaceholderText('Search...');
    userEvent.type(input, 'test search');
    expect(input.value).toBe('test search');
  });

  it('should call handleSearch on button click', async() => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock}/>);
    const input = screen.getByPlaceholderText('Search...');
    userEvent.type(input, 'test search');
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(onSearchMock).toHaveBeenCalledWith('test search');
    expect(input.value).toBe('');
  });

  it('should call handleSearch on Enter key press', async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} callback={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    userEvent.type(input, 'test search');
    userEvent.keyboard('{Enter}');
    expect(onSearchMock).toHaveBeenCalledWith('test search');
    expect(input.value).toBe('');
  });
});

