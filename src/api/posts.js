import axios from "axios";
import { rootURL } from "../utils/utils";

export const getAllPosts = async () => {
    try {
        const response = await axios.get(rootURL);
        console.log('all posts', response.data);
        return response.data
    } catch (err) {
        console.error('error', err.message);
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${rootURL}/${id}`);
        console.log('a post', response.data);
        return response.data
    } catch (err) {
        console.error('error', err.message);
    }
}

export const createNewPost = async (postObject) => {
    try {
        const response = await axios.post(rootURL, 
            `title=${postObject.title}&body=${postObject.body}`);
        console.log('a response', response.data);
        return response.data
    } catch (err) {
        console.error('error', err.message);
    }
}