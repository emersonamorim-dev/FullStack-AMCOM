# FullStack - Lista de Livros

Uma aplicação Full Stack para gerenciar uma lista de livros. O backend é construído usando C# com MongoDB e o frontend é desenvolvido com Angular e TypeScript.


### Backend

- **C#**: Linguagem de programação utilizada para desenvolver a lógica do servidor.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar informações dos livros.
  
### Frontend

- **Angular**: Framework JavaScript utilizado para desenvolver a interface da aplicação.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **node_modules.rar**: Descompacte o pacote Node_Modules.rar dentro da pasta Frontend e instale os PrimeNG para fazer aplicação rodar sem erros:

- npm install primeng --save
- npm install primeicons --save

## Instalação

### Backend

1. Clone o repositório.
2. Navegue até a pasta do backend.
3. Execute `dotnet restore` para instalar as dependências.
4. Configure sua string de conexão do MongoDB no arquivo `appsettings.json`.
5. Execute `dotnet run` para iniciar o servidor.

### Frontend

1. Navegue até a pasta do frontend.
2. Execute `npm install` para instalar as dependências.
3. Execute `ng serve` para iniciar a aplicação Angular. Acesse `http://localhost:4200/`.

## Uso

1. No frontend, você verá uma lista de livros já cadastrados.
2. Você pode adicionar, editar ou excluir livros conforme necessário.
3. As alterações são refletidas instantaneamente no backend e armazenadas no MongoDB.

## Autor:
Emerson Amorim

