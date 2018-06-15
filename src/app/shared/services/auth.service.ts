export class AuthService {

  private isAuthenticated = false;

  constructor() {
    console.log('Create AuthService');
  }


  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return !!user;
  }
}
