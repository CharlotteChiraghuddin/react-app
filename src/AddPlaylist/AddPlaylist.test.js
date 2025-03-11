import AddPlaylist from './AddPlaylist';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock fetch
global.fetch = jest.fn();

describe('AddPlaylist', () => {
  beforeEach(() => {
    localStorage.clear();
    fetch.mockClear();
  });

  it('should create a playlist and add tracks to it', async () => {
    // Mock localStorage data
    localStorage.setItem('access_token', 'test_access_token');
    localStorage.setItem('userId', 'test_user_id');
    localStorage.setItem('playlistName', 'test_playlist_name');
    localStorage.setItem('playlist', JSON.stringify([{ uri: 'track_uri_1' }, { uri: 'track_uri_2' }]));

    // Mock fetch responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 'test_playlist_id' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

    await AddPlaylist();

    // Verify the first fetch call (create playlist)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/users/test_user_id/playlists',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer test_access_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'test_playlist_name' }),
      })
    );

    // Verify the second fetch call (add tracks to playlist)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/playlists/test_playlist_id/tracks',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer test_access_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: ['track_uri_1', 'track_uri_2'] }),
      })
    );

    // Verify that localStorage is cleared
    expect(localStorage.getItem('playlistName')).toBeNull();
    expect(localStorage.getItem('playlist')).toBeNull();
  });

  it('should handle token expiration and refresh token', async () => {
    // Mock localStorage data
    localStorage.setItem('access_token', 'test_access_token');
    localStorage.setItem('userId', 'test_user_id');
    localStorage.setItem('playlistName', 'test_playlist_name');
    localStorage.setItem('playlist', JSON.stringify([{ uri: 'track_uri_1' }, { uri: 'track_uri_2' }]));
    localStorage.setItem('refresh_token', 'test_refresh_token');

    // Mock fetch responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ error: { message: 'The access token expired' } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          access_token: 'new_access_token',
          refresh_token: 'new_refresh_token',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 'test_playlist_id' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

    await AddPlaylist();

    // Verify fetch call to refresh token endpoint
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://accounts.spotify.com/api/token',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: expect.any(String),
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: 'test_refresh_token',
          client_id: '6961fe134cd64321ab2de3c427d3160d',
        }).toString(),
      })
    );

    // Verify updated tokens in localStorage
    expect(localStorage.getItem('access_token')).toBe('new_access_token');
    expect(localStorage.getItem('refresh_token')).toBe('new_refresh_token');

    // Verify third fetch call (create playlist with new token)
    expect(fetch).toHaveBeenNthCalledWith(
      3,
      'https://api.spotify.com/v1/users/test_user_id/playlists',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer new_access_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'test_playlist_name' }),
      })
    );

    // Verify fourth fetch call (add tracks with new token)
    expect(fetch).toHaveBeenNthCalledWith(
      4,
      'https://api.spotify.com/v1/playlists/test_playlist_id/tracks',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer new_access_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: ['track_uri_1', 'track_uri_2'] }),
      })
    );
  });
});
