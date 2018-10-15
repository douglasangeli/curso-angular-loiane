import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private _service: AuthService) { }

  ngOnInit() {

    this.usuario =  new Usuario();
    this.usuario.email = 'douglas@email.com';
    this.usuario.senha = '123';
  }

  fazerLogin() {
    this._service.fazerLogin(this.usuario);
  }

}
