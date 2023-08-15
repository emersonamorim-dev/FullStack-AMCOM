using Backend_Books.Models;
using Backend_Books.Views.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend_Books.Services
{
    public class BookService
    {
        private readonly BookRepository _repository;

        //Ordenação implementada com uso de Dictionary menos código e mais atual do que uso Switch case para ordenação
        public List<Book> GetOrderedBooks(string orderCriteria)
        {
            return _repository.GetOrderedBooks(orderCriteria);
        }

        public BookService(BookRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Book> GetBooks()
        {
            return _repository.GetBooks();
        }

        public Book GetBookById(string id)
        {
            return _repository.GetBookById(id);
        }

        public void Create(Book book)
        {
            _repository.Create(book);
        }

        public void Update(string id, Book book)
        {
            _repository.Update(id, book);
        }

        public void Delete(string id)
        {
            _repository.Delete(id);
        }


    }
}

