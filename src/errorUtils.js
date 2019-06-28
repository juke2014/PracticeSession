export function error2Msg(errorCode, str) {
  // let 501_Error_Code = "Text should start with Department name";
  switch (errorCode) {
    case 501:
      return {
        message: "Text should start with Department name (with Letter only)",
        error: true
      };
    case 502:
      return {
        message: "No Text Entered.",
        error: true
      };
    case 503:
      return {
        message:
          "Invalid delimiter after name. Allowed: <no space>,single space, :, -",
        error: true
      };
    case 504:
      return {
        message: "Course number missing after Department name",
        error: true
      };
    case 505:
      return {
        message: "Course number missing after Department name",
        error: true
      };

    case 506:
      return {
        message: "Invalid character in Semester+Year info with: " + str,
        error: true
      };

    case 507:
      return {
        message: "Invalid year: " + str,
        error: true
      };

    case 508:
      return {
        message: "Only 2000+ year can be entered",
        error: true
      };

    case 509:
      return {
        message: "Semester missing after Year",
        error: true
      };

    case 510:
      return {
        message: "Invalid semester name: " + str,
        error: true
      };

    case 511:
      return {
        message: "Year missing after Semester",
        error: true
      };
    case 512:
      return {
        message: "Invalid delimiter for Semester+Year info sub string: " + str,
        error: true
      };

    case 513:
      return {
        message: "Invalid character in Semester+Year info with: " + str,
        error: true
      };

    case 514:
      return {
        // TODO: refactor all return statements
        message: "Invalid year: " + str,
        error: true
      };

    case 515:
      return {
        message: "Only 2000+ year can be entered",
        error: true
      };

    case 516:
      return {
        message: "Invalid semester name: " + str,
        error: true
      };

    case 517:
      return {
        message: "Unexpected Characters after Semester+Year infro: ",
        error: true
      };

    case 518:
      return {
        message:
          "Semester Information missing after Department+Course Information",
        error: true
      };

    case 519:
      return {
        message:
          "Space required between Department+Course info and Semester+Year info",
        error: true
      };

    case 520:
      return {
        message: "Invalid character in Semester+Year info with: " + str,
        error: true
      };

    default:
      return "Internal Validation Error";
  }
}
