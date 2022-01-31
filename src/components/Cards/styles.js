import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: '50px 0'
  },
  infected: {
    borderBottom: '10px solid rgba(0, 0, 255, 0.5)'
  },
  recovered: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)'
  },
  deaths: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)'
  }
}));
