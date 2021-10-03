let firebaseConfig = {
  apiKey: "AIzaSyC5R7LCZcoI7tCAlIXyzysc7P8aOrQW1FU",
  authDomain: "realtimechat-f89da.firebaseapp.com",
  databaseURL: "https://realtimechat-f89da-default-rtdb.firebaseio.com",
  projectId: "realtimechat-f89da",
  storageBucket: "",
  messagingSenderId: "1064752724926",
  appId: "1:1064752724926:web:6d4317e0e20dd6258197ef"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const form = document.querySelector('.form form')
const DarkTheme = document.querySelector('#dark-theme')
const LightTheme = document.querySelector('#light-theme')
const theme = document.querySelector('#theme')
const color = document.querySelector('.wrapper')

DarkTheme.onclick = () => {
  LightTheme.classList.remove('active')
  DarkTheme.classList.add('active')
  theme.innerText = 'Dark Theme'
  color.classList.add('Dark-Theme')
}

LightTheme.onclick = () => {
  DarkTheme.classList.remove('active')
  LightTheme.classList.add('active')
  theme.innerText = 'Light Theme'
  color.classList.remove('Dark-Theme')
}




let name = prompt("Enter Full Name : ")
let $messages = $('.messages'), d, h, m, mornight, i = 0;

form.onsubmit = (e) => {
  e.preventDefault();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  firebase.database().ref("messages").on("child_added", function (snapshot) {
    if (snapshot.val().sender == name) {
      $('<div class="personal-message">'+
        '<label class="personal-name">'+ name + '</label>'+
        '<div class="personal-chat">'+
        '<p>' + snapshot.val().message + '</p>'+
        '<img src="profile/default-avatar.png" alt="profile" /></div></div>').appendTo($('.mCSB_container')).addClass('new')
    } else {
      $('<div class="friend-message">'+
        '<label class="friend-name">'+snapshot.val().sender+'</label>' +
        '<div class="friend-chat">' +
        '<img src="profile/default-avatar.png" alt="profile" />' +
        '<p>' + snapshot.val().message +'</p>'+
        '</div></div>').appendTo($('.mCSB_container')).addClass('new')
    }
    setTime();
    updateScrollBar();
  });
})

$('.btn-send').click(function() {
  if (name != "") {
    let txtBox = document.getElementById("chat").value

    if (txtBox != "") {
      let chat = document.getElementById("chat").value
      let input = document.getElementById("chat")
      let psmtp = DOMPurify.sanitize(chat);

      firebase.database().ref("messages").push().set({
        "message": psmtp,
        "sender": name
      });
      input.value = "";
      return false
    } else {
      alert("No text found please type your message")
    }
  } else {
    window.location.reload(false);
    alert("Please input your name.")
  }
});

function updateScrollBar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo',
    'bottom',
    {
      scrollInertia: 10,
      timeout: 0
    });
}

function setTime() {
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes() < 10 ? "0" + d.getMinutes(): d.getMinutes();
    h = d.getHours() % 12
    am_pm = d.getHours() >= 12 ? "PM": "AM";
    $('<label class="time">' + h + ' : ' + m + ' ' +  am_pm + '</label>').appendTo($('.mCSB_container'));
  }
}