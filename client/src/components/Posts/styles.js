import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  noPostDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(35),
    fontSize: '32px'
  },

  imageCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    marginTop: theme.spacing(10),
  },
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(18),
  },

}));