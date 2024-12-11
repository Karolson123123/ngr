let countDownDate = new Date("Mar 2, 2025 00:00:00").getTime();

let x = setInterval(function() {
  let now = new Date().getTime();
  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = `<div><div>${days} dni</div><div>${hours} h</div><div>${minutes} m</div><div>${seconds} s</div></div>`;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);



document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');

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
});


document.addEventListener("DOMContentLoaded", function() {
  const scrollToTopButton = document.getElementById('scrollToTop');

  window.addEventListener('scroll', function() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          scrollToTopButton.classList.add('show');
      } else {
          scrollToTopButton.classList.remove('show');
      }
  });

  scrollToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});