
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getBlogs = async() =>  {
   const response =  await axios.get(`${BASE_URL}/posts`);
   return response.data;
}

export const getBlogsById = async(id) => {
    const response = await axios.get(`${BASE_URL}/posts/${id}`)
    return response.data;
}

export const getBlogComments = async() => {
    const response = await axios.get(`${BASE_URL}/comments`)
    return response.data;
}

export const getTodos = async() => {
    const response = await axios.get(`${BASE_URL}/todos`)
    return response.data;
}

