import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from "@angular/forms";
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormulario: FormGroup;
  public errors:any = [];

  constructor(private login: FormBuilder,private userServices: UsersService, private router: Router) { 
    this.loginFormulario = this.login.group({
      email: ['', Validators.required,, Validators.email],
      password: ['', Validators.required]
    })
    this.userServices.handleDataUser("");
  }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.userServices.getUser().subscribe(
      (result:any) => {
        if((this.loginFormulario.value['email'] == result.email) && (this.loginFormulario.value['password'] == result.password)){         
          this.userServices.handleDataUser("home");
          this.router.navigate(['home']);
        }else{
          this.errors = "Usuario o contraseña incorectos";
        }
      },
      error => {
        this.errors = error.error;
        //console.log(this.errors);
      },() => {
        //this.authState.setAuthState(true);
        this.loginFormulario.reset()
        //this.router.navigate(['profile']);
        setTimeout(() => this.errors=[], 5000);
      }
    );
  }
}
