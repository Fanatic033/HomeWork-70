import React, {useState} from 'react';
import {TextField, Button, Box, Container, Typography} from '@mui/material';
import {useAppDispatch} from '../../hooks/reduxHooks.ts';
import {fetchContacts} from '../../Slice/ContactSlice.ts';
import {useNavigate} from 'react-router-dom';

const AddContactPage = () => {
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
    dispatch(fetchContacts(formState));
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
        <Button type="submit" variant="contained" color="primary" sx={{mt: 3}} className={'mb-5'}>
          Save
        </Button>
        {formState.previewImage && (
          <Box sx={{mt: 2, textAlign: 'center'}}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={formState.previewImage}
              alt="Preview"
              style={{maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '8px'}}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AddContactPage;
