// Obrót kartą po kliknięciu

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

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

