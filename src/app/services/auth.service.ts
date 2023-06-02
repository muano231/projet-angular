import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;

  constructor(
    private router: Router
  ) {
    // récupère la connexion dans le session storage
    this.isAuth = sessionStorage.getItem('isAuth') == "true" ? true : false;
  }

  signIn() {
    // connecte, set l'état dans session storage et renvoie sur la page home
    this.isAuth = true;
    sessionStorage.setItem('isAuth', "true");
    this.router.navigate(['/']);
  }

  register() {
    // renvoie sur la page de connexion
    this.router.navigate(['/signin']);
  }

  signOut() {
    // déconnecte, supprime les valeurs du session storage et renvoie sur la page de connexion
    this.isAuth = false;
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }
  
}
