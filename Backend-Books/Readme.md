# Backend Books API - Csharp

Codificação em Csharp para Teste Técnico da AMCOM com uso de banco de Dados MongoDB para criação de aplicação de Backend que contém a implementação de uma API para gerenciar livros. 

## Controller: BookController

O `BookController` é responsável por gerenciar as operações CRUD para livros.

### Endpoints:

1. **Obter todos os livros**:
   - **Rota**: `GET /api/Book`
   - **Descrição**: Retorna uma lista de todos os livros. Se não houver livros, retorna um erro 404.

2. **Obter livros ordenados**:
   - **Rota**: `GET /api/Book/Ordered`
   - **Parâmetros**: `orderCriteria` - critério de ordenação.
   - **Descrição**: Retorna uma lista de livros ordenados com base no critério fornecido.

   Para consulta de ordenação é necessário preencher o campo orderCriteria no Swagger com seguintes ordenações:
   - **TituloAsc**
   - **AutorAsc**
   - **TituloDesc**
   - **EdicaoDesc**
   - **AutorDesc**
   - **TituloAscEdicaoAsc**


3. **Obter um livro específico**:
   - **Rota**: `GET /api/Book/{id}`
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Retorna os detalhes de um livro específico com base no ID fornecido.

4. **Criar um novo livro**:
   - **Rota**: `POST /api/Book`
   - **Body**: Objeto `Book`.
   - **Descrição**: Cria um novo livro e retorna os detalhes do livro criado.

5. **Atualizar um livro**:
   - **Rota**: `PUT /api/Book/{id}`
   - **Parâmetros**: `id` - ID do livro.
   - **Body**: Objeto `Book` com as atualizações.
   - **Descrição**: Atualiza os detalhes de um livro específico com base no ID fornecido.

6. **Excluir um livro**:
   - **Rota**: `DELETE /api/Book/{id}`
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Exclui um livro específico com base no ID fornecido.

### Dependências:

- **BookService**: Este serviço é injetado no `BookController` e fornece métodos para realizar operações CRUD em livros.
- **Models**: Contém a definição do modelo `Book`.
- **Views**: Contém classes e métodos relacionados à apresentação e visualização de dados.



## Books Service

Este repositório contém a implementação de um serviço para gerenciar livros.

## Classe: `BookService`

A classe `BookService` é responsável por fornecer métodos de alto nível para gerenciar livros, atuando como uma camada intermediária entre o controlador e o repositório.

### Métodos:

1. **GetOrderedBooks**:
   - **Parâmetros**: `orderCriteria` - critério de ordenação.
   - **Descrição**: Retorna uma lista de livros ordenados com base no critério fornecido. A ordenação é implementada usando um `Dictionary` para uma abordagem mais moderna e menos verbosa do que o uso tradicional de `switch-case`.

2. **GetBooks**:
   - **Descrição**: Retorna uma lista de todos os livros armazenados no banco de dados.

3. **GetBookById**:
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Retorna os detalhes de um livro específico com base no ID fornecido.

4. **Create**:
   - **Parâmetros**: `book` - Objeto `Book`.
   - **Descrição**: Cria um novo livro no banco de dados.

5. **Update**:
   - **Parâmetros**: `id` - ID do livro, `book` - Objeto `Book` com as atualizações.
   - **Descrição**: Atualiza os detalhes de um livro específico com base no ID fornecido. Se o livro não for encontrado, uma exceção é lançada.

6. **Delete**:
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Exclui um livro específico com base no ID fornecido. Se o livro não for encontrado, uma exceção é lançada.

7. **Exists**:
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Verifica se um livro específico existe no banco de dados com base no ID fornecido.

### Dependências:

- **BookRepository**: Esta classe é responsável por interagir diretamente com o banco de dados e é injetada no `BookService` para realizar operações CRUD.
- **Models**: Contém a definição do modelo `Book`.



## Books Repository

Este repositório contém a implementação de um repositório para gerenciar livros usando MongoDB como banco de dados.


## Classe: `BookRepository`

A classe `BookRepository` é responsável por realizar operações CRUD em livros armazenados no MongoDB.

### Métodos:

1. **GetOrderedBooks**:
   - **Parâmetros**: `orderCriteria` - critério de ordenação.
   - **Descrição**: Retorna uma lista de livros ordenados com base no critério fornecido. Os critérios de ordenação disponíveis são: `TituloAsc`, `AutorAsc`, `TituloDesc`, `EdicaoDesc`, `AutorDesc` e `TituloAscEdicaoAsc`.

2. **GetBooks**:
   - **Descrição**: Retorna uma lista de todos os livros armazenados no banco de dados.

3. **GetBookById**:
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Retorna os detalhes de um livro específico com base no ID fornecido.

4. **Create**:
   - **Parâmetros**: `book` - Objeto `Book`.
   - **Descrição**: Cria um novo livro no banco de dados.

5. **Update**:
   - **Parâmetros**: `id` - ID do livro, `book` - Objeto `Book` com as atualizações.
   - **Descrição**: Atualiza os detalhes de um livro específico com base no ID fornecido.

6. **Delete**:
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Exclui um livro específico com base no ID fornecido.

7. **Exists**:
   - **Parâmetros**: `id` - ID do livro.
   - **Descrição**: Verifica se um livro específico existe no banco de dados com base no ID fornecido.

### Dependências:

- **MongoDbSettings**: Esta classe contém as configurações necessárias para se conectar ao MongoDB.
- **Models**: Contém a definição do modelo `Book`.
- **MongoDB.Driver**: Esta é a biblioteca do driver oficial do MongoDB para C#.



### Tratamento de Erros:

O código possui tratamento de erros robusto, retornando respostas apropriadas em caso de falhas, como erros de validação, erros internos do servidor e outros.
