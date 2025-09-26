import { User } from '../models/User';
import { Team } from '../models/Team';

export const teams: Team[] = [
  new Team('team1', 'Engineering'),
  new Team('team2', 'Marketing'),
  new Team('team3', 'Sales'),
];

export const users: User[] = [
  new User('user1', 'Alice', 'team1'),
  new User('user2', 'Bob', 'team1'),
  new User('user3', 'Charlie', 'team2'),
  new User('user4', 'David', 'team3'),
];
