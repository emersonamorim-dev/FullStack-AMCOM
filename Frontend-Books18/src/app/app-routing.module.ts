import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './components/books/add-books/add-books.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';

const routes: Routes = [
  {
    path:'',
    component: AddBooksComponent
  },
  {
    path:'books/add',
    component: AddBooksComponent
  },
  {
    path:'books',
    component: BooksListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
