let echo_service;

const pluta = document.getElementById('pluta');
const activeUsers = document.getElementById('activeUsers');
const chat = document.getElementById('chat');
const usernameInput = document.getElementById('username');
const textmessageInput = document.getElementById('textmessage');
const sendMessageButton = document.getElementById('sendMessageButton');
const motivationalPlutaContainer = document.getElementById('motivationalPluta');
const box = document.querySelector('.box');
const main = document.querySelector("main");
let zamowienie = 0;


window.onload = () => {
    echo_service = new WebSocket('wss://api.plutomierz.ovh/');
    echo_service.onmessage = (event) => {
        let data = JSON.parse(event.data)
        if (data.type === "pluta") {
            pluta.textContent = data.value;
            let parsedPlutaValue = data.value;
            
            const plutaColor = [
                {color: "red", minValue: -75, maxValue: -20, dialValue: 0},
                {color: "yellow", minValue: -20, maxValue: 10, dialValue: 55},
                {color: "green", minValue: 10, maxValue: 35, dialValue: 80},
                {color: "darkgreen", minValue: 35, maxValue: 75, dialValue: 100},
            ];

            const isPlutaLevelCritical = parsedPlutaValue > 45;

            const minPluta = -30
            const maxPluta = 50

            const indicatorAngle = ((parsedPlutaValue - maxPluta) / (minPluta - maxPluta)) * 180;

            const radius = 100;
            const centerX = 150;
            const centerY = 150;
            const x2 = centerX + radius * Math.cos((indicatorAngle * Math.PI) / 180);
            const y2 = centerY - radius * Math.sin((indicatorAngle * Math.PI) / 180);

            let gradientStops = plutaColor.map((color) => {
                return `<stop offset='${color.dialValue}%' stop-color='${color.color}' />`;
            });

            box.innerHTML = /*html*/`
            <svg className="canvas" viewBox="-100 0 500 200"  xmlns="http://www.w3.org/2000/svg">
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
                        ${gradientStops[0]}
                        ${gradientStops[1]}
                        ${gradientStops[2]}
                        ${gradientStops[3]}
                    </linearGradient>
                </defs>
            </svg>
            `;

        }
        if (data.type === "activeUsers") {
            activeUsers.textContent = data.count;
        }
        if (data.type === "history") {
            data.messages.forEach(message => {
                let czas = new Date(message.timestamp);
                let minuty = czas.getMinutes();
                let godziny = czas.getHours();
                let dzien = czas.getDate();
                let miesiac = czas.getMonth() + 1;
                let rok = czas.getFullYear();
                
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.style.order = zamowienie;
        
                const messageTop = document.createElement('div');
                messageTop.classList.add('message-top');
                
                const usernameElement = document.createElement('h5');
                usernameElement.textContent = message.username;
                
                const timestampElement = document.createElement('p');
                timestampElement.textContent = `${godziny < 10 ? "0" + godziny : godziny}:${minuty < 10 ? "0" + minuty : minuty} • ${dzien < 10 ? "0" + dzien : dzien}.${miesiac < 10 ? "0" + miesiac : miesiac}.${rok}`;
                
                messageTop.appendChild(usernameElement);
                messageTop.appendChild(timestampElement);
        
                const messageBottom = document.createElement('div');
                messageBottom.classList.add('message-bottom');
        
                const textElement = document.createElement('p');
                textElement.textContent = message.text;
        
                messageBottom.appendChild(textElement);
        
                messageElement.appendChild(messageTop);
                messageElement.appendChild(messageBottom);
        
                chat.appendChild(messageElement);
                zamowienie--;
            });
        }
        
        if (data.type === "message") {
            let czas = new Date(data.message.timestamp);
            let minuty = czas.getMinutes();
            let godziny = czas.getHours();
            let dzien = czas.getDate();
            let miesiac = czas.getMonth() + 1;
            let rok = czas.getFullYear();
        
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.style.order = zamowienie;
        
            const messageTop = document.createElement('div');
            messageTop.classList.add('message-top');
            
            const usernameElement = document.createElement('h5');
            usernameElement.textContent = data.message.username;
            
            const timestampElement = document.createElement('p');
            timestampElement.textContent = `${godziny < 10 ? "0" + godziny : godziny}:${minuty < 10 ? "0" + minuty : minuty} • ${dzien < 10 ? "0" + dzien : dzien}.${miesiac < 10 ? "0" + miesiac : miesiac}.${rok}`;
            
            messageTop.appendChild(usernameElement);
            messageTop.appendChild(timestampElement);
        
            const messageBottom = document.createElement('div');
            messageBottom.classList.add('message-bottom');
        
            const textElement = document.createElement('p');
            textElement.textContent = data.message.text;
        
            messageBottom.appendChild(textElement);
        
            messageElement.appendChild(messageTop);
            messageElement.appendChild(messageBottom);
        
            chat.appendChild(messageElement);
            zamowienie--;
        }
        
    }
    echo_service.onopen = function () {
        // console.log("Połączenie z plutomierzem nawiązane");
    }
    echo_service.onclose = function () {
        console.log("Połączenie z plutomierzem zamknięte");
    }
    echo_service.onerror = function () {
        main.innerHTML = /*html*/`
        <div class="plutaError">
            <h5>Marek napraw!</h5>
            <h1>Połączenie z plutomierzem zawiodło :c</h1>
            <h3>To jest zamach na Frankiego!!!<h3></h3>
        </div>
        `;
    }
}

function sendMessage() {
    let usernameToSend = usernameInput.value;
    let textToSend = textmessageInput.value;
    let dateToSend = new Date();
    dateToSend = dateToSend.toISOString();
    let plutaMinLength = 2;
    let plutaMaxLength = 16;
    let textMinLength = 0;
    let textMaxLength = 200;

    if (usernameToSend.length <= plutaMinLength ||
        usernameToSend.length >= plutaMaxLength ||
        textToSend.length <= textMinLength ||
        textToSend.length >= textMaxLength) {
        if (usernameToSend.length <= plutaMinLength || usernameToSend.length >= plutaMaxLength) {
            alert(("Nazwa Pluty musi mieć długość od " + plutaMinLength + " do " + plutaMaxLength + " znaków. (Tak jest to przedział otwarty)"));
        }
        if (textToSend.length <= textMinLength || textToSend.length >= textMaxLength) {
            alert(("Wiadomość Plutonowa musi mieć długość od " + textMinLength + " do " + textMaxLength + " znaków. (Tak jest to przedział otwarty)"));
        }
    } else {
        textmessageInput.value = "";
        let message = {
            "username": usernameToSend,
            "text": textToSend,
            "timestamp": dateToSend,
        }
        // "sentFrom": "ngr"
        echo_service.send(JSON.stringify(message));
    }
}

fetch('/img_vid/motivationalPluta.json')
  .then(response => response.json())
  .then(motivationalPluta => {
    let randomMotivationalPluta = motivationalPluta[Math.floor(Math.random() * motivationalPluta.length)];
    motivationalPlutaContainer.innerHTML = randomMotivationalPluta;
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
