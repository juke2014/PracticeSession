import * as CommonUtils from "./commonUtils";
const VALID_DELIMITERS = new Set(["-", " ", ":"]);

export function validateCourse(str, i, departmentName, courseNumber) {
  str = str.trim();
  console.log("course string called..");
  if (str.length === 0) return { message: "No text Entered", error: true };

  if (CommonUtils.isLetter(str[i]) === false)
    return {
      message: "Text should start with Department name (letters only).",
      error: true
    };

  // Push first letter
  departmentName += str[i++];
  // Add rest of the course name letters
  while (i < str.length && CommonUtils.isLetter(str[i]) === true)
    departmentName += str[i++];

  // check if course string delimeter
  if (i < str.length) {
    if (isNaN(str[i]) === true) {
      if (VALID_DELIMITERS.has(str[i]) === false) {
        return {
          message:
            "Invalid delimiter after name. Allowed: <no space>,single space, :, -",
          error: true
        };
      } else {
        i++;
      }
    }
  } else {
    return {
      message: "Course number missing after Department name",
      error: true
    };
  }
  // console.log("Iam here");
  // Check if course number starts
  if (i >= str.length || isNaN(str[i]) === true) {
    return {
      message: "Course number missing after Department name",
      error: true
    };
  }

  // Parse Course number
  while (i < str.length && !isNaN(parseInt(str[i]))) {
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
