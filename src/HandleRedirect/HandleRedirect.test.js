import HandleRedirect from './HandleRedirect';

describe('HandleRedirect', () => {
  beforeEach(() => {
    // Clear localStorage and reset window.location
    localStorage.clear();
    delete window.location; // Delete the existing window.location
    window.location = { search: '' }; // Mock window.location.search
  });

  it('should store the "code" in localStorage if present in the query string', () => {
    // Simulate a URL with a code parameter
    window.location.search = '?code=test_code';

    // Call the function
    HandleRedirect();

    // Verify that the code is stored in localStorage
    expect(localStorage.getItem('code')).toBe('test_code');
  });

  it('should not store anything in localStorage if "code" is not in the query string', () => {
    // Simulate a URL without a code parameter
    window.location.search = '?state=test_state';

    // Call the function
    HandleRedirect();

    // Verify that localStorage does not contain a "code" key
    expect(localStorage.getItem('code')).toBeNull();
  });

  it('should not modify localStorage if the query string is empty', () => {
    // Simulate a URL with no query string
    window.location.search = '';

    // Call the function
    HandleRedirect();

    // Verify that localStorage is not modified
    expect(localStorage.length).toBe(0);
  });
});
