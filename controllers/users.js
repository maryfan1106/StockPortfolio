const { getUserById, insertUser } = require("../database/users");

const getUser = async (request, response) => {
    getUserById(request.body.id)
    .then((user) => {
        const { uid, email, pwhash } = user;
        response.status(301).json({ uid, email, pwhash });
      })
      .catch((err) =>
        response.status(404).json({ error: "User not found" })
      );
};

const createUser = async (request, response) => {
  insertUser(request.body)
  .then((user) => {
      response.status(201).json({ user });
    })
    .catch((error) =>
      response.status(400).json({ error })
    );
};

module.exports = {
    getUser,
    createUser
};