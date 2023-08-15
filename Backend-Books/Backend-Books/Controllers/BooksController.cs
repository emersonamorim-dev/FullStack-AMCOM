using Backend_Books.Models;
using Backend_Books.Services;
using Backend_Books.Views;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend_Books.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class BookController : ControllerBase
    {
        private readonly BookService _service;

        public BookController(BookService service)
        {
            _service = service;
        }

        // Rota padrão para obter todos os livros
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            try
            {
                var books = _service.GetBooks();
                if (books == null || !books.Any())
                {
                    return NotFound("No books found.");
                }
                return Ok(books);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        // Rota específica para obter livros ordenados
        [HttpGet("Ordered")]
        public IActionResult GetOrderedBooks(string orderCriteria)
        {
            try
            {
                var books = _service.GetOrderedBooks(orderCriteria);
                if (books == null || !books.Any())
                {
                    return NotFound("No books found for the given criteria.");
                }
                return Ok(books);
            }
            catch (OrdenacaoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor.");
            }
        }



        [HttpGet("{id}")]
        public ActionResult<Book> GetBook(string id)
        {
            try
            {
                var book = _service.GetBookById(id);
                if (book == null)
                {
                    return NotFound();
                }
                return Ok(book);
            }
            catch (Views.OrdenacaoException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Book> CreateBook([FromBody] Book book)
        {
            try
            {
                _service.Create(book);
                return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
            }
            catch (Views.OrdenacaoException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(string id, [FromBody] Book book)
        {
            try
            {
                _service.Update(id, book);
                return NoContent();
            }
            catch (Views.OrdenacaoException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(string id)
        {
            try
            {
                _service.Delete(id);
                return NoContent();
            }
            catch (Views.OrdenacaoException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
