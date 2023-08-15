import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {

  bookDialog: boolean = false;

  selectedBook!: Book;

  submitted: boolean = false;

  book: Book[] = [];

  books!: Book;

  addBookForm: FormGroup;

  isEditing: boolean = false;

  orderBy: string = '';

  selectedOrder: string = '';

  selectedBookId: string;

  options = [
    { label: 'Selecione a ordenação', value: '' },
    { label: 'Título Ascendente', value: 'TituloAsc' },
    { label: 'Autor Ascendente', value: 'AutorAsc' },
    { label: 'Título Descendente', value: 'TituloDesc' },
    { label: 'Edição Descendente', value: 'EdicaoDesc' },
    { label: 'Autor Descendente', value: 'AutorDesc' },
    { label: 'Edição Ascendente', value: 'TituloAscEdicaoAsc' }
  ];
  addBookRequest: Book = {
    Id: '',
    Titulo: '',
    Autor: '',
    Edicao: 0
  };


  constructor(
    private router: Router,
    private bookService: BookService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchBooks();

    this.bookService.getAllBooks().subscribe({
      next: (x) => {
        this.book = x;
      },
      error: (response) => {
        console.log(response);
      }

    });
  }

  public addBook() {
    this.bookService.addBook(this.addBookRequest).subscribe({
      next: (x) => {
        alert("Book adicionado com sucesso.");
        this.hideDialog(); // Fechar o modal
        this.router.navigate(['/book-list']); // Redirecionar para a lista de livros
        this.fetchBooks(); // Atualizar a lista de livros
      },
      error: (response) => {
        console.log("Erro detalhado:", response.error.errors);
        console.log(response);
      }
    });
}

updateBook() {
  if (this.books && this.books.Id) {
    this.bookService.updateBook(this.books.Id, this.addBookRequest).subscribe({
      next: () => {
        alert("Book atualizado com sucesso.");
        this.hideDialog();
        this.router.navigate(['/book-list']); // Redirecionar para a lista de livros
        this.fetchBooks();
      },
      error: (response) => {
        console.log("Erro ao atualizar:", response.error.errors);
        console.log(response);
      }
    });
  }
}

editBook(book: Book): void {
  this.isEditing = true; // Setar a flag para verdadeiro quando estiver editando
  this.books = { ...book };
  this.addBookRequest = { ...book }; // Preencher o formulário com os dados do livro
  this.bookDialog = true;
}



deleteBook(id: string): void {
  this.bookService.deleteBook(id).subscribe({
    next: (x) => {
      alert("Book excluído com sucesso.");
      this.fetchBooks(); // Atualizar a lista de livros após a exclusão
    },
    error: (response) => {
      console.log("Erro ao excluir:", response.error.errors);
      console.log(response);
    }
  });
}

confirm(): void {
  if (this.selectedBook && this.selectedBook.Id) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir este livro?',
      accept: (x) => {
        this.deleteBook(this.selectedBook.Id);
      }
    });
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Nenhum livro selecionado para exclusão.'
    });
  }
}

  openNew() {
    this.book = [];
    this.submitted = false;
    this.bookDialog = true;
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
        'TituloAsc': (a, b) => (a.Titulo || '').localeCompare(b.Titulo || ''),
        'AutorAsc': (a, b) => (a.Autor || '').localeCompare(b.Autor || ''),
        'TituloDesc': (a, b) => (b.Titulo || '').localeCompare(a.Titulo || ''),
        'AutorDesc': (a, b) => (b.Autor || '').localeCompare(a.Autor || ''),
        'EdicaoDesc': (a, b) => b.Edicao - a.Edicao,
        'EdicaoAsc': (a, b) => a.Edicao - b.Edicao,
        'TituloAscEdicaoAsc': (a, b) => {
            const titleComparison = (a.Titulo || '').localeCompare(b.Titulo || '');
            if (titleComparison !== 0) return titleComparison;
            return a.Edicao - b.Edicao;
        }
    };

    if (orderMap[orderBy]) {
        this.book.sort(orderMap[orderBy]);
        this.cdRef.detectChanges();
    }
  }
}
