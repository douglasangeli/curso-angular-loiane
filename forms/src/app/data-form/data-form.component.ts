import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';

import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { map, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { CidadeBr } from '../shared/models/cidade-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // formulario: FormGroup;
  estados: EstadoBr[];//usando o observable com async para evitar memory leaks
  //estados: Observable<EstadoBr[]>;
  cidades: CidadeBr[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private _fb: FormBuilder,
    private _http: Http,
    private _dropDownService: DropdownService,
    private _cepService: ConsultaCepService,
    private _verificaEmail: VerificaEmailService
  ) {
    super();
  }

  ngOnInit() {

    //this.estados = this._dropDownService.getEstadosBr();
    this._dropDownService.getEstadosBr()
      .subscribe(estados => this.estados = estados);
    this.cargos = this._dropDownService.getCargos();
    this.tecnologias = this._dropDownService.getTecnologias();
    this.newsletterOp = this._dropDownService.getNewsletter();

    this.formulario = this._fb.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmacaoEmail: [null, [Validators.required, FormValidations.equalsTo('email')]],
      endereco: this._fb.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()
    });

    //validacao reativa
    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(status =>
          status === 'VALID'
            ? this._cepService.consultaCep(this.formulario.get('endereco.cep').value)
            : empty()
        ))
      .subscribe(dados => (dados && !dados.erro) ? this.populaDados(dados) : {});

    //combobox aninhado
    this.formulario.get('endereco.uf').valueChanges
      .pipe(
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: string) => this._dropDownService.getCidadesBr(estadoId))
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  private buildFrameworks(): FormArray {
    const values = this.frameworks.map(v => new FormControl(false));
    return this._fb.array(values, FormValidations.requiredMinCheckbox(2));
  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.reduce((a, v, i) => {
        if (v) a.push(this.frameworks[i]);
        return a;
      }, [])
    });

    this._http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(dados => {
        alert('dados enviados');
        console.log(dados);
        this.formulario.reset();
      }, erro => {
        alert('erro ao enviar');
        console.log(erro);
      });
  }

  cancelar() {
    this.formulario.reset();
    this.formulario.get('termos').setValue(false);
  }

  populaDados(dados: any) {

    this.formulario.patchValue({
      endereco: {
        complemento: dados.complemento,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    });
  }

  resetEndereco() {

    this.formulario.patchValue({
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

  setarCargo() {
    const cargo = { cargo: 'Dev', nivel: 'Senior', desc: 'Dev Sr' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2
      ? (obj1.cargo === obj2.cargo && obj1.nivel === obj2.nivel)
      : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue([
      'java', 'python', 'php'
    ]);
  }

  aceitouTermos() {
    let chkTermos = this.formulario.get('termos');
    return chkTermos.valid;
  }

  getFrameworksControls() {
    return (this.formulario.get('frameworks') as FormGroup).controls;
  }

  getErroCep() {
    if (this.formulario.get('endereco.cep').hasError('cepInvalido')) {
      return 'CEP inválido';
    }
    return 'Campo obrigatório';
  }

  getErroEmail() {
    if (this.formulario.get('email').status === 'PENDING') {
      return 'Validando email...';
    }
    if (this.formulario.get('email').hasError('emailExiste')) {
      return 'Email já existe';
    }
    return 'Email inválido';
  }

  validarEmail(formControl: FormControl) {
    return this._verificaEmail.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailExiste: true } : null));
  }
}
