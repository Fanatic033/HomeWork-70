import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={NavLink} sx={{flexGrow: 1}} to="/"
                      className="text-white text-decoration-none">
            Contacts
          </Typography>
          <NavLink to={'new-contact'} className={'text-white'}>
            <Button color="inherit">add new Contact</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;