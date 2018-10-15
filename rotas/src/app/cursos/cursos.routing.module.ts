import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const cursosRoutes: Routes = [
    { path: '', component: CursosComponent },
    { path: 'curso-nao-encontrado', component: CursoNaoEncontradoComponent },
    { path: ':id', component: CursoDetalheComponent },
];

@NgModule({
    imports: [RouterModule.forChild(cursosRoutes)],
    exports: [RouterModule]
})
export class CursosRoutingModule { }