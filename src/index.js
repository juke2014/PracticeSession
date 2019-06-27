import React from "react";
import ReactDOM from "react-dom";
import * as CourseUtils from "./validateCourseUtils";
import * as SemesterUtils from "./validateSemesterUtils";
import * as CommonUtils from "./commonUtils";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./styles.css";

let TABLEROWS = [];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, value) {
  return { name, value };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { resultObj: {}, show: false };
    this.state = { resultObj: { message: "", error: false } };
    this.inputRef = React.createRef();
    this.processInput = this.processInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  processInput() {
    this.setState({
      resultObj: this.validateCourseString(this.inputRef.current.value)
    });
  }

  validateCourseString(str) {
    let departmentName = "";
    let courseNumber = "";
    let semesterName = "";
    let year = "";
    let i = 0;

    let resultFromCourseValidation = CourseUtils.validateCourse(
      str,
      i,
      departmentName,
      courseNumber
    );

    // console.log(resultFromCourseValidation);
    if (resultFromCourseValidation.error === true) {
      return resultFromCourseValidation;
    } else {
      str = resultFromCourseValidation.str;
      courseNumber = resultFromCourseValidation.courseNumber;
      departmentName = resultFromCourseValidation.departmentName;
      i = resultFromCourseValidation.i;
    }
    // Check if space between Course and Semester Strings occur
    if (i >= str.length) {
      return {
        message:
          "Semester Information missing after Department+Course Information",
        error: true
      };
    }
    if (str[i++] !== " ") {
      return {
        message:
          "Space required between Department+Course info and Semester+Year info",
        error: true
      };
    }
    // check if invalid semester+year info i.e. either letter or digit
    if (CommonUtils.isLetter(str[i]) === false && isNaN(str[i]) === true) {
      return {
        message: "Invalid character in Semester+Year info with: " + str[i],
        error: true
      };
    }

    // console.log(SemesterUtils);

    let resultFromSemesterValidation = SemesterUtils.validateSemesterData(
      str,
      semesterName,
      year,
      i
    );

    if (resultFromSemesterValidation.error === true) {
      return resultFromSemesterValidation;
    } else {
      str = resultFromSemesterValidation.str;
      semesterName = resultFromSemesterValidation.semesterName;
      year = resultFromSemesterValidation.year;
      i = resultFromSemesterValidation.i;
    }

    // (// console.log("departmentName:" + departmentName);
    // console.log("course number:" + courseNumber);
    // console.log("semName:" + semesterName);
    // console.log("year:" + year);
    TABLEROWS = [
      createData("Department:", departmentName),
      createData("Course Number:", courseNumber),
      createData("Semester:", semesterName),
      createData("Year:", year)
    ];

    return {
      message: "SUCCESS",
      error: false
    };
  }

  render() {
    return (
      <div>
        <label>
          Name:
          <input type="text" ref={this.inputRef} />
        </label>
        <input type="submit" onClick={this.processInput} />
        <br />
        <label style={{ color: this.state.resultObj.error ? "red" : "green" }}>
          {this.state.resultObj.error ? (
            this.state.resultObj.message
          ) : (
            <div>
              <br />
              <Paper classes={useStyles.root}>
                <Table classes={useStyles.table}>
                  <TableBody>
                    {TABLEROWS.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          )}
        </label>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// </div>
// );
