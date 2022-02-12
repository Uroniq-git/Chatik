const socket = io();


let msg_box = document.querySelector('#msg-box');
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

colors = [
    "rgba(0, 194, 255, 0.53)",
    "rgba(0, 255, 56, 0.53)",
    "rgba(255, 46, 0, 0.53)",
    "rgba(255, 168, 0, 0.53)",
    "rgba(0, 117, 255, 0.53)",
    "rgba(250, 0, 255, 0.53)"
]
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let color = colors[getRandomInt(0, 5)]
document.cookie = `name=user`

function popup_accept() {
    let name = document.getElementById('popup-input').value
    document.cookie = `name=${name}`



    let popup = document.getElementsByClassName("popup")[0]
    popup.style.display = "none"
}

socket.on("connect", () => {
    console.log(socket.connected);
});

socket.on("print_msg", (name, text, color) => {
    let msg_container = document.createElement("div");
    msg_container.className = "msg-container"
    msg_box.appendChild(msg_container)

    //<div class="msg-user-name">Юзер</div>
    let msg_user_name = document.createElement("div");
    msg_user_name.className = "msg-user-name"
    msg_user_name.innerHTML = name
    msg_container.appendChild(msg_user_name)

    //<div class="msg-text-container">
    //          <div class="msg-text">Всем привет!</div>
    //</div>
    let text_cont = document.createElement("div");
    text_cont.className = "msg-text-container"
    text_cont.style.backgroundColor = color
    msg_container.appendChild(text_cont)

    let texts = document.createElement("div");
    texts.className = "msg-text"
    texts.innerHTML = text
    text_cont.appendChild(texts)
});

function msg_send() {
    let name = getCookie("name")
    let msg_text = document.getElementById('msg-input').value
    socket.emit('get_msg', name, msg_text, color)
    //socket.emit("test", 1);
    document.getElementById("msg-input").value = "";
}