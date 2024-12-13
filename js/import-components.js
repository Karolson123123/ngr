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

        alltoreplace.forEach((torep) => {
            const clonedComponent = component.cloneNode(true);
            const params = torep.getAllParams();

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
                        } else if (key === "src") {
                            element.src = paramValue;
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
            insert_component("card", "card", tempDiv);
            
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
        
        const observer = new MutationObserver((mutationsList, observer) => {
            // Check if any <card> elements have been added to the DOM
            const cards = document.querySelectorAll('card .card');
            
            if (cards.length > 0) {    
                cards.forEach(card => {
                    card.addEventListener('mouseenter', function() {
                        const cardInfo = this.querySelector('.card-info');
                        this.dataset.originalText = cardInfo.querySelector('.title').textContent;
                        cardInfo.querySelector('.title').textContent = "Kliknij, aby zobaczyć profil";
        
                        const arrowElement = document.createElement('div');
                        arrowElement.classList.add('arrow-down');
                        cardInfo.querySelector('.title').appendChild(arrowElement);
                    });
        
                    card.addEventListener('mouseleave', function() {
                        const cardInfo = this.querySelector('.card-info');
                        cardInfo.querySelector('.title').textContent = this.dataset.originalText;
        
                        const arrowElement = cardInfo.querySelector('.arrow-down');
                        if (arrowElement) {
                            arrowElement.remove();
                        }
                    });
                });
    
                // Once the elements are found, stop observing
                observer.disconnect();
            }
        });
    
        observer.observe(document.body, { childList: true, subtree: true });
});

function displaymenu() {
    const phonemenu = document.getElementsByClassName("phonemenu")[0];
    if (phonemenu.style.display === "block") {
        phonemenu.style.display = "none";
    } else {
        phonemenu.style.display = "block";
    }
}