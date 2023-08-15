import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  bookDialog: boolean = false;

  selectedBooks: Book[] = [];

  submitted: boolean = false;

  book: Book[] = [];

  books!: Book;

  addBookForm: FormGroup;

  isEditing: boolean = false;

  orderBy: string = '';
  selectedOrder: string = '';
  options = [
    { label: 'Selecione a ordenação', value: '' },
    { label: 'Título Ascendente', value: 'title_asc' },
    { label: 'Autor Ascendente', value: 'author_asc' },
    { label: 'Título Descendente', value: 'title_desc' },
    { label: 'Edição Descendente', value: 'edition_desc' },
    { label: 'Autor Descendente', value: 'author_desc' },
    { label: 'Edição Ascendente', value: 'edition_asc' }
  ];

  addBookRequest: Book = {
    Id: '',
    Titulo: '',
    Autor: '',
    Edicao: 0
  };

  constructor(private router: Router, private bookService: BookService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

ngOnInit(): void {
    this.fetchBooks();
  }


public addBook() {

      this.bookService.addBook(this.addBookRequest).subscribe({
        next: (x) => {
          alert("Book adicionado com sucesso.");
          this.router.navigate(['book']);
        },
        error: (response) =>{
          console.log(response);
        }
      });
    }


public openNew() {
    this.book = [];
    this.submitted = false;
    this.bookDialog = true;
}



public confirm() {
  this.confirmationService.confirm({
      message: 'Tem certeza de que deseja executar esta ação?',
      accept: () => {

      }
  });
}


hideDialog(): void {
  this.bookDialog = false;
  this.submitted = false;
  this.isEditing = false;
  this.fetchBooks(); // Atualizar a lista de livros
}

  fetchBooks(): void {
    this.bookService.getBooksOrderBy(this.orderBy).subscribe({
      next: (data: Book[]) => {
        this.book = data;
      },
      error: (err: any) => {
        this.handleError(err);
      }
    });
}

  private handleError(error: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao recuperar a lista de livros.'
    });
    console.error('Erro ao recuperar a lista de livros', error);
  }


onOrderByChange(orderBy: string): void {
  const orderMap: { [key: string]: (a: Book, b: Book) => number } = {
      'title_asc': (a, b) => a.Titulo.localeCompare(b.Titulo),
      'author_asc': (a, b) => a.Autor.localeCompare(b.Autor),
      'title_desc': (a, b) => b.Titulo.localeCompare(a.Titulo),
      'edition_desc': (a, b) => b.Edicao - a.Edicao,
      'author_desc': (a, b) => b.Autor.localeCompare(a.Autor),
      'edition_asc': (a, b) => a.Edicao - b.Edicao,
      'title_asc_edition_asc': (a, b) => {
          const titleComparison = a.Titulo.localeCompare(b.Titulo);
          if (titleComparison !== 0) return titleComparison;
          return a.Edicao - b.Edicao;
      }
  };

  if (orderMap[orderBy]) {
      this.book.sort(orderMap[orderBy]);
  }
}


}
