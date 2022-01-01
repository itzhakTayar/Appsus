export const utilsService = {
  makeId,
  formatEmailTime,
  getRandomColor,
};

function makeId(length = 12) {
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
    minutes =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    var ampm = hours <= 12 ? " AM" : " PM";
    return hours + ":" + minutes + ampm;
  }
  return time.toDateString();
}

function getRandomColor() {
  const colors = [
    "#FFAEBC",
    "#B4F8C8",
    "#A0E7E5",
    "#FBE7C6",
    "#FFFAF0",
    "#FFF0F5",
  ];
  var i = getRandomInt(0, colors.length - 1);
  return colors[i];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
