import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Http } from '@angular/http';

import { Usuario } from '../model/usuario';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    private _http: Http,
    private _cepService: ConsultaCepService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    this._http.post('https://httpbin.org/post', JSON.stringify(this.usuario))
      .subscribe(dados => {
        alert('dados enviados');
        console.log(dados);
      }, erro => {
        alert('erro ao enviar');
        console.log(erro);
      });
  }

  isValid(campo: NgModel): boolean {
    return campo.valid || !campo.touched;
  }

  consultaCep(cepDigitado: string, f: NgForm) {

    const cep = cepDigitado.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this._cepService.consultaCep(cep)
        .subscribe(dados => {
          if (!dados.erro)
            this.populaDados(dados, f);
        });
    }
  }

  populaDados(dados: any, form: NgForm) {

    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    });
  }

  resetEndereco(form: NgForm) {

    form.form.patchValue({
      endereco: {
        complemento: null,
        logradouro: null,
        bairro: null,
        cidade: null,
        uf: null,
        numero: null
      }
    });
  }
}
