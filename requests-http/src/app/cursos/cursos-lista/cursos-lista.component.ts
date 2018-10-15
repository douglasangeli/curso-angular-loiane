import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];
  cursos$: Observable<Curso[]>;

  constructor(private _cursosService: CursosService) { }

  ngOnInit() {
    // this._cursosService.list()
    //   .subscribe(cursos => this.cursos = cursos);
    this.cursos$ = this._cursosService.list();
  }

}
