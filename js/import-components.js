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
    const toreplace = document.querySelectorAll(qtoreplace);

    if (toreplace !== null) {
        const alltoreplace = Array.from(toreplace);
        console.log(alltoreplace);

        alltoreplace.forEach((torep) => {
            const clonedComponent = component.cloneNode(true);
            const params = torep.getAllParams();
            
            console.log(params);

            Object.keys(params).forEach(key => {
                const paramValue = params[key];
        
                if (key.startsWith('style-')) {
                    const styleName = key.replace('style-', '');
                    clonedComponent.style[styleName] = paramValue;
                } else {
                    const elements = clonedComponent.querySelectorAll(`[data-param="${key}"]`);
                    elements.forEach(element => {
                        if (key === "href") {
                            element.href = paramValue;
                        } else {
                            element.innerHTML = paramValue;
                        }
                    });
    
                    const elementsStyle = clonedComponent.querySelectorAll(`[data-style="${key}"]`);
                    elementsStyle.forEach(element => {
                        element.style[key] = paramValue;
                    });
                }
            });
        
            torep.parentNode.replaceChild(clonedComponent, torep);
        });
    }

};

document.addEventListener("DOMContentLoaded", () => {
    fetch("components.html")
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data;

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