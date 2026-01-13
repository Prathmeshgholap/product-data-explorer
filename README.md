#  Product Data Explorer – World of Books

A full-stack web application that scrapes book data from **WorldOfBooks.com**, stores it in a database, and displays it in a modern UI with search and on-demand product details.

##  Features

- Scrapes Fiction books from WorldOfBooks
- Stores data in PostgreSQL
- Avoids duplicate products
- On-demand product detail scraping
- REST API built using NestJS
- Frontend built using React + Vite
- Search books by title
- Fetch more books dynamically
- Hover popup for book details

##  Tech Stack

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Playwright

### Frontend
- React
- TypeScript
- Vite

##  API Endpoints

| Endpoint | Description |
|--------|-------------|
| GET /product | Get all books |
| POST /scrape/products/fiction | Scrape fiction books |
| POST /scrape/product/:id | Scrape book detail on demand |


##  Running the project locally

## Backend
cd backend
npm install
npm run start:dev

Runs at:
http://localhost:3000

### Frontend

cd frontend
npm install
npm run dev

Runs at:
http://localhost:5173

##  How it works

1. Click **Fetch More Books** to scrape new book links  
2. Books are stored in the database  
3. Click **View Details** to scrape detailed book info  
4. Hover popup shows Author, Price, ISBN  

##  Project Structure

product-data-explorer
│
├── backend
│
├── frontend
│
└── README.md

## Author

Prathmesh Gholap
