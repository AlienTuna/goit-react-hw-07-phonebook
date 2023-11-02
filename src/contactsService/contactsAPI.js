import axios from "axios"

const BASE_URL = 'https://653d34eff52310ee6a99fe47.mockapi.io/'

const api = axios.create({
    baseURL: BASE_URL,
})
//action - "contacts/fetchAll"
export const getAllContacts = async () => {
    const result = await api.get('contacts');
    return result.data;
}
//action - "contacts/addContact"
export const addContact = async (newContact) => {
    return await api.post('contacts', newContact);
}
//action - "contacts/deleteContact"
export const deleteContact  = async (contactId) => {
    return await api.delete(`contacts/${contactId}`);
}