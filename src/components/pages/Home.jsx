import React, {useState, useEffect} from "react";
import {
  Typography,
  Box,
  Grid,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { deepPurple, green, orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import List from "../List";
import axios from "axios";

const useStyle = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "White",
  },
  addColor: {
    backgroundColor: green[400],
    color: "White",
  },
});

export default function Home() {
  const classes = useStyle();
  const [student, setStudent] = useState({
    studentName : "",
    email : "" 
  });
 const [status, setStatus] = useState();
 function onTextFieldChange(e){
  setStudent({
    ...student,
    [e.target.name]: e.target.value
  });
  // console.log(student);
 }

 async function onFormSubmit(e){
  e.preventDefault();
  try{
  await axios.post("http://localhost:3000/students", student);
  setStatus(true);
  }
  catch(err){
    console.log("Something went wrong");
  }
 }

 if(status){
  return <Home />
 }


    return (
    <div>
      <Box textAlign="center" className={classes.headingColor} p={2}>
        <Typography variant="h2">React CRUD Operations</Typography>
      </Box>
      <Grid container justify="center">
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addColor} m={2}>
            <Typography variant="h3">Add Student</Typography>
          </Box>

          <form action="">
            <Grid container spacing={2}>
              <Grid item xs={12} m={2}>
                <TextField
                  autoComplete="stdname"
                  name="studentName"
                  variant="outlined"
                  required
                  fullWidth
                  id="stdname"
                  label="Name"
                  autoFocus
                  onChange={(e)=>onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  onChange={(e)=>onTextFieldChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <Button variant="contained" 
                onClick={
                  (e)=>onFormSubmit(e)
                }
                
                
                fullWidth>
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item md={6} xs={12}>
            <List/>
        </Grid>
      </Grid>
    </div>
  );
}
