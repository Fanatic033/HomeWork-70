import React, {useState} from 'react';
import {TextField, Button, Box, Container, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks.ts';
import {useNavigate} from 'react-router-dom';
import {postContacts} from '../../Slice/ContactSlice.ts';
import {RootState} from '../../store/store.ts';
import ButtonSpinner from '../../Components/Spinner/ButtonSpinner.tsx';

const AddContactPage = () => {
  const isLoading = useAppSelector((state: RootState) => state.contacts.isLoading);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    image: '',
    previewImage: ''
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(postContacts(formState));
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
        <Typography variant="h5" gutterBottom>
          Add Contact
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

export default AddContactPage;
