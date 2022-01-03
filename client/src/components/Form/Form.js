import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

function Form({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const error = useSelector((state) => state.posts.error);
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);

  const [postData, setpostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }

    clear();
  };

  const clear = async () => {
    setCurrentId(null);
    setpostData({
      title: "",
      message: "",
      selectedFile: "",
      tags: "",
    });
  };

  return !user ? (
    <Paper className={classes.paper} elevation={6}>
      <Typography variant="h6" align="center">
        Please{" "}
        <Link to="/auth" className={classes.textDecorationSign}>
          Sign in
        </Link>{" "}
        to create your own memories and like other's memories
      </Typography>
    </Paper>
  ) : (
    <Paper className={classes.paper} elevation={6}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        encType="multiple/form-data"
      >
        <Typography variant="h6">
          {currentId ? `Editing` : `Creating`} a Memory
        </Typography>

        <TextField
          id="title"
          name="title"
          variant="outlined"
          fullWidth
          label="Title"
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        />
        <TextField
          id="message"
          name="message"
          variant="outlined"
          fullWidth
          label="Message"
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          id="tags"
          name="tags"
          variant="outlined"
          fullWidth
          label="Tags"
          value={postData.tags}
          onChange={(e) =>
            setpostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <input
            type="file"
            filename="selectedFile"
            onChange={(e) => {
              setpostData({ ...postData, selectedFile: e.target.files[0] });
            }}
          />
        </div>
        {error && (
          <Alert severity="error" className={classes.alert}>
            {error}
          </Alert>
        )}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
