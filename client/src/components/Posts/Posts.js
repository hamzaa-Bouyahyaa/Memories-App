import React from 'react'
import Post from './Post/Post'
import useStyles from './styles';
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from "@material-ui/core"
import memories from '../../images/memories.png'


function Posts({ setCurrentId }) {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts?.length && !isLoading) {

        return <div>
            <div className={classes.noPostDiv}>
                No memories to show! Try create one...
            </div>
            <div className={classes.imageCenter}>
                <img src={memories} height="120" className={classes.image} alt='memory_image' />
            </div>

        </div>

    }

    return (

        isLoading ?
            <div>
                <div className={classes.circularProgress}>
                    < CircularProgress className={classes.circularProgress} size={80} />
                </div>
            </div>
            : (
                <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                    {posts.map((post) => (
                        <Grid item key={post._id} xs={12} sm={6} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}

                </Grid>
            )

    )
}

export default Posts
