import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CursosService } from './cursos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {

  cursos: any[];
  pagina = 1;

  private _inscricao: Subscription;

  constructor(
    private _service: CursosService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.cursos = this._service.getCursos();

    this._inscricao = this._route.queryParams.subscribe(params => {
      this.pagina = params['pagina'];
    });
  }

  ngOnDestroy() {
    this._inscricao.unsubscribe();
  }

  proximaPagina() {
    this._router.navigate(['cursos'], {
      queryParams: {
        'pagina': ++this.pagina
      }
    });
  }

}
