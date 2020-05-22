const { getUserById } = require("../database/users");

const getUser = async (request, response) => {
    getUserById(request.body.id)
    .then((user) => {
        response.status(301).json({ user });
      })
      .catch((err) =>
        response.status(404).json({ error: "User not found", err })
      );
};

module.exports = {
    getUser
};