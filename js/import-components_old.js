const insert_component = (qcomponent, qtoreplace, tempDiv) => {
    const component = tempDiv.querySelector(qcomponent);
    const toreplace = document.querySelector(qtoreplace);
    toreplace.parentNode.replaceChild(component, toreplace);
};

document.addEventListener("DOMContentLoaded", function () {
    fetch("components.html")
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;
            insert_component("nav", "nav", tempDiv);
            insert_component("footer", "footer", tempDiv);
            
    const navbuttons = document.getElementsByClassName("navbutton");
    let aktualnastrona = window.location.href;
    
    Array.from(navbuttons).forEach((button) => {
            if (button.href === aktualnastrona) {
                button.classList.add("navbutton-active");
                button.classList.remove("navbutton-notactive");
            } else {
                button.classList.add("navbutton-notactive");
                button.classList.remove("navbutton-active");
            }
        });
    })
    .catch(error => console.error("Error:", error));
});