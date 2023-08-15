import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  // GET: Obter todos os livros
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // GET: para ordenar por Crescente ou Descrecente títulos, autor ou edição
  getBooksOrderBy(orderCriteria?: string): Observable<Book[]> {
    const url = orderCriteria ? `${this.apiUrl}/Ordered?orderCriteria=${orderCriteria}` : this.apiUrl;
    return this.http.get<Book[]>(url);
}


// GET: Obter um livro específico pelo ID
getBookById(id: string): Observable<Book> {
  return this.http.get<Book>(`${this.apiUrl}/${id}`);
}

  // POST: Criar um novo livro
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }


// PUT: Atualizar um livro específico pelo ID
updateBook(id: string, book: Book): Observable<Book> {
  return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
}

// DELETE: Excluir um livro específico pelo ID
deleteBook(id: string): Observable<Book> {
  return this.http.delete<Book>(`${this.apiUrl}/${id}`);
}

}


