import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';

export interface OneContact {
  name: string;
  email: string;
  phone: string;
  image: string;
  previewImage: string;
}

export interface ContactsState {
  contacts: OneContact[];
  error: boolean;
  isLoading: boolean;
}

export const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: false,
};
export const fetchContacts = createAsyncThunk<OneContact[], void, {
  rejectValue: string
}>('contacts/fetchContacts', async (_, {rejectWithValue}) => {
  try {
    const {data: contact} = await axiosApi.get('/contacts.json');
    const contacts: OneContact[] = Object.keys(contact).map((key) => ({
      ...contact[key],
      id: key
    }));
    return contacts;
  } catch (e) {
    return rejectWithValue('Error fetching contacts',);
  }
});

export const postContacts = createAsyncThunk<OneContact, contactType, {
  rejectValue: string
}>('contacts/postContacts', async (contactData, {rejectWithValue}) => {
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
        state.error = false;
        state.isLoading = true;

      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<OneContact[]>) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(postContacts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postContacts.fulfilled, (state, action: PayloadAction<OneContact>) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(postContacts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export type contactType = { name: string, email: string, phone: string, image: string, previewImage: string };