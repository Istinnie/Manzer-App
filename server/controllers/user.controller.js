const db = require("../models");
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    nom: req.body.nom,
    email: req.body.email,
    image: req.body.image,
    restaurant: req.body.restaurant,
    secteur: req.body.secteur,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom
    ? { nom: { $regex: new RegExp(nom), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  // if (!req.body) {
  //   return res.status(400).send({
  //     message: "Data to update can not be empty!",
  //   });
  // }

  // const id = req.params.id;

  // User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  //   .then((data) => {
  //     if (!data) {
  //       res.status(404).send({
  //         message: `Cannot update User with id=${id}. Maybe User was not found!`,
  //       });
  //     } else res.send({ message: "User was updated successfully." });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error updating User with id=" + id,
  //     });
  //   });
  const email = req.query.email;
  var condition = email
    ? { email: { $regex: new RegExp(email), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all user.",
      });
    });
};

// Find user by email
exports.findRestaurantInfo = (req, res) => {
  User.find({ email: req.params.email })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "KO",
      });
    });
};
