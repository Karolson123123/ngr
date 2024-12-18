// Obrót kartą po kliknięciu

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

const historia = {
    '2022': {
        "title": "Pierwszy krok (ćwierćfinał jako DJW)",
        "description": "Ngineers, wówczas występujący pod nazwą DJW, po raz pierwszy wzięli udział w prestiżowym ZSŁ LoLCup. Był to rok nauki i zbierania doświadczeń. Mimo trudności i potknięć, drużyna zaskoczyła wszystkich, docierając aż do ćwierćfinału. To osiągnięcie stało się fundamentem, na którym zaczęli budować swoje dalsze sukcesy.",
        "img": "img_vid/djw.webp"
    },
    '2023': {
        "title": "Faza grupowa (jako J00R)" ,
        "description": "W kolejnym roku drużyna przeszła transformację, przyjmując nową nazwę – J00R. Choć ich ambicje były ogromne, turniej nie potoczył się zgodnie z ich planem. Ngineers zakończyli rywalizację na etapie fazy grupowej, ale nie załamali się. Każda porażka stała się cenną lekcją, która przygotowała ich na przyszłe wyzwania.",
        "img": "img_vid/j00r.webp"
    },
    '2024': {
        "title": "Spektakularny powrót (4. miejsce)",
        "description": "Pod nazwą Ngineers drużyna wróciła silniejsza niż kiedykolwiek. Rok 2024 był przełomowy – ich zgranie, strategia i zaangażowanie zaprowadziły ich na 4. miejsce w turnieju. To był czas triumfu i uznania, ale również niedosyt, który napędzał ich do dalszego działania.",
        "img": "img_vid/ngr.webp"

    },
    '2025': {
        "title": "Przyszłość pełna tajemnic 🤫🤫🤫",
        "description": "O tegorocznych planach i przygotowaniach drużyna milczy, co budzi ogromne zainteresowanie wśród fanów i konkurencji. Czy Ngineers mają w zanadrzu nową strategię? Czy po cichu szykują się na finałowy triumf? Rok 2025 może być dla nich momentem, w którym na zawsze zapiszą się w historii ZSŁ LoLCup.",
        "img": "img_vid/ngr.webp"
    }
}

function rozwin(element) {
    element = element.parentElement;
    const dorozwiniecia = element.querySelector("div");
    const plus = element.querySelector(".plusik");

    let source = plus.src;
    source = source.split("/");
    source = source[source.length-2]+"/"+source[source.length-1];

    if (source === "img_vid/plus.svg") {
        plus.src = "img_vid/minus.svg";
    } else {
        plus.src = "img_vid/plus.svg";
    }
    
    if (dorozwiniecia.style.display === "flex") {
        dorozwiniecia.style.animation = "slideInFromBottom2 0.3s ease";
        setTimeout(()=>{
            dorozwiniecia.style.display = "none";
            dorozwiniecia.style.animation = "slideInFromTop2 0.3s ease";
        }, 150);
    } else {
        dorozwiniecia.style.display = "flex";
    }
}

const yearcontenttext = document.getElementById('year-content-text');
const yearcontenttitle = document.querySelector('#year-content-text > h3');
const yearcontentdescription = document.querySelector('#year-content-text > p');
const yearcontentimg = document.getElementById('year-content-img');
const allyears = Array.from(document.querySelectorAll('.year'));

const slideHistory = () => {
    const activeyear = document.querySelector('.year-active');
    let currentindex = allyears.indexOf(activeyear);
    let nextindex = currentindex+1%allyears.length < allyears.length ? currentindex+1 : 0;
    
    allyears.forEach((year, index) => {
        if (index === nextindex) {
            year.click();
        }
    });
}

const changeHistoryYear = (element) => {
    let theSameClicked = element.classList.contains("year-active");
    allyears.forEach((year) => {
        if (year.classList.contains("year-active")) {
            year.classList.remove("year-active");
        }
    });

    const childh1 = element.children[0];

    element.classList.add("year-active");
    yearcontenttitle.innerHTML = historia[childh1.innerHTML].title;
    yearcontentdescription.innerHTML = historia[childh1.innerHTML].description;
    yearcontentimg.style.backgroundImage = `url(${historia[childh1.innerHTML].img})`;
    // Reset paska - Usuwam tą funkcjonalność, bo powoduje buga
    if (!theSameClicked) {
        clearInterval(slideInterval);
        slideInterval = setInterval(slideHistory, 40000);
    }
}

let slideInterval = setInterval(slideHistory, 40000);