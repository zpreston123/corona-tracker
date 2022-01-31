import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  image: {
    maxWidth: '160px'
  },
  '@media (max-width: 770px)': {
    image: {
      width: '100%'
    },
    divider: {
      width: '100%'
    }
  }
}));
