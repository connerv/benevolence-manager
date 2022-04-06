import Head from "next/head";
import Navbar from "../components/base/navbar";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Divider, Link, Snackbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Context from "../helpers/user";
import ReactPlayer from 'react-player';
import { createResource, deleteResource, getResources } from "../helpers/db";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  player: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width:"640px"
  },
  margin: {
    marginTop: 40,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[100],
    "&:hover": {
      backgroundColor: green[200],
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function ResourceDisplay ({type, link, title, description, id, resetData}) {
  const user = React.useContext(Context);

  const isAdmin = () => {
    if(user.userData.roles){
      return user.userData.roles.includes('admin')
    }
    return false
  }

  const classes = useStyles();  

  const deleteResource2 = async(id) =>{
    await deleteResource(id)
    resetData()
  }

  return(
          <>
          <h3>{title}</h3>
                <p>{description}</p>
                {type == 'video' ?
                <div className={classes.player}>
                <ReactPlayer 
                url={link}
                controls={true}
                  />
              </div>
              :
              <Link href={link} target="_blank" rel="noopener">
              {link}
            </Link>
                }
                
                {isAdmin() ? 
                <>
                <div style={{marginTop: "20px"}}></div>
                <Button
                variant="outlined"
                color="primary"
                onClick={() =>{deleteResource2(id)}}
               
              >
                Delete Resource
              </Button>
              </>
              :
              <></>
              }
              <Divider style={{marginTop: "20px"}}></Divider>
              
          </>
        )        
                
}

export default function Resources() {
  const classes = useStyles();
  const user = React.useContext(Context);
  const [resourceType, setResourceType] = React.useState("video")
  const [link, setLink] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [messageOpen, setMessageOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [resources, setResources] = React.useState([{title: "loading..."}])

  const isAdmin = () => {
    if(user.userData.roles){
      return user.userData.roles.includes('admin')
    }
    return false
  }

  const handleTypeChange = (e) => {
    setResourceType(e.target.value)
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value)
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageOpen(false);
  };

  const submit = async (e) => {
   let res = await createResource(resourceType, link, title, description)
   console.log(res)
   setMessage(res.message)
   setMessageOpen(true)
   if(res.type == 'success'){
     setLink("")
     setTitle("")
     setDescription("")
     resetData()
   }
  };

  React.useEffect(()=>{
    let ignore = false;

    const getResources2 = async () => {
      let data = await getResources()
      console.log(data)
       if (!ignore) setResources(data)
    };
 
   
      getResources2()
      return () => { ignore = true; }
  }, [])
  

  const resetData = async () => {
    let data = await getResources()
    setResources(data)
  }
 

  return (
    <div>
      <Head>
        <title>CFC Benevolence</title>
        
      </Head>
      <Navbar></Navbar>

      {user.auth ? (
        <div>
        <div className={classes.root}>
          <Grid
            className={classes.margin}
            container
            spacing={3}
            justify="center"
          >
            <Grid item xs={8} >
              <Paper className={classes.paper}>
              {isAdmin() ?
              <>
                 <h2>Create Resource (Admin Only)</h2>
                 <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">Resource Type</InputLabel>
                      <Select
                        labelId="type-label"
                        id="type"
                        value={resourceType}
                        onChange={handleTypeChange}
                      >
                        <MenuItem value={'video'}>Video</MenuItem>
                        <MenuItem value={'link'}>Link</MenuItem>
                      </Select>
                </FormControl>
                 <form noValidate autoComplete="off">
                   <Grid item xs={12}>
                     <TextField
                       required
                       id="link"
                       label="Link"
                       value={link}
                       placeholder="https://link.com"
                       variant="outlined"
                       onChange={handleLinkChange}
                       type="text"
                     />
                   </Grid>

                   <Grid item xs={12} >
                     <TextField
                       required
                       id="title"
                       label="Title"
                       value={title}
                       placeholder="name"
                       variant="outlined"
                       onChange={handleTitleChange}
                       type="text"

                     />
                   </Grid>
                   <Grid item xs={12} >
                     <TextField
                       required
                       id="description"
                       label="Description"
                       value={description}
                       placeholder="description"
                       variant="outlined"
                       onChange={handleDescriptionChange}
                       type="text"

                     />
                   </Grid>
                   <Button
                          variant="outlined"
                          color="primary"
                          onClick={submit}
                         
                        >
                          Create New Resource
                        </Button>
                   </form>
                   <Divider style={{marginTop: "20px"}}></Divider>
                </>
                :
                <div></div>
              }
              <h1>Resources</h1>
              <Divider></Divider>
              {resources.map((resource) =>{
                return(
                  <ResourceDisplay key={resource.id} type={resource.type} link={resource.link} title={resource.title} description={resource.description} id={resource.id} resetData={resetData}></ResourceDisplay>
                )
              })
              }
              
                
                
               
               
                
                

                 

               
              </Paper>
            </Grid>
          </Grid>
          <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info">
                {message}
              </Alert>
          </Snackbar>
          
        </div>
        
      </div>
      
      ) : (
        <div>
        <h2>You must be authenticated to use this page</h2>
      </div>
      )}
    </div>
  );
}
