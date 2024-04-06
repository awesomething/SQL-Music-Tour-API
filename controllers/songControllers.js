const db = require('../model/song');

const songControllers = {};

songControllers.getBands = (req, res, next) => {
  try {
    const query = res.locals.query;
    // Log the query for debugging purposes
    console.log('Executing SQL query:', query);
    db.query(query, (err, results) => {
      if (err) {
        // Pass the error to the error handling middleware
        return next(err);
      }
      // Assuming results.rows contains the retrieved data
      res.locals.bands = results.rows;
      return next();
    });
  } catch (error) {
    // If an error occurs during query execution, pass it to the error handling middleware
    return next(error);
  }
};


module.exports = songControllers;

