document.addEventListener('DOMContentLoaded', function() {
  // Menú hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const menuUl = document.querySelector('nav.menu ul');
  menuToggle.onclick = () => menuUl.classList.toggle('open');

  // Animación de bajada del título
  const titulo = document.querySelector('.hero h1');
  if (titulo) {
    setTimeout(() => {
      titulo.style.opacity = 1;
      titulo.style.transform = 'translateY(0)';
    }, 300);
  }

  // Slider automático y manual
  const slides = document.querySelectorAll('.slider .slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let current = 0;
  let sliderInterval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function startAutoSlide() {
    sliderInterval = setInterval(nextSlide, 4000); // 4 segundos
  }

  function stopAutoSlide() {
    clearInterval(sliderInterval);
  }

  if (prevBtn && nextBtn && slides.length) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
    showSlide(current);
    startAutoSlide();
  }

  // Cambiar imagen principal al hacer clic en miniaturas
  const miniaturas = document.querySelectorAll('.mini-galeria img');
  const imagenPrincipal = document.getElementById('imagenPrincipal');
  miniaturas.forEach(img => {
    img.addEventListener('click', () => {
      imagenPrincipal.src = img.src;
      imagenPrincipal.alt = img.alt;
    });
  });

  // Lightbox
  const galeriaImgs = document.querySelectorAll('.galeria-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galeriaImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      // Busca el figcaption asociado
      const figcaption = img.parentElement.querySelector('figcaption');
      lightboxCaption.textContent = figcaption ? figcaption.textContent : img.alt;
      lightbox.style.display = 'flex';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  });

  // Cerrar lightbox al hacer click fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  });

  // Modal de publicidad (aparece solo una vez por sesión)
  const modal = document.getElementById('modalPublicidad');
  const cerrar = document.getElementById('cerrarModal');
  if (!sessionStorage.getItem('publiMostrada')) {
    setTimeout(() => { modal.style.display = 'flex'; }, 2000); // Aparece a los 2 segundos
    sessionStorage.setItem('publiMostrada', 'yes');
  }
  cerrar.onclick = function() {
    modal.style.display = 'none';
  };
  // Cerrar al hacer click fuera del modal
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Notificación tipo toast para promociones (aparece solo una vez por sesión)
  const toast = document.getElementById('toastPromo');
  const toastClose = document.getElementById('toastClose');
  if (toast && toastClose && !sessionStorage.getItem('toastPromoMostrada')) {
    setTimeout(() => { toast.style.display = 'flex'; }, 2000); // Aparece a los 2 segundos
    sessionStorage.setItem('toastPromoMostrada', 'yes');
  }
  if (toastClose) {
    toastClose.onclick = function() {
      toast.style.display = 'none';
    };
  }

  // Filtros de galería
  document.querySelectorAll('.galeria-filtros button').forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll('.galeria-filtros button').forEach(b => b.classList.remove('filtro-activo'));
      btn.classList.add('filtro-activo');
      const filtro = btn.getAttribute('data-filtro');
      document.querySelectorAll('.galeria-grid figure').forEach(fig => {
        fig.style.display = (filtro === 'todas' || fig.dataset.categoria === filtro) ? '' : 'none';
      });
    };
  });
});