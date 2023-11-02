import { createAsyncThunk } from "@reduxjs/toolkit";
import { addContact, deleteContact, getAllContacts } from "contactsService/contactsAPI";

export const requestGetAllContacts = createAsyncThunk(
    'contacts/get', // префикс санки, должен быть уникален, иначе будут применяться некорректные обработчики
    async (data, thunkAPI) => { // 2й параметр асинхронная колл-бэк функция]
        try {
            const contacts = await getAllContacts();
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const requestDeleteContact = createAsyncThunk(
    'contact/delete',
    async (data, thunkAPI) => {
        try {
            const result = await deleteContact(data);
            return result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const requestAddContact = createAsyncThunk(
    'contact/add',
    async (data, thunkAPI) => {
        try {
            const newContact = await addContact(data);
            return newContact.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)