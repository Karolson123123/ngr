const main = document.getElementById('main');
const kropeczki = document.getElementById('kropeczki');

let ileimg = main.childElementCount;
let kropeczkilist = [];

for (let i = 0; i < ileimg; i++) {
    const link = document.createElement('div');
    link.href = `#${main.children[i].id}`;
    if (i === 0) {
        link.classList.add('kropeczka-active');
    }
    
    kropeczki.appendChild(link);
    
    kropeczkilist.push(link);
}

kropeczkilist.forEach((kropeczka, index) => {
    kropeczka.addEventListener("click", (e) => {
        e.preventDefault();
        main.children[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
        
        if (!kropeczka.classList.contains("kropeczka-active")) {
            kropeczkilist.forEach((kropa) => {
                kropa.classList.remove("kropeczka-active");
            })
            kropeczka.classList.add("kropeczka-active");
        }
    });
});