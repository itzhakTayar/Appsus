export const utilsService = {
  makeId,
  formatEmailTime,
};

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function formatEmailTime(sentTime) {
  var time = new Date(sentTime);
  var todayDate = new Date();
  if (
    todayDate.getDate() === time.getDate() &&
    todayDate.getFullYear() === time.getFullYear() &&
    todayDate.getMonth() === time.getMonth()
  ) {
    var minutes = "";
    var hours = "";
    minutes =time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    hours =time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
    var ampm = (hours<=12) ?' AM':' PM'
    return hours + ":" + minutes+ampm;
  }
  return time.toDateString();
}
