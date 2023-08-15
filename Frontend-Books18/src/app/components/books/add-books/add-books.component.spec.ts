import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { AddBooksComponent } from './add-books.component';
import { BookService } from '../../services/book.service';

describe('AddPessoaComponent', () => {
  let component: AddBooksComponent;
  let fixture: ComponentFixture<AddBooksComponent>;
  let pessoasServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PessoasService', ['getAllPessoas', 'addPessoa']);

    await TestBed.configureTestingModule({
      declarations: [ AddBooksComponent ],
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [
        { provide: BookService, useValue: spy },
        MessageService,
        ConfirmationService
      ]
    })
    .compileComponents();

    bookServiceSpy = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all books on init', () => {
    const mockBooks = [{id: '1', autor: 'Emerson Amorim', titulo: '123456789', edicao: 'MT'}];
    bookServiceSpy.getAllBooks.and.returnValue(of(mockBooks));

    component.ngOnInit();

    expect(bookServiceSpy.getAllBooks).toHaveBeenCalled();
    expect(component.book).toEqual(mockBooks);
  });

  it('should add pessoa and navigate to pessoa list on successful add', () => {
    const mockBook = {id: '2', autor: 'Emerson Luiz', titulo: '987654321', edicao: 'SP'};
    bookServiceSpy.addBook.and.returnValue(of(mockBook));
    const routerSpy = spyOn(component['router'], 'navigate');


    component.addBook();

    expect(pessoasServiceSpy.addBook).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['book']);
  });
});
