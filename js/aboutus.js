// Obrót kartą po kliknięciu

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

const team = document.getElementById('team');

function rozwin(element) {
    const dorozwiniecia = element.querySelector("div");
    const plus = element.querySelector(".plusik");

    // let source = plus.src;
    // let halo = "http://localhost:5500/aboutus.html"
    // halo = halo.split("/")
    // console.log(halo)
    // let halox = halo[-2]+"/"+halo[-1]
    // console.log(halox)
    // source = source.


    if (source === "img_vid/plus.svg") {
        plus.src = "img_vid/minus.svg";
    } else {
        plus.src = "img_vid/plus.svg";
    }

    if (dorozwiniecia.style.display === "none") {
        dorozwiniecia.style.display = "flex";
    } else {
        dorozwiniecia.style.display = "none";
    }
}