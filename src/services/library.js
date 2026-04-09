import { fetchAPI } from '../utils/fetchAPI';
import { buildAPIUrl } from '../config/api.config';
import { API_ENDPOINTS } from '../config/api.config';

const url = buildAPIUrl(API_ENDPOINTS.DOCUMENT);

export const getDocuments = async () => {
    return await fetchAPI(`${url}`, 'GET', null, true);
};

export const uploadDocument = async (formData) => {
    return await fetchAPI(`${url}`, 'POST', formData, true, true);
};

export const deleteDocument = async (id) => {
    return await fetchAPI(`${url}/${id}`, 'DELETE', null, true);
};

export const updateDocument = async (id, data) => {
    return await fetchAPI(`${url}/${id}`, 'PUT', data, true);
};

export const getDocumentById = async (id) => {
    return await fetchAPI(`${url}/${id}`, 'GET', null, true);
};