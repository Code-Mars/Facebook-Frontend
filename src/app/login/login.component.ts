import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DateValidator } from './dateValidator';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  resetForm!:FormGroup;
  loginErrorMessage!: String;
  loginSuccessMessage!: String;
  successMessage!: String;
  errorMessage!: String;
  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
    private local:LocalstorageService
  ) {}
  ngOnInit(): void {
    if(this.local.getData().id!=-1)this.router.navigate(['/home']);
    this.registerForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-z]{2,}( [A-Z][a-z]*)*$'),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z][a-z0-9]*( [A-Z][a-z0-9]*)*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
          ),
        ],
      ],
      cnfPassword: ['', Validators.required],
      dob: ['', [Validators.required, DateValidator.checkDate]],
      gender: ['', [Validators.required]],
    });
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.resetForm=this.formBuilder.group({
      username:['', [Validators.required,Validators.pattern('^[A-Z][a-z0-9]*( [A-Z][a-z0-9]*)*$')]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/)]],
      cnfPassword:['', Validators.required]
    })

  }
  register() {
    this.errorMessage = '';
    this.successMessage = '';
    this.service.createUser(this.registerForm.value).subscribe(
      (response) => {
        this.successMessage = 'You have registered successfully Please login!';
        setTimeout(() => {
          document.getElementById('close')?.click();
        }, 2000);
      },
      (error) =>
        (this.errorMessage = 'Some Error occurred! Please try again later.')
    );
  }
  login() {
    this.loginSuccessMessage = '';
    this.loginErrorMessage = '';
    if (this.loginForm.invalid) {
      this.loginErrorMessage = 'Enter username and password!';
      return;
    }
    this.service.loginUser(this.loginForm.value).subscribe(
      (response) => {
        this.loginSuccessMessage = 'Logged in Successfully';
        this.service.loadProfile(response).subscribe(response=>{
          localStorage.setItem("user",JSON.stringify(response));
          this.router.navigate(['\home']);
        }, error=>this.loginErrorMessage="Unable to load profile");
      },
      (error) => (this.loginErrorMessage = 'Invalid credentials!')
    );
  }
  isInvalid(name: string) {
    return (
      this.registerForm.controls[name].dirty &&
      this.registerForm.controls[name].invalid
    );
  }
  invalid(name: string) {
    return (
      this.resetForm.controls[name].dirty &&
      this.resetForm.controls[name].invalid
    );
  }
  isValid(name: string) {
    return this.registerForm.controls[name].valid;
  }
  valid(name: string) {
    return this.resetForm.controls[name].valid;
  }
  resetSuccessMessage="";
  resetErrorMessage="";
  resetPassword(){
    this.resetSuccessMessage="";
    this.resetErrorMessage="";
    return this.service.resetPassword(this.resetForm.value).subscribe((res)=>{
      this.resetSuccessMessage="Password reset successfully!"
      setTimeout(() => {
        document.getElementById('close')?.click();
      }, 2000);
    }, 
    (error)=>this.resetErrorMessage="Invalid username or email!");
  }
}
