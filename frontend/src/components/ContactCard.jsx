import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';

const ContactCard = (contact) => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
    console.log("co:", contact)
  }, [contact])
    

  return (
    <Card sx={{ display: 'flex' }} style={{width:'50%'}} key={user._id}>
        <CardMedia style={{width: '25%'}}>
            <Avatar src="/broken-image.jpg" style={{borderRadius: '0px', width: '100%', height:'100%'}}/>
        </CardMedia>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {contact.name}
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" component="div">
            mbulelopani09@gmail.com
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            +27737036422
          </Typography>
        </CardContent>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box> */}
      </Box>
      
    </Card>
  );
}

export default ContactCard