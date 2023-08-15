import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from '../models/Book';
import { BookService } from './book.service';


describe('BooksService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all books', () => {
    const mockBooks: Book[] = [
      { id: '1', Titulo: 'Emer', Autor: '123.456.789-00', Edicao: 0},
      { id: '2', Titulo: 'Emer', Autor: '123.456.789-00', Edicao: 0},
    ];

    service.getAllBooks().subscribe((books: Book[]) => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/api/Books`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should add a book', () => {
    const mockBook: Book = {
      id: '1',
      Titulo: 'Emer',
      Autor: '123.456.789-00',
      Edicao: 0
    };


    service.addBook(mockBook).subscribe((book: Book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/api/Book/1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBook);
    req.flush(mockBook);
  });

  it('should retrieve a single pessoa by id', () => {
    const mockBook: Book = {
      id: '2',
      Titulo: 'Emer',
      Autor: '123.456.789-00',
      Edicao: 0
    };


    service.getAllBooks('2').subscribe((book: Book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/api/Book/2`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should update a book', () => {

    const mockBook: Book = {
      id: '3',
      Titulo: 'Emer',
      Autor: '123.456.789-00',
      Edicao: 0
    };


    service.updateBook('3', mockBook).subscribe((book: Book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/api/Book/3`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockBook);
    req.flush(mockBook);
  });

  it('should delete a book', () => {
    const req = httpMock.expectOne(`${service.apiUrl}/api/Book/4`);

    const mockBook: Book = {
      id: '4',
      Titulo: 'Emer',
      Autor: '123.456.789-00',
      Edicao: 0
    };

    expect(req.request.method).toBe('DELETE');
    req.flush(mockBook);
    httpMock.verify();
    });
  });
