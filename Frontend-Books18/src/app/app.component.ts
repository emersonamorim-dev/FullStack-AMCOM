import { Component } from '@angular/core';
import {MegaMenuItem,MenuItem} from 'primeng/api';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontendBooks';

  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [
          {
              label:'Books',
              icon:'pi pi-fw pi-file',
              items:[
                  {
                      label:'Cadastrar Livros',
                      icon:'pi pi-fw pi-plus',
                      routerLink:'books/add'

                  },
                  {
                      label:'Listar Livros',
                      icon:'pi pi-fw pi-user-minus',
                      routerLink: 'books'
                  },
                  {
                      separator:true
                  }
              ]
          },
          {
              label:'Usuários',
              icon:'pi pi-fw pi-user',
              items:[
                  {
                      label:'Cadastrar Usuários',
                      icon:'pi pi-fw pi-plus',

                  },
                  {
                      label:'Listar Usuários',
                      icon:'pi pi-fw pi-user-minus',

                  }
              ]
          }
      ];
  }
}

