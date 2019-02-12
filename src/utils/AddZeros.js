function addZeros(time) {
  if (time < 10) {
    return "0" + String(time);
  }
  return String(time);
}

export default addZeros;
