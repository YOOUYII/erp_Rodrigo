import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

import {ReactiveFormsModule,NonNullableFormBuilder,Validators, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './register.html'
})
export class Register {
  title = 'ERP Rodrigo';

  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: "/" },
    { label: 'Iniciar Sesion', icon: 'pi pi-user', routerLink: '/login' },
    { label: 'Registrarse', icon: 'pi pi-user-plus', routerLink: '/register' }
  ];

private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  // - mínimo 10 caracteres
  // - al menos 1 símbolo especial: !@#$%^&*
  private readonly passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

  readonly registerForm = this.fb.group({
    name: ['', [
      Validators.required, 
      this.noWhitesSpacesValidator
    ]],
    user: ['',[
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9_]{4,20}$/)
    ]],
    email: ['', [
      Validators.required, Validators.email
    ]],
    age: [ , [
      Validators.required, 
      Validators.min(18), 
      Validators.pattern(/^[0-9]+$/)
    ]],
    phone: ['', [ 
      Validators.required, 
      Validators.pattern(/^[0-9]+$/)
    ]],
    password: ['', [
      Validators.required, 
      Validators.pattern(this.passwordPattern)
    ]],
    confirmPassword: ['', 
      Validators.required
    ]
  },{
    validators: this.passwordsMatchValidator // DEBE DE ESTAR ESTE AQUI PORUQE USA GET.(PASSWORD) SI ESTUVIERA SOLO EN EL CAMPO DE CONFIRMPASSWORD NO LO PODRIA OBTENER
  });

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null { // AbstractControl representa todo el form. Si retorna null esta bien sino mal
    const password = control.get('password')?.value; // SE PONE ASI PORQUE LA VALIDACION QUEDAA GLOBAL PARA TODO EL FORMULARIO
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  noWhitesSpacesValidator(control: AbstractControl): ValidationErrors | null {

    const name = control.value; // SE PONE ASI PORQUE ESTA VALIDACION SE ESTA PONIENDO DENTRO DEL CAMPO YA 
    
    if(name && name.trim().length === 0){
      return {whiteSpace: true};
    }

    return null;
  }

  register(): void {
    if (this.registerForm.invalid) return;

    const userData = this.registerForm.getRawValue();

    console.log('Usuario registrado:', userData);

    // SE GUARDARIA EL REGISTRO EN LLOCAL STORAGE
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    // REDIRECCION
    this.router.navigate(['/login']);
  }
}