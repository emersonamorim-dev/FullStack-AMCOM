using Backend_Books.Config;
using Backend_Books.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;

namespace Backend_Books.Views.Repository
{
    public class BookRepository
    {
        private readonly IMongoCollection<Book> _books;

        public BookRepository(IMongoClient mongoClient, MongoDbSettings settings)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _books = database.GetCollection<Book>(settings.BooksCollectionName);
        }

        public List<Book> GetOrderedBooks(string orderCriteria)
        {
            var allBooks = _books.Find(book => true).ToList();

            if (!allBooks.Any())
            {
                throw new OrdenacaoException("Conjunto vazio.");
            }

            var orderMap = new Dictionary<string, Func<IEnumerable<Book>, IEnumerable<Book>>>
        {
        { "TituloAsc", books => books.OrderBy(b => b.Titulo) },
        { "AutorAsc", books => books.OrderBy(b => b.Autor) },
        { "TituloDesc", books => books.OrderByDescending(b => b.Titulo) },
        { "EdicaoDesc", books => books.OrderByDescending(b => b.Edicao) },
        { "AutorDesc", books => books.OrderByDescending(b => b.Autor) },
        { "TituloAscEdicaoAsc", books => books.OrderBy(b => b.Titulo).ThenBy(b => b.Edicao) }
         };

            if (!orderMap.ContainsKey(orderCriteria))
            {
                throw new OrdenacaoException("Critério de ordenação inválido.");
            }

            return orderMap[orderCriteria](allBooks).ToList();
        }
        public IEnumerable<Book> GetBooks()
        {
            return _books.Find(book => true).ToList();
        }


        public Book GetBookById(string id)
        {
            return _books.Find<Book>(book => book.Id == id).FirstOrDefault();
        }

        public void Create(Book book)
        {
            _books.InsertOne(book);
        }

        public void Update(string id, Book book)
        {
            _books.ReplaceOne(b => b.Id == id, book);
        }

        public void Delete(string id)
        {
            _books.DeleteOne(book => book.Id == id);
        }



    }
 }