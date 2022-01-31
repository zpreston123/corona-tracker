import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  card: {
    margin: '0 2% !important'
  },
  '@media only screen and (max-width: 770px)': {
    card: {
      margin: '2% 0 !important'
    }
  }
}));
