import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  retourBtn: {
    marginTop: theme.spacing(5),
    borderColor: "#fff",
    width: "40vh",
    backgroundColor: "#3F51B5",
    display: "flex",
    justifyContent: "center",
    color: "#fff",
    padding: theme.spacing(2),
    fontSize: "18px",
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));
