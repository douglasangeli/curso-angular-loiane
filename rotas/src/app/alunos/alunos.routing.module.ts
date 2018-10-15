import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes: Routes = [
    {
        path: '', component: AlunosComponent, children: [
            { path: 'novo', component: AlunoFormComponent },
            {
                path: ':id',
                component: AlunoDetalheComponent,
                resolve: { aluno: AlunoDetalheResolver }//pré-carregar objeto
            },
            { path: ':id/editar', component: AlunoFormComponent, canDeactivate: [AlunosDeactivateGuard] },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})
export class AlunosRoutingModule { }