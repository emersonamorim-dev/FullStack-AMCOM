using Backend_Books.Config;
using Backend_Books.Models;
using Backend_Books.Services;
using Backend_Books.Views.Repository;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Microsoft.AspNetCore.Cors.Infrastructure; // Import necess�rio para o CORS

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adicionando configura��es espec�ficas do projeto
builder.Services.AddSingleton<BookService>();
builder.Services.AddSingleton<BookRepository>();

// Configura��o do MongoDB
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
builder.Services.AddSingleton(mongoDbSettings);

builder.Services.AddSingleton<IMongoClient, MongoClient>(s =>
{
    return new MongoClient(mongoDbSettings.ConnectionString);
});

builder.Services.AddSingleton<BookRepository>();

// Configura��o do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin",
        builder => builder.WithOrigins("http://localhost:4200")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowMyOrigin"); // Adicione esta linha para usar o CORS

app.UseAuthorization();

app.MapControllers();

app.Run();

