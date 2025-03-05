import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    // Return the decoded token
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decodes the token into the payload
      } catch (error) {
        console.error('Token decoding failed', error);
        return null; // Return null if decoding fails
      }
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded: any = jwtDecode(token); // Decoding the token to get expiration data
      if (decoded.exp) {
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime; // Return true if the token is expired
      }
      return false; // Return false if there is no expiration data
    } catch (error) {
      console.error('Error checking token expiration', error);
      return true; // If decoding fails, assume the token is invalid
    }
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
