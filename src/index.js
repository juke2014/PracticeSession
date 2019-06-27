import React from "react";
import ReactDOM from "react-dom";
import * as CourseUtils from "./validateCourseUtils";
import * as SemesterUtils from "./validateSemesterUtils";
import * as CommonUtils from "./commonUtils";
import * as StyleUtils from "./styleUtils";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { resultObj: {}, show: false };
    this.state = { resultObj: { message: "", error: false, tablerows: [] } };
    this.inputRef = React.createRef();
    this.update = this.update.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  update() {
    this.setState({
      resultObj: this.validateData(this.inputRef.current.value)
    });
  }

  validateData(str) {
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

    const tablerows = [
      { "Department:": departmentName },
      { "Course Number:": courseNumber },
      { "Semester:": semesterName },
      { "Year:": year }
    ];
    this.setState({ tablerows: tablerows });

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
              <Paper classes={StyleUtils.useStyles.root}>
                <Table classes={StyleUtils.useStyles.table}>
                  <TableBody>
                    {this.state.tablerows.map(row => (
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
