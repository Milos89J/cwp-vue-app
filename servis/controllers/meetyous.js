const Meetyou = require('../models/meetyous');

exports.getMeetyou = function(req, res) {
  Meetyou.find({})
        .populate('category')
        .populate('joinedPeople')
        .exec((errors, meetyous) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetyous);
  });
}

exports.getMeetyouById = function(req, res) {
  const {id} = req.params;

  Meetyou.findById(id)
        .populate('meetyouCreator', 'name id avatar')
        .populate('category')
        .populate({path: 'joinedPeople',
           options: {limit: 5, sort: {username: -1}}})
        .exec((errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetyou);
  });
}
