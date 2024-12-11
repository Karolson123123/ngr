const replace = (qcomponent, qtoreplace, tempDiv) => {
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
            replace("nav", "nav", tempDiv);
            replace("footer", "footer", tempDiv);
        })
        .catch(error => console.error("Error fetching and parsing HTML:", error));
});




function displaymenu(){
    
}