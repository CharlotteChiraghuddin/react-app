import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrackList from './TrackList';

describe('TrackList Component', () => {
  const mockCallback = jest.fn();
  const mockRequest = 'test_track';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch an access token and use it to get track data', async () => {
    // Mock the fetch calls
    global.fetch = jest.fn()
      // Mock fetch call for access token
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test_access_token' })
      })
      // Mock fetch call for track data
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          tracks: {
            items: [
              { id: 1, name: 'Test Track 1' },
              { id: 2, name: 'Test Track 2' },
            ]
          }
        })
      });

    // Render the component
    render(<TrackList request={mockRequest} callback={mockCallback} />);

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0)); // Short delay to allow useEffect to run

    // Verify fetch calls
    expect(fetch).toHaveBeenCalledTimes(2);

    // Check the first fetch call (getting access token)
    expect(fetch).toHaveBeenCalledWith(
      'https://accounts.spotify.com/api/token',
      expect.objectContaining({
        method: 'POST',
        header: 'Content-Type: application/x-www-form-urlencoded',
        body: expect.any(URLSearchParams),
      })
    );

    // Check the second fetch call (getting track data)
    expect(fetch).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/search?q=${mockRequest}&type=track`,
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer test_access_token' }
      })
    );

    // Verify the callback is called with the correct track data
    expect(mockCallback).toHaveBeenCalledWith([
      { id: 1, name: 'Test Track 1' },
      { id: 2, name: 'Test Track 2' },
    ]);
  });

  it('should log an error if fetching access token fails', async () => {
    // Mock fetch to fail when requesting access token
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch access token'));

    // Mock console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Render the component
    render(<TrackList request={mockRequest} callback={mockCallback} />);

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify error is logged
    expect(consoleSpy).toHaveBeenCalledWith('failed to get access token', expect.any(Error));

    // Clean up
    consoleSpy.mockRestore();
  });

  it('should log an error if fetching track data fails', async () => {
    // Mock fetch for access token and track data
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'test_access_token' })
      })
      .mockRejectedValueOnce(new Error('Failed to fetch track data'));

    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Render the component
    render(<TrackList request={mockRequest} callback={mockCallback} />);

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify error is logged
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

    // Clean up
    consoleSpy.mockRestore();
  });

  it('should not fetch data if request is empty', async () => {
    render(<TrackList request={''} callback={mockCallback} />);

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify fetch is not called
    expect(fetch).not.toHaveBeenCalled();
  });
});
