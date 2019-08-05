import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burgers-80aea.firebaseio.com/',
});

export default instance;
