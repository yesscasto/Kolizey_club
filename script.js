// Добавьте в script.js
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Заявка отправлена! Мы свяжемся с вами в течение дня.');
  this.reset();
});

function updateCountdown() {
  const now = new Date();
  const nextSession = new Date();
  
  nextSession.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
  nextSession.setHours(19, 0, 0, 0);

  const diff = nextSession - now;
  
  const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const secs = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

  document.getElementById('countdown').textContent = `${hours}:${mins}:${secs}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Обновите script.js
document.querySelectorAll('.tab-content img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      cursor: zoom-out;
    `;
    
    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.style.maxHeight = '90vh';
    
    lightbox.appendChild(fullImg);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', () => lightbox.remove());
  });
});