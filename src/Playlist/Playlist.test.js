import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Playlist from './Playlist';

describe('Playlist Component', () => {
  const mockCallback = jest.fn();
  const mockSave = jest.fn();
  const mockHandleChange = jest.fn();
  const mockPlaylist = [
    { name: 'Song 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri1' },
    { name: 'Song 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render playlist tracks and input field', async() => {
        render(
          <Playlist
            playlist={mockPlaylist}
            callback={mockCallback}
            save={mockSave}
            handleChange={mockHandleChange}
            playlistName="My Playlist"
          />
        );
      
        // Debug the rendered DOM
        screen.debug();
      
        // Check that playlist tracks are rendered
        expect(await screen.findByText(/Song 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Song 2/i)).toBeInTheDocument();
      
        // Check that the input field is rendered with the correct value
        const input = screen.getByPlaceholderText('Playlist name...');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('My Playlist');
      });

  it('should call handleChange when input value changes', () => {
    render(
      <Playlist
        playlist={mockPlaylist}
        callback={mockCallback}
        save={mockSave}
        handleChange={mockHandleChange}
        playlistName="My Playlist"
      />
    );

    // Simulate input change
    const input = screen.getByPlaceholderText('Playlist name...');
    fireEvent.change(input, { target: { value: 'New Playlist Name' } });

    // Verify that handleChange is called
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('should call callback when a track remove icon is clicked', () => {
    render(
      <Playlist
        playlist={mockPlaylist}
        callback={mockCallback}
        save={mockSave}
        handleChange={mockHandleChange}
        playlistName="My Playlist"
      />
    );

    // Simulate clicking the remove icon for the first track
    const firstTrackRemoveIcon = screen.getAllByRole('img')[0];
    fireEvent.click(firstTrackRemoveIcon);

    // Verify that callback is called with the correct track
    expect(mockCallback).toHaveBeenCalledWith(mockPlaylist[0]);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should call save function when "Save to Spotify" button is clicked', () => {
    render(
      <Playlist
        playlist={mockPlaylist}
        callback={mockCallback}
        save={mockSave}
        handleChange={mockHandleChange}
        playlistName="My Playlist"
      />
    );

    // Simulate clicking the "Save to Spotify" button
    const saveButton = screen.getByText(/Save to Spotify/i);
    fireEvent.click(saveButton);

    // Verify that save function is called
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
