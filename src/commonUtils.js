export function isLetter(s) {
  if (s.length !== 1) return false;
  // console.log("checking letter: " + s);

  const charCode = s.charCodeAt();
  // console.log("charcode: '" + "Z".charCodeAt() + "'");
  if (
    (charCode >= "a".charCodeAt() && charCode <= "z".charCodeAt()) ||
    (charCode >= "A".charCodeAt() && charCode <= "Z".charCodeAt())
  ) {
    return true;
  }
  return false;
}

export function isDigit(s) {
  if (s.length !== 1) return false;
  // console.log("checking letter: {" + s + "}");

  const charCode = s.charCodeAt();
  // console.log("charcode: '" + "Z".charCodeAt() + "'");
  if (charCode >= "0".charCodeAt() && charCode <= "9".charCodeAt()) {
    return true;
  }
  return false;
}
