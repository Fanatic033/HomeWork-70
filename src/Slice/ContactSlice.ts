import {createSlice} from '@reduxjs/toolkit';

interface OneContact {
  name: string;
  email: string;
  phone: string;
  image: string;
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

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {},
  reducers: {},
  extraReducers: () => {
  },
});

export const contactsReducer = contactsSlice.reducer;