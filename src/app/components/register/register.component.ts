import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    // formulaire de création de compte
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit() { }

  async onSubmit() {
    // si le formulaire n'est pas valide => aucune action
    if(this.registerForm.invalid) return;

    // si les mot de passes correspondent, l'utilisateur est ajouté dans la base firebase
    if(this.registerForm.value.password == this.registerForm.value.confirmPassword) 
      await this.firestoreService.createUser(this.registerForm.value.username, this.registerForm.value.password) && this.authService.register()
    
  }
}
