# Frontend Books - Angular

Codificação em Angular programado em Typescript do Frontend Books para Teste Técnico para AMCOM para desenvilvmento de componente e service que oferece funcionalidades para gerenciar livros com uso de Banco de dados MongoDB que é banco de dados NOSQL.

## Funcionalidades

- **Adicionar Livro**: Os usuários podem adicionar um novo livro à lista.
- **Atualizar Livro**: Os usuários podem atualizar os detalhes de um livro existente.
- **Excluir Livro**: Os usuários podem excluir um livro da lista.
- **Visualizar Livros**: Os usuários podem ver a lista de todos os livros.
- **Ordenar Livros**: Os usuários podem ordenar a lista de livros com base em diferentes critérios.

## Dependências

- **primeng/api**: Usado para diálogos de confirmação e mensagens.
- **@angular/router**: Usado para navegar entre componentes.
- **@angular/forms**: Usado para funcionalidades do grupo de formulários.

## Métodos

- **addBook()**: Adiciona um novo livro.
- **updateBook()**: Atualiza um livro existente.
- **editBook()**: Prepara o componente para editar um livro.
- **deleteBook()**: Exclui um livro.
- **confirm()**: Pede confirmação antes de excluir um livro.
- **openNew()**: Abre um diálogo para adicionar um novo livro.
- **hideDialog()**: Fecha o diálogo do livro.
- **fetchBooks()**: Busca a lista de livros.
- **handleError()**: Lida com erros.
- **onOrderByChange()**: Ordena a lista de livros com base no critério selecionado.


# Métodos do Service

- getAllBooks
Obtém todos os livros.

- getBooksOrderBy
Obtém livros e os ordena com base em um critério específico.

- getBookById
Obtém um livro específico pelo seu ID.

- addBook
Adiciona um novo livro.

- updateBook
Atualiza um livro específico pelo seu ID.

- deleteBook
Exclui um livro específico pelo seu ID.

- handleError
Lida com erros que podem ocorrer durante as chamadas HTTP.

- **Configurações**
O serviço utiliza a URL base definida no arquivo de ambiente e opções HTTP para definir o tipo de conteúdo como JSON.

- **Construtor**
O serviço utiliza o HttpClient para realizar chamadas HTTP.


## Autor:
Emerson Amorim
