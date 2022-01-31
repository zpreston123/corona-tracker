import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '60vh',
    justifyContent: 'center',
    marginBottom: '30px',
    paddingBottom: '3%',
    width: '85%'
  },
  '@media (max-width: 770px)': {
    container: {
      width: '100%'
    }
  }
}));
