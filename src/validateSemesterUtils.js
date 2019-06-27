import * as CommonUtils from "./commonUtils";
const SEMSTER_NAMES = new Set([
  "f",
  "fall",
  "w",
  "winter",
  "s",
  "spring",
  "su",
  "summer"
]);

const SEMSTER_KV_PAIRS = new Map([
  ["f", "Fall"],
  ["fall", "Fall"],
  ["w", "Winter"],
  ["winter", "Winter"],
  ["s", "Spring"],
  ["spring", "Spring"],
  ["su", "Summer"],
  ["summer", "Summer"]
]);
export function validateSemesterData(str, semesterName, year, i) {
  // check if invalid semester+year info i.e. either letter or digit
  if (CommonUtils.isLetter(str[i]) === false && isNaN(str[i]) === true) {
    return {
      message: "Invalid character in Semester+Year info with: " + str[i],
      error: true
    };
  }

  if (CommonUtils.isLetter(str[i]) === false) {
    // this should be year
    while (i < str.length && isNaN(str[i]) === false) year += str[i++];
    if (year.length !== 2 && year.length !== 4) {
      return {
        message: "Invalid year: " + year,
        error: true
      };
    }
    if (year.length === 4 && year.slice(0, 2) !== "20") {
      return {
        message: "Only 2000+ year can be entered",
        error: true
      };
    }
  } else {
    // this should be valid semester name
    while (i < str.length && CommonUtils.isLetter(str[i]) === true)
      semesterName += str[i++];
    // validate semester name
    let lowerCaseStr = semesterName.toLowerCase();
    if (SEMSTER_NAMES.has(lowerCaseStr) === false) {
      return {
        message: "Invalid semester name: " + semesterName,
        error: true
      };
    }
  }

  // Check if space delimiter
  // check if invalid semester+year info i.e. either letter or digit
  if (CommonUtils.isLetter(str[i]) === false && isNaN(str[i]) === true) {
    if (str[i] !== " ") {
      return {
        message:
          "Invalid delimiter for Semester+Year info sub string: " + str[i],
        error: true
      };
    } else {
      i++;
    }
  }

  // TODO: Refactor below code with code just above by writing a function
  // check if invalid semester+year info i.e. either letter or digit
  if (CommonUtils.isLetter(str[i]) === false && isNaN(str[i]) === true) {
    return {
      message: "Invalid character in Semester+Year info with: " + str[i],
      error: true
    };
  }

  if (CommonUtils.isLetter(str[i]) === false) {
    // this should be year
    while (i < str.length && isNaN(str[i]) === false) year += str[i++];
    if (year.length !== 2 && year.length !== 4) {
      return {
        // TODO: refactor all return statements
        message: "Invalid year: " + year,
        error: true
      };
    }
    if (year.length === 4 && year.slice(0, 2) !== "20") {
      return {
        message: "Only 2000+ year can be entered",
        error: true
      };
    }
  } else {
    // this should be valid semester name
    while (i < str.length && CommonUtils.isLetter(str[i]) === true)
      semesterName += str[i++];
    // validate semester name
    let lowerCaseStr = semesterName.toLowerCase();
    if (SEMSTER_NAMES.has(lowerCaseStr) === false) {
      return {
        message: "Invalid semester name: " + semesterName,
        error: true
      };
    }
  }

  if (i !== str.length) {
    return {
      message: "Unexpected Characters after Semester+Year infro: ",
      error: true
    };
  }

  // Get unabbreviated semester name
  semesterName = SEMSTER_KV_PAIRS.get(semesterName.toLowerCase());
  year = year.length === 2 ? "20" + year : year;

  return {
    error: false,
    semesterName,
    year,
    str,
    i
  };
}
