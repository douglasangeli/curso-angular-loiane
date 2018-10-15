import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from '../../guards/iform-can-deactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  aluno: any;

  private _formMudou = false;
  private _inscricao: Subscription;

  constructor(
    private _service: AlunosService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._inscricao = this._route.params.subscribe(params => {
      let id = params['id'];
      this.aluno = this._service.getAluno(id);
    });
  }

  ngOnDestroy() {
    this._inscricao.unsubscribe();
  }

  onInput() {
    this._formMudou = true;
  }

  podeDesativar() {
    if (this._formMudou) {
      return confirm('Tem certeza que deseja sair do formulário?');
    }

    return true;
  }
}
