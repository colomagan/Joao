// Inicializa AOS si está presente (ya lo usas en el sitio)
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 700, offset: 80 });
}

// Acordeón simple para el FAQ
(function () {
  var items = document.querySelectorAll('.consultas-accordion .item .q');
  items.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var open = document.querySelector('.consultas-accordion .item.open');
      if (open && open !== item) open.classList.remove('open');
      item.classList.toggle('open');
    });
  });
})();
