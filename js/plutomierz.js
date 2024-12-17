let echo_service;
append = function (text) {
    document.getElementById("websocket_events").insertAdjacentHTML('beforeend',
        "<li>" + text + ";</li>"
    );
}

const pluta = document.getElementById('pluta');
const activeUsers = document.getElementById('activeUsers');
const chat = document.getElementById('chat');
const gradient = document.getElementById('gradient');
const box = document.querySelector('.box');


window.onload = () => {
    echo_service = new WebSocket('wss://api.plutomierz.ovh/');
    echo_service.onmessage = function (event) {
        append(event.data)
        let data = JSON.parse(event.data)
        if (data.type === "pluta") {
            pluta.innerHTML = data.value;
            let parsedPlutaValue = data.value;
            
            const plutaColor = [
                {color: "red", minValue: -75, maxValue: -20, dialValue: 0},
                {color: "yellow", minValue: -20, maxValue: 10, dialValue: 55},
                {color: "green", minValue: 10, maxValue: 35, dialValue: 80},
                {color: "darkgreen", minValue: 35, maxValue: 75, dialValue: 100},
            ]

            const isPlutaLevelCritical = parsedPlutaValue > 45;

            const minPluta = -30
            const maxPluta = 50

            const indicatorAngle = ((parsedPlutaValue - maxPluta) / (minPluta - maxPluta)) * 180;

            const radius = 100;
            const centerX = 150;
            const centerY = 150;
            const x2 = centerX + radius * Math.cos((indicatorAngle * Math.PI) / 180);
            const y2 = centerY - radius * Math.sin((indicatorAngle * Math.PI) / 180);

            let halo = plutaColor.map((color, key) => {
                return `<stop offset='${color.dialValue}%' stop-color='${color.color}' />`
            });

            box.innerHTML = /*html*/`
            <svg className="canvas" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 50 150 A 100 100 0 1 1 250 150"
                    stroke="url(#gradient)"
                    stroke-width="20"
                    fill="none"
                    stroke-linecap="round"
                />
                <line
                    x1="150"
                    y1="150"
                    x2="${x2}"
                    y2="${y2}"
                    stroke="black"
                    stroke-width="8"
                    stroke-linecap="round"
                />
                <circle cx="150" cy="150" r="5" fill="black"/>
                <defs>
                    <linearGradient id="gradient" gradientTransform="rotate(0)">
                        ${halo[0]}
                        ${halo[1]}
                        ${halo[2]}
                        ${halo[3]}
                    </linearGradient>
                </defs>
            </svg>
            `;

        }
        if (data.type === "activeUsers") {
            activeUsers.innerHTML = data.count;
        }
        if (data.type === "history") {
            data.messages.forEach(message => {
                let czas = new Date(message.timestamp);
                let minuty = czas.getMinutes();
                let godziny = czas.getHours();
                let dzien = czas.getDay();
                let miesiac = czas.getMonth();
                let rok = czas.getFullYear();
                chat.innerHTML += /*html*/`
                <div class="message">
                    <div class="message-top">
                        <h5>${message.username}</h5>
                        <p>${godziny}:${minuty < 10 ? "0"+minuty : minuty} &bullet; ${dzien < 10 ? "0"+dzien : dzien}.${miesiac < 10 ? "0"+miesiac : miesiac}.${rok}</p>
                    </div>
                    <div class="message-bottom">
                        <p>${message.text}</p>
                    </div>
                </div>
                `;                
            });
        }
        if (data.type === "message") {
            chat.innerHTML += /*html*/`
            <div class="message">
                <div class="message-top">
                    <h5>${data.message.username}</h5>
                    <p>${data.message.timestamp}</p>
                </div>
                <div class="message-bottom">
                    <p>${data.message.text}</p>
                </div>
            </div>
            `;
        }
    }
    echo_service.onopen = function () {
        append("Connected to WebSocket!");
    }
    echo_service.onclose = function () {
        append("Connection closed");
    }
    echo_service.onerror = function () {
        append("Error happens");
    }
}

function sendMessage(event) {
    console.log(event)
    let message = document.getElementById("message").value;
    echo_service.send(message);
}
