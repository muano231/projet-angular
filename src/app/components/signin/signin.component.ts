import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  authForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    // formulaire de connexion
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() { }

  async onSubmit() {
    // si le formulaire est invalide => aucun traitement
    if(this.authForm.invalid) return;

    // vérifie que l'utilisateur existe et s'il existe => connexion
    if(await this.firestoreService.checkUser(this.authForm.value.username, this.authForm.value.password)) this.authService.signIn();
    
  }

}
