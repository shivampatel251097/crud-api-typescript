import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';

let users: User[] = [];

export const getUsers = (req: Request, res: Response): void => {
  res.status(200).json({ data: users });
};

export const getUserById = (req: Request, res: Response): void => {
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json(user);
};

export const createUser = (req: Request, res: Response): void => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    res.status(400).json({ message: 'Username and age are required' });
    return;
  }

   // Check if username is already taken
   if (users.some(user => user.username === username)) {
    res.status(409).json({ message: 'Username already exists, Please try another username!' });
    return;
  }
  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies || [],
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): void => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const updatedUser = {
    ...users[userIndex],
    username: username ?? users[userIndex].username,
    age: age ?? users[userIndex].age,
    hobbies: hobbies ?? users[userIndex].hobbies,
  };

  users[userIndex] = updatedUser;
  res.status(200).json(users[userIndex]);
};

export const deleteUser = (req: Request, res: Response): void => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  users = users.filter((user) => user.id !== userId);
  res.status(200).json({message: 'User deleted'});
};
