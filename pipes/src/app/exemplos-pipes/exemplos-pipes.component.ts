import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning Javascript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  }

  livros = ['Angular', 'Ionic', 'Android'];

  filtro: string;

  valorAsyncPromise = new Promise((resolve, reject) =>
    setTimeout(() => resolve('Valor Assíncrono usando Promisse'), 2000)
  );

  valorAsyncObservable = interval(3000)
    .pipe(map(() => 'Valor Assíncrono usando Observable'));

  constructor() { }

  ngOnInit() {
  }

  addLivro(novoLivro: string) {
    this.livros.push(novoLivro);
  }

  obterLivros() {
    if (this.livros.length === 0
      || this.filtro === undefined
      || this.filtro.trim() === '') {

      return this.livros;
    }

    return this.livros
      .filter(
        v => v.toLocaleLowerCase().indexOf(this.filtro.toLowerCase()) >= 0
      );
  }
}
