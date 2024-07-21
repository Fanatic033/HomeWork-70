import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';

interface OneContact {
  name: string;
  email: string;
  phone: string;
  image: string;
  previewImage: string;
}

interface ContactsState {
  contacts: OneContact[];
  error: boolean;
  isLoading: boolean;
}

export const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: false,
};

export const fetchContacts = createAsyncThunk<OneContact[], contactType, {
  rejectValue: string
}>('contacts/fetchContacts', async (contactData, {rejectWithValue}) => {
  try {
    const response = await axiosApi.post('/contacts.json', contactData);
    return response.data;
  } catch (e) {
    return rejectWithValue('Could not fetch contacts.');
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export type contactType = { name: string, email: string, phone: string, image: string, previewImage: string };