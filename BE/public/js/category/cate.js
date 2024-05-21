function toggleSubmenu(id) {
  const submenu = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);
  if (submenu.classList.contains('max-h-0')) {
    submenu.classList.remove('max-h-0');
    submenu.classList.add('max-h-screen');
    icon.classList.add('rotate-180');
  } else {
    submenu.classList.remove('max-h-screen');
    submenu.classList.add('max-h-0');
    icon.classList.remove('rotate-180');
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
}

// Close the modal when the ESC key is pressed
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
