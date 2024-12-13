const main = document.getElementById('main');
const kropeczki = document.getElementById('kropeczki');

let ileimg = main.childElementCount;
let kropeczkilist = [];
let currentIndex = 0;

for (let i = 0; i < ileimg; i++) {
    const link = document.createElement('div');
    link.href = `#${main.children[i].id}`;
    if (i === 0) {
        link.classList.add('kropeczka-active');
    }

    kropeczki.appendChild(link);

    kropeczkilist.push(link);
}

let autoScrollInterval = setInterval(autoScroll, 6000);

kropeczkilist.forEach((kropeczka, index) => {
    kropeczka.addEventListener("click", () => {
        main.scrollTo({
            left: main.children[index].offsetLeft,
            behavior: "smooth"
        });

        if (!kropeczka.classList.contains("kropeczka-active")) {
            kropeczkilist.forEach((kropa) => {
                kropa.classList.remove("kropeczka-active");
            });
            kropeczka.classList.add("kropeczka-active");
        }

        currentIndex = index;

        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(autoScroll, 6000);
    });
});

function autoScroll() {
    currentIndex = (currentIndex + 1) % ileimg;

    main.scrollTo({
        left: main.children[currentIndex].offsetLeft,
        behavior: "smooth"
    });

    kropeczkilist.forEach((kropa, index) => {
        kropa.classList.remove("kropeczka-active");
        if (index === currentIndex) {
            kropa.classList.add("kropeczka-active");
        }
    });
}