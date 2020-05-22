const { getUserById, getUserByEmail, insertUser } = require("../database/users");
const { comparePassword, getToken } = require("../services/util");

const getUser = async (request, response) => {
    getUserById(request.body.id)
    .then((user) => {
        const { uid, email, pwhash } = user;
        response.status(302).json({ uid, email, pwhash });
      })
      .catch((err) =>
        response.status(404).json({ error: "User not found" })
      );
};

const createUser = async (request, response) => {
  insertUser(request.body)
  .then((user) => {
      request.user = user;
      const token = getToken(request.user);
      response.status(201).json({ token: token });
    })
    .catch((error) =>
      response.status(400).json({ error })
    );
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ error: "Missing required field" });
  }
  const user = await getUserByEmail(email);
  if (!user || !comparePassword(password, user.pwhash)) {
    response.status(400).json({ error: "Invalid email or password" })
  } else {
    request.user = user;
    const token = getToken(request.user);
    response.status(200).json({ token: token })
  }
};

module.exports = {
    getUser,
    createUser,
    loginUser
};