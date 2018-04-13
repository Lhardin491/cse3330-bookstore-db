var express = require('express');
var connection = require('../dbConnection');
var router = express.Router();

router.get('/all', function (req, res) {
    const query = "SELECT customer.Name AS Customer_Name FROM orders INNER JOIN customer ON orders.Customer_id = customer.Id_no GROUP BY customer.Name";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        //console.log(err);
        res.status(400).send("customer-orders/all error: error retrieving data");
      } else {
        if (rows.length > 0) {
          let returnData = {};
          returnData['sEcho'] = 1;
          returnData['iTotalRecords'] = rows.length;
          returnData['iTotalDisplayRecords'] = rows.length;
          returnData['data'] = rows;
          res.send(JSON.stringify(returnData));
          console.log(returnData);
        } else {
          res.status(204).send("No Content.")
        }
      }
    });
  });

module.exports = router;