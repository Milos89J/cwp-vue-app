const Category = require('../models/categori');

exports.getCategori = function(req, res) {
  Category.find({})
        .exec((errors, categori) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(categori);
  });
}