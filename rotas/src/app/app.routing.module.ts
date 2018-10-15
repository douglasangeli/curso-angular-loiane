import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes: Routes = [
    {
        path: 'cursos',
        loadChildren: 'src/app/cursos/cursos.module#CursosModule',//lazyload - busca o JS por demanda
        canActivate: [AuthGuard],//impede de acessar o componente sem autorizacao
        canActivateChild: [CursosGuard],//impede de acessar as rotas filhas
        canLoad: [AuthGuard],//impede de carregar o JS do módulo sem autorizacao
    },
    {
        path: 'alunos',
        loadChildren: 'src/app/alunos/alunos.module#AlunosModule',
        canActivate: [AuthGuard],
        canActivateChild: [AlunosGuard],
        canLoad: [AuthGuard],
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PaginaNaoEncontradaComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        { useHash: true }//usar a hash na rota (padrão é false)
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }