import { fetchAPI } from '../utils/fetchAPI';

const BASE_URL = 'https://hcmut-study-backend.onrender.com/library';

export const getDocuments = async () => {
    return await fetchAPI(`${BASE_URL}/documents`, 'GET', null, true);
};

export const uploadDocument = async (formData) => {
    return await fetchAPI(`${BASE_URL}/documents`, 'POST', formData, true, true);
};

export const deleteDocument = async (id) => {
    return await fetchAPI(`${BASE_URL}/documents/${id}`, 'DELETE', null, true);
};

export const updateDocument = async (id, data) => {
    return await fetchAPI(`${BASE_URL}/documents/${id}`, 'PUT', data, true);
};

export const getDocumentById = async (id) => {
    return await fetchAPI(`${BASE_URL}/documents/${id}`, 'GET', null, true);
};