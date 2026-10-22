// Функция за отваряне на демо модала за плащане
function openPaymentModal() {
  const modalElement = document.getElementById('paymentModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

// Функция за обработка на демо плащането
function processDemoPayment(event) {
  event.preventDefault();
  
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.innerHTML = 'Обработва се... ⏳';
  }

  setTimeout(() => {
    // Затваряме модала
    const modalEl = document.getElementById('paymentModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }
    }

    // Заменяме катинара с реалното премиум видео
    const lockedVideo = document.getElementById('locked-video');
    const unlockedVideo = document.getElementById('unlocked-video');
    const premiumIframe = document.getElementById('premium-iframe');

    if (lockedVideo) lockedVideo.classList.add('d-none');
    if (unlockedVideo) unlockedVideo.classList.remove('d-none');
    
    // Слагаме линк към видеото
    if (premiumIframe) {
      premiumIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    }

    alert("🎉 Успешно плащане! Премиум видеото е отключено.");
  }, 1500);
}