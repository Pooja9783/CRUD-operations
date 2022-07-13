import React, { useState, UseEffect, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
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

export default function Edit() {
  const classes = useStyle();
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    stdName: "",
    email: "",
  });

  useEffect(() => {
    async function getData() {
      try {
        const student = await axios.get(`http://localhost:3000/students/${id}`);
        setStudent(student.data);
      } catch (err) {
        console.log("Something went wrong");
      }
    }
    getData();
  }, [id]);

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/students/${id}`, student);
      // setStatus(true);
      navigate("/");

    } catch (err) {
      console.log("Something went wrong");
    }
  }

  function handleClick() {
    navigate("/");
  }

  return (
    <div>
      <Box textAlign="center" className={classes.headingColor} p={2}>
        <Typography variant="h2">React CRUD Operations</Typography>
      </Box>
      <Grid container justify="center">
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addColor} m={2}>
            <Typography variant="h3">Edit Student</Typography>
          </Box>

          <form action="">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  id="id"
                  label="ID"
                  value={student.id}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="stdname"
                  name="studentName"
                  variant="outlined"
                  required
                  fullWidth
                  id="stdname"
                  label="Name"
                  autoFocus
                  value={student.studentName}
                  onChange={(e) => onTextFieldChange(e)}
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
                  autoFocus
                  value={student.email}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={6} m={2}>
                <Button
                  variant="contained"
                  onClick={(e) => onFormSubmit(e)}
                  fullWidth
                >
                  Update
                </Button>
                <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back to Home
        </Button>
      </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
