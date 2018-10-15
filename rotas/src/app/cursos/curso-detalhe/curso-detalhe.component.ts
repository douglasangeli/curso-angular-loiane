import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';


@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy {

  id: string;
  curso: any;

  _inscricao: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: CursosService) { }

  ngOnInit() {
    this._inscricao = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.curso = this._service.getCurso(this.id);

      if (!this.curso) {
        this._router.navigate(['cursos/curso-nao-encontrado']);
      }
    });
  }

  ngOnDestroy() {
    this._inscricao.unsubscribe();
  }

}
