import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // si l'utilisateur n'est pas connecté, envoie sur la page de connexion, sinon renvoie true
    if(!this.authService.isAuth){
      this.router.navigate(['/signin']);
    }
    return true;
  }

}
