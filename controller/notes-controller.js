const store = require('../services/notes-storage.js');
const path = require('path');

module.exports.showIndex = function(req, res) {
  res.sendFile(path.resolve('./public/index.html'));
};

module.exports.createNote = function(req, res) {
  store.add(req.body, function(){
    res.json('Notiz gespeichert');
  });
};

module.exports.showOrder = function(req, res) {
     store.get(req.params.id, function(err, order) {
        res.type('text/html');
        res.write("<html>");
        if (order) {
            res.write("<p>Order-Number: " + order._id + "</p>");
            res.write("<p>Status: " + order.state + "</p>");
            if (order.state === "OK") {
                res.write("<form action='/orders/" + order._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
            }
        }
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};

module.exports.deleteOrder =  function (req, res) {
    store.delete(  req.params.id , function(err, order) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Order-Number: " + order._id + "</p>");
        res.write("<p>Status: " + order.state + "</p>");
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};
