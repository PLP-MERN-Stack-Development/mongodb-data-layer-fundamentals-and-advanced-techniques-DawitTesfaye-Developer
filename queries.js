// queries.js - MongoDB Queries

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// 6. Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Use projection to return only the title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination: Limit 5 books per page, skip first 5 (Page 2)
db.books.find().limit(5).skip(5);

// 11. Aggregation: Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 12. Aggregation: Author with most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 13. Aggregation: Group by decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// 14. Index on title
db.books.createIndex({ title: 1 });

// 15. Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 16. Explain query with index
db.books.find({ title: "1984" }).explain("executionStats");
