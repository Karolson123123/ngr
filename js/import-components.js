Element.prototype.getAllParams = function() {
    const params = {};
    Array.from(this.attributes).forEach(attr => {
        if (attr.name !== 'id' && attr.name !== 'class' && attr.name !== 'style') {
            params[attr.name] = attr.value;
        }
    });
    return params;
};

const insert_component = (qcomponent, qtoreplace, tempDiv) => {
    const component = tempDiv.querySelector(qcomponent);
    const toreplace = document.querySelector(qtoreplace);
    
    if (toreplace !== null) {
        const params = toreplace.getAllParams();
    
        Object.keys(params).forEach(key => {
            const paramValue = params[key];
    
            if (key.startsWith('style-')) {
                const styleName = key.replace('style-', '');
                component.style[styleName] = paramValue;
            } else {
                const elements = component.querySelectorAll(`[data-param="${key}"]`);
                elements.forEach(element => {
                    element.innerHTML = paramValue;
                });

                const elementsStyle = component.querySelectorAll(`[data-style="${key}"]`);
                elementsStyle.forEach(element => {
                    element.style[key] = paramValue;
                });
            }
        });
    
        toreplace.parentNode.replaceChild(component, toreplace);
    }

};

document.addEventListener("DOMContentLoaded", function () {
    fetch("components.html")
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;

            insert_component("aside", "aside", tempDiv);
            insert_component("nav", "nav", tempDiv);
            insert_component("footer", "footer", tempDiv);
            insert_component("book", "book", tempDiv);
            
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

function displaymenu() {
    const phonemenu = document.getElementsByClassName("phonemenu")[0];
    if (phonemenu.style.display === "block") {
        phonemenu.style.display = "none";
    } else {
        phonemenu.style.display = "block";
    }
}