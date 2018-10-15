import { Injectable, EventEmitter } from "@angular/core";
import { LogService } from "../shared/log.service";

@Injectable()
export class CursosService {

    static eventCriouCurso = new EventEmitter<string>();

    cursos = ['Angular', 'NodeJS', 'Typescript'];

    constructor(private _logService: LogService) {
        this._logService.console('new CursosSevice()');
    }

    getCursos(): string[] {
        this._logService.console('Obtendo lista de cursos.');
        return this.cursos;
    }

    add(curso: string) {
        this._logService.console(`Criando um novo curso ${curso}.`);
        this.cursos.push(curso);
        CursosService.eventCriouCurso.emit(curso);
    }
}