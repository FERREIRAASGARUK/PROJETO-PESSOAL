import { create } from 'apisauce';

const users = create({
  baseURL: 'http://localhost:3002',
});

export default users;
