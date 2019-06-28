import * as CommonUtils from "./commonUtils";
import * as ErrorUtils from "./errorUtils";
const VALID_DELIMITERS = new Set(["-", " ", ":"]);

export function validateCourse(str, i, departmentName, courseNumber) {
  str = str.trim();
  if (str.length === 0) return ErrorUtils.error2Msg(502);

  if (CommonUtils.isLetter(str[i]) === false) return ErrorUtils.error2Msg(501);
  // Push first letter
  departmentName += str[i++];
  // Add rest of the course name letters
  while (i < str.length && CommonUtils.isLetter(str[i]) === true)
    departmentName += str[i++];

  // check if course string delimeter
  if (i < str.length) {
    if (CommonUtils.isDigit(str[i]) === false) {
      if (VALID_DELIMITERS.has(str[i]) === false) {
        return ErrorUtils.error2Msg(503);
      } else {
        i++;
      }
    }
  } else {
    return ErrorUtils.error2Msg(504);
  }
  // console.log("Iam here");
  // Check if course number starts
  if (i >= str.length || CommonUtils.isDigit(str[i]) === false) {
    return ErrorUtils.error2Msg(505);
  }

  // Parse Course number
  while (i < str.length && CommonUtils.isDigit(str[i]) === true) {
    // console.log(str[i]);
    // console.log(parseInt(str[i]) === NaN);
    courseNumber += str[i++];
  }
  return {
    error: false,
    courseNumber,
    departmentName,
    str,
    i
  };
}
