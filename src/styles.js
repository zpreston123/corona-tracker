import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  divider: {
    width: '90%'
  },
  '@media (max-width: 770px)': {
    container: {
      margin: '0 10%',
    },
    image: {
      width: '100%'
    },
    divider: {
      width: '100%'
    }
  }
}));
