import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  isAuth(): boolean {
    // renvoi l'état de la connexion
    return this.authService.isAuth ? true : false
  }

  home() {
    this.router.navigate(['/']);
  }

  logout() {
    // appelle la fonction de deconnexion sur authService
    this.authService.signOut()
  }

}
