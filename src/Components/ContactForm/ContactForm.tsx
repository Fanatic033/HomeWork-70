import {Box, Button, Container, TextField, Typography} from '@mui/material';
import ButtonSpinner from '../Spinner/ButtonSpinner.tsx';
import React, {FC, useEffect, useState} from 'react';
import {OneContact} from '../../Slice/ContactSlice.ts';

interface Props {
  existingContact?: OneContact;
  isLoading: boolean;
  onSubmit: (contact: OneContact) => void;
}

const ContactForm: FC<Props> = ({existingContact, isLoading, onSubmit}) => {
  const [formState, setFormState] = useState({
    id: existingContact?.id || '',
    name: existingContact?.name || '',
    phone: existingContact?.phone || '',
    email: existingContact?.email || '',
    image: existingContact?.image || '',
    previewImage: existingContact?.previewImage || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'image') {
      setFormState((prevState) => ({
        ...prevState,
        previewImage: value
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formState);
  };

  useEffect(() => {
    if (existingContact) {
      setFormState(existingContact);
    }
  }, [existingContact]);
  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
        <Typography variant="h5" gutterBottom>
          {existingContact ? 'Edit Contact' : 'Add Contact'}
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Image"
          name="image"
          value={formState.image}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{mt: 3}} className={'mb-5'} disabled={isLoading}>
          {isLoading && <ButtonSpinner/>}
          Save
        </Button>

        {formState.previewImage && (
          <Box sx={{mt: 2, textAlign: 'center'}}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={formState.previewImage}
              alt="Фото отсутствует"
              style={{maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '8px'}}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ContactForm;