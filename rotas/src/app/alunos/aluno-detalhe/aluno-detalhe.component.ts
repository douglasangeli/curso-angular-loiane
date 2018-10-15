import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  aluno: Aluno;
  private _inscricao: Subscription;

  constructor(
    private _service: AlunosService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    // this._inscricao = this._route.params.subscribe(params => {
    //   this.id = params['id'];
    //   this.aluno = this._service.getAluno(this.id);
    // });

    console.log('AlunoDetalheComponent: ngOnInit');   

    this._inscricao = this._route.data.subscribe((info: { aluno: Aluno }) => {
      console.log(info);
      this.aluno = info.aluno;
    });
  }

  ngOnDestroy() {
    this._inscricao.unsubscribe();
  }

  editarAluno() {
    console.log('editar aluno'); 
    this._router.navigate(['alunos', this.aluno.id, 'editar'], {});
  }

}
