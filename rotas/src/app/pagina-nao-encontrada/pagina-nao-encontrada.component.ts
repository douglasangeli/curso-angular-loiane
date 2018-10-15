import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <h3 class="center">
      Página {{ currentUrl }} não encontrada!
    </h3>
  `
})
export class PaginaNaoEncontradaComponent implements OnInit {

  public currentUrl: string = "";

  constructor(private _router: Router) { }

  ngOnInit() {
    this.currentUrl = this._router.url;
  }

}
