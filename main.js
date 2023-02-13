const currentTimeElement = document.querySelector(".currentTime");
const selectElement = document.querySelectorAll("select");
const btnElement = document.querySelector(".btn");
const timeGroupElement = document.querySelector(".timeGroup");

var isPlaying = false;
var alarmTime;
var currenTime;
var alamrSong = new Audio("./assets/song/alarmSong.mp3");

//現在の時刻表示
setInterval(function () {
  var date = new Date();
  var currentHour = date.getHours();
  var currentMinute = date.getMinutes();
  var currentSecond = date.getSeconds();

  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  if (currentSecond < 10) {
    currentSecond = "0" + currentSecond;
  }

  currenTime = `${currentHour}:${currentMinute}:${currentSecond}`;
  currentTimeElement.innerHTML = currenTime;

  if (alarmTime == currenTime) {
    alamrSong.play();
    alamrSong.loop = isPlaying;
  }
}, 1000);

//時間のオプション
for (var i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  var option = `<option value=${i}>${i}</option>`;
  selectElement[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

//分のオプション
for (var i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  var option = `<option value=${i}>${i}</option>`;
  selectElement[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

//秒のオプション
for (var i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  var option = `<option value=${i}>${i}</option>`;
  selectElement[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

btnElement.onclick = function () {
  setAlarm();
};

function setAlarm() {
  alarmTime = `${selectElement[0].value}:${selectElement[1].value}:${selectElement[2].value}`;
  if (
    alarmTime.includes("hour") ||
    alarmTime.includes("minute") ||
    alarmTime.includes("second")
  ) {
    return alert("正しい時間を設定してください！");
  }

  if (isPlaying) {
    alarmTime = "";
    btnElement.innerText = "アラーム設定";
    timeGroupElement.classList.remove("disable");
    alamrSong.pause();
    return (isPlaying = false);
  }
  isPlaying = true;
  btnElement.innerText = "アラーム削除";
  timeGroupElement.classList.add("disable");
}
