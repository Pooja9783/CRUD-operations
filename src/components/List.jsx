import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { green, orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const useStyle = makeStyles({
  bgList: {
    backgroundColor: orange[400],
    color: "White",
  },
  tableHeadCell: {
    color: "White",
  },
});
export default function List() {
  const classes = useStyle();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    try {
      const student = await axios.get("http://localhost:3000/students");
      setStudents(student.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  }

  //delete

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/students/${id}`);

    const data = students.filter((e) => {
      return e.id != id;
    });
    setStudents(data);
  };

  return (
    <div>
      <Box textAlign="center" p={2} className={classes.bgList} m={2}>
        <Typography variant="h3">Students List</Typography>
      </Box>
      <TableContainer componenet={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No.
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((std, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{std.id}</TableCell>
                  <TableCell align="center">{std.studentName}</TableCell>
                  <TableCell align="center">{std.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <Link to={`/view/${std.id}`}>
                          <Visibility color="primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Link to={`/edit/${std.id}`}>
                          <Edit />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(std.id)}>
                        <Delete color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
