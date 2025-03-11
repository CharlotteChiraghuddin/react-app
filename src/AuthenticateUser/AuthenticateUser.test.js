/**
 * @jest-environment jsdom
 */

import AuthenticateUser from './AuthenticateUser';

describe('AuthenticateUser', () => {
    let originalWindowLocation;
  
    beforeAll(() => {
      // Save the original `window.location` to restore it later
      originalWindowLocation = { ...window.location };
  
      // Mock `window.location`
      delete window.location; // Remove the default location property
      window.location = { href: '' }; // Mock it as an object with `href`
    });
  
    afterAll(() => {
      // Restore the original `window.location`
      window.location = originalWindowLocation;
    });
  
    it('should set the correct URL for Spotify authorization', () => {
      const client_id = 'test_client_id';
      const redirect_uri = 'http://localhost/callback';
      const state = 'default_state';
  
      const expectedUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=${state}&show_dialog=true&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private`;
  
      // Call the function under test
      AuthenticateUser(client_id, redirect_uri, state);
  
      // Assert the expected URL
      expect(window.location.href).toBe(expectedUrl);
    });
  });
  