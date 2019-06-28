import * as CommonUtils from "./commonUtils";
import * as ErrorUtils from "./errorUtils";
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
  if (
    CommonUtils.isLetter(str[i]) === false &&
    CommonUtils.isDigit(str[i]) === false
  ) {
    return ErrorUtils.error2Msg(506, str[i]);
  }

  if (CommonUtils.isLetter(str[i]) === false) {
    // this should be year
    // console.log(i + ";" + str[i]);
    while (i < str.length && CommonUtils.isDigit(str[i]) === true)
      year += str[i++];

    if (year.length !== 2 && year.length !== 4) {
      return ErrorUtils.error2Msg(507, year);
    }
    if (year.length === 4 && year.slice(0, 2) !== "20") {
      return ErrorUtils.error2Msg(508);
    }
    if (i >= str.length) {
      return ErrorUtils.error2Msg(509);
    }
  } else {
    // this should be valid semester name
    while (i < str.length && CommonUtils.isLetter(str[i]) === true) {
      semesterName += str[i++];
    }

    // validate semester name
    let lowerCaseStr = semesterName.toLowerCase();
    if (SEMSTER_NAMES.has(lowerCaseStr) === false) {
      return ErrorUtils.error2Msg(510, semesterName);
    }

    if (i >= str.length) {
      return ErrorUtils.error2Msg(511);
    }
  }

  // Check if space delimiter
  // check if invalid semester+year info i.e. either letter or digit
  if (
    CommonUtils.isLetter(str[i]) === false &&
    CommonUtils.isDigit(str[i]) === false
  ) {
    if (str[i] !== " ") {
      return ErrorUtils.error2Msg(512, str[i]);
    }
    i++;
  }

  // TODO: Refactor below code with code just above by writing a function
  // check if invalid semester+year info i.e. either letter or digit
  if (
    CommonUtils.isLetter(str[i]) === false &&
    CommonUtils.isDigit(str[i]) === false
  ) {
    return ErrorUtils.error2Msg(513, str[i]);
  }

  if (CommonUtils.isLetter(str[i]) === false) {
    // this should be year
    while (i < str.length && CommonUtils.isDigit(str[i]) === true)
      year += str[i++];
    if (year.length !== 2 && year.length !== 4) {
      return ErrorUtils.error2Msg(513, year);
    }
    if (year.length === 4 && year.slice(0, 2) !== "20") {
      return ErrorUtils.error2Msg(515);
    }
  } else {
    // this should be valid semester name
    while (i < str.length && CommonUtils.isLetter(str[i]) === true) {
      semesterName += str[i++];
    }

    // validate semester name
    let lowerCaseStr = semesterName.toLowerCase();
    if (SEMSTER_NAMES.has(lowerCaseStr) === false) {
      return ErrorUtils.error2Msg(516, semesterName);
    }
  }

  if (i !== str.length) {
    return ErrorUtils.error2Msg(517);
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
