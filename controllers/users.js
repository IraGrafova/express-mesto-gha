
const users = [];
let id = 0;



const getUsers = ('/users', (req, res) => {
  res.status(200).send(users);
});

const getUserById = ('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === Number(id));

  if (user) {
    res.status(200).send(user);
    return;
  }

  res.status(404).send({message: 'User not found'});
});

const createUser = ('/users', (req, res) => {
  id += 1;
  const newUser = {
    id,
   ...req.body,
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

module.exports = {getUsers, getUserById, createUser}