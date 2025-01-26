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
                        if (key.startsWith("href")) {
                            element.href = paramValue;
                        } else if (key.startsWith("src")) {
                            if (key.startsWith("srcset")) {
                                element.srcset = paramValue;
                            } else {
                                element.src = paramValue;
                            }
                        } else {
                            element.innerHTML += paramValue;
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
            insert_component("mgmtcard", "mgmtcard", tempDiv);
            insert_component("storyyear", "storyyear", tempDiv);
            
            const navbuttons = document.getElementsByClassName("navbutton");
            let aktualnastrona = window.location.href;
            
            Array.from(navbuttons).forEach((button) => {
                if (button.href === aktualnastrona) {
                    if (button.id !== "logo") {
                        button.classList.add("navbutton-active");
                        button.classList.remove("navbutton-notactive");
                    }
                } else if (aktualnastrona.endsWith("/")) {
                    document.getElementById("nav-glowna").classList.add("navbutton-active");
                    document.getElementById("nav-glowna").classList.remove("navbutton-notactive");
                    button.classList.add("navbutton-notactive");
                } else {
                    button.classList.add("navbutton-notactive");
                    button.classList.remove("navbutton-active");
                }
            });
        })
        .catch(error => console.error("Error:", error));
        
        const observer = new MutationObserver((mutationsList, observer) => {
            const cards = document.querySelectorAll('card .card');
            const mgmtcards = document.querySelectorAll("mgmtcard .card");

            if (mgmtcards.length > 0) {
                mgmtcards.forEach(card => {
                    card.addEventListener('click', () => {
                        card.classList.toggle('flipped');
                    });
                });

                observer.disconnect();
            }
            
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
    
                observer.disconnect();
            }

        });
    
        observer.observe(document.body, { childList: true, subtree: true });
});

function displaymenu() {
    const phonemenu = document.getElementsByClassName("phonemenu")[0];
    if (phonemenu.style.display === "flex") {
        phonemenu.style.animation = "slideInFromLeft 0.5s ease";
        setTimeout(() => {
            phonemenu.style.display = "none";
            phonemenu.style.animation = "";
        }, 500);
    } else {
        phonemenu.style.display = "flex";
    }
}