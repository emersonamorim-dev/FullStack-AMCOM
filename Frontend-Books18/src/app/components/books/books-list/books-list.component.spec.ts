import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BooksListComponent } from './books-list.component';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from '../../models/Book';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('PessoaListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let pessoasServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BooksService', ['getAllBooks', 'addBook']);

    await TestBed.configureTestingModule({
      declarations: [BooksListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        MessageService,
        ConfirmationService,
        { provide: BookService, useValue: spy }
      ]
    }).compileComponents();

    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    bookServiceSpy.getAllBooks.and.returnValue(of([]));
    bookServiceSpy.addBook.and.returnValue(of({
      id: '1',
      titulo: 'Emerson Amorim',
      autor: '123.456.789-00',
      edicao: 'SP'
    } as Book));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on init', () => {
    const mockBook: Book[] = [
      { id: '1', titulo: 'Teste 1', autor: '111.111.111-11', edicao: 'SP' },
      { id: '2', titulo: 'Teste 2', autor: '222.222.222-22', edicao: 'RJ' }
    ];
    pessoasServiceSpy.getAllBooks.and.returnValue(of(mockBook));

    component.ngOnInit();

    expect(component.book).toEqual(mockBook);
  });

  it('should add book on submit', () => {
    spyOn(window, 'alert').and.callFake(() => {});
    spyOn(TestBed.inject(Router), 'navigate').and.callFake(() => Promise.resolve(true));

    const router = TestBed.inject(Router);

    component.addBookRequest = { id: '', titulo: 'Teste', autor: '111.111.111-11', edicao: 'SP' };
    component.addBook();

    expect(bookServiceSpy.addBook).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Book adicionada com sucesso.');
    expect(router.navigate).toHaveBeenCalledWith(['book']);
  });
});


