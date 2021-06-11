const dateformat = require("dateformat");

export default (inputDate: Date) => {
  return dateformat(inputDate, "yyyy-mm-dd");
};
