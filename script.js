// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initScrollEffects();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initBackToTop();
    initHeaderScroll();
    initTypingEffect();
    initStoriesCarousel();
});

// Configuración de historias - Aquí puedes agregar nuevas historias fácilmente
const storiesData = [
    {
        id: 'transformando-espacios',
        title: '🌟 Transformando Espacios, Elevando Experiencias 🌟',
        date: 'Diciembre 2024',
        intro: 'Nos complace compartir el impresionante trabajo realizado por nuestro equipo de Aseo de Grupo Delega en la tienda de Provimarket en la hermosa Quinta Región. 🛒✨',
        folder: 'transformandoespacios',
        imageCount: 8,
        description: '📸 En las imágenes pueden ver el lavado y encerado que hemos llevado a cabo, dejando el espacio no solo limpio, sino también brillante y acogedor para todos los clientes. ¡La primera impresión cuenta y estamos aquí para asegurarnos de que sea la mejor!',
        highlights: {
            title: '🔧 ¿Por qué elegir Grupo Delega?',
            items: [
                'Expertos en Aseo: Nuestro equipo está altamente capacitado y utiliza productos de calidad para garantizar resultados excepcionales.',
                'Servicios Personalizados: Nos adaptamos a las necesidades específicas de cada cliente, ofreciendo soluciones que se ajustan a su presupuesto y requerimientos.',
                'Compromiso con la Sostenibilidad: Utilizamos técnicas y productos que son amigables con el medio ambiente, porque cuidar nuestro planeta es una prioridad.'
            ]
        },
        ctaText: 'Contáctanos hoy mismo y descubre cómo podemos ayudarte'
    }
    // Aquí puedes agregar más historias siguiendo el mismo formato:
    /*
    {
        id: 'nueva-historia',
        title: 'Título de la nueva historia',
        date: 'Mes Año',
        intro: 'Introducción de la historia...',
        folder: 'nombre-carpeta-imagenes',
        imageCount: 6, // Número de imágenes (1.jpg, 2.jpg, etc.)
        description: 'Descripción detallada...',
        highlights: {
            title: 'Puntos destacados:',
            items: [
                'Punto 1',
                'Punto 2',
                'Punto 3'
            ]
        },
        ctaText: 'Texto del botón de llamada a la acción'
    }
    */
];

// Variables del carrusel
let currentStoryIndex = 0;
let autoSlideInterval;
let currentImageIndex = {}; // Para rastrear la imagen actual de cada historia

// Función para generar el HTML de una historia
function generateStoryHTML(story, index) {
    // Inicializar índice de imagen para esta historia
    currentImageIndex[story.id] = 0;
    
    const imagesHTML = Array.from({length: story.imageCount}, (_, i) => {
        const imageNum = i + 1;
        const isActive = i === 0 ? 'active' : '';
        return `<img src="img/historias/${story.folder}/${imageNum}.jpg" alt="Imagen ${imageNum}" class="thumbnail ${isActive}" onclick="changeStoryImage('${story.id}', ${i})" tabindex="0">`;
    }).join('');
    
    const highlightsHTML = story.highlights.items.map(item => `<li>${item}</li>`).join('');
    
    return `
        <div class="story-card" data-story-id="${story.id}">
            <div class="story-header">
                <h3 class="story-title">${story.title}</h3>
                <span class="story-date">${story.date}</span>
            </div>
            
            <div class="story-content">
                <p class="story-intro">${story.intro}</p>
                
                <div class="story-gallery">
                    <div class="gallery-main">
                        <img id="mainImage-${story.id}" src="img/historias/${story.folder}/1.jpg" alt="${story.title}" class="main-image">
                    </div>
                    <div class="gallery-thumbnails">
                        ${imagesHTML}
                    </div>
                </div>
                
                <div class="story-description">
                     <p>${story.description}</p>
                     
                     <div class="story-highlights">
                         <h4>${story.highlights.title}</h4>
                         <ul>
                             ${highlightsHTML}
                         </ul>
                     </div>
                     
                     <p class="story-final-message">👉 Si buscas un servicio de aseo que no solo cumpla, sino que supere tus expectativas, ¡no dudes en contactarnos! Transformemos juntos tus espacios y brindemos a tus clientes la experiencia que merecen.</p>
                 </div>
                 
                 <div class="story-cta">
                     <a href="#contacto" class="story-btn">${story.ctaText}</a>
                 </div>
            </div>
        </div>
    `;
}

// Función para cambiar imagen dentro de una historia
function changeStoryImage(storyId, imageIndex) {
    const story = storiesData.find(s => s.id === storyId);
    if (!story) return;
    
    const mainImage = document.getElementById(`mainImage-${storyId}`);
    const thumbnails = document.querySelectorAll(`[data-story-id="${storyId}"] .thumbnail`);
    
    // Actualizar imagen principal
    const imageNum = imageIndex + 1;
    mainImage.src = `img/historias/${story.folder}/${imageNum}.jpg`;
    
    // Actualizar thumbnails activos
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === imageIndex);
    });
    
    // Guardar índice actual
    currentImageIndex[storyId] = imageIndex;
}

// Función para generar indicadores del carrusel
function generateIndicators() {
    return storiesData.map((_, index) => 
        `<div class="indicator ${index === 0 ? 'active' : ''}" onclick="goToStory(${index})"></div>`
    ).join('');
}

// Función para ir a una historia específica
function goToStory(index) {
    if (index < 0 || index >= storiesData.length) return;
    
    currentStoryIndex = index;
    updateCarousel();
    updateIndicators();
    resetAutoSlide();
}

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const translateX = -currentStoryIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
}

// Función para actualizar indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentStoryIndex);
    });
}

// Función para ir a la siguiente historia
function nextStory() {
    currentStoryIndex = (currentStoryIndex + 1) % storiesData.length;
    updateCarousel();
    updateIndicators();
}

// Función para ir a la historia anterior
function prevStory() {
    currentStoryIndex = currentStoryIndex === 0 ? storiesData.length - 1 : currentStoryIndex - 1;
    updateCarousel();
    updateIndicators();
}

// Función para iniciar el auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextStory, 7000); // Cambia cada 7 segundos
}

// Función para resetear el auto-slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Función para pausar el auto-slide
function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Función para inicializar el carrusel de historias
function initStoriesCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carouselTrack) return;
    
    // Generar HTML de todas las historias
    carouselTrack.innerHTML = storiesData.map(generateStoryHTML).join('');
    
    // Generar indicadores
    carouselIndicators.innerHTML = generateIndicators();
    
    // Agregar event listeners a los botones
    prevBtn.addEventListener('click', () => {
        prevStory();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextStory();
        resetAutoSlide();
    });
    
    // Pausar auto-slide cuando el mouse está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Agregar funcionalidad de teclado a las miniaturas
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('thumbnail')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Iniciar auto-slide
    startAutoSlide();
    
    console.log(`Carrusel de historias inicializado con ${storiesData.length} historia(s)`);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('industries-grid') ||
                    entry.target.classList.contains('team-grid')) {
                    
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.section-header, .about-card, .service-card, .industry-card, .team-member, .contact-card, .services-grid, .industries-grid, .team-grid').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Animations
function initAnimations() {
    // Set initial state for grid items
    document.querySelectorAll('.service-card, .industry-card, .team-member').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number, .result-number');
    
    const countObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                animateCounter(entry.target);
                // Dejar de observar después de animar para evitar re-animaciones
                countObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '0px 0px -50px 0px'
    });
    
    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });
}

// Counter Animation
function animateCounter(element) {
    // Evitar animaciones duplicadas
    if (element.dataset.animated === 'true') {
        return;
    }
    
    element.dataset.animated = 'true';
    const originalText = element.textContent;
    const target = parseInt(originalText.replace(/\D/g, ''));
    
    if (isNaN(target) || target === 0) {
        return;
    }
    
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Usar easing para una animación más suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        // Preservar el formato original (con % o +)
        if (originalText.includes('%')) {
            element.textContent = current + '%';
        } else if (originalText.includes('+')) {
            element.textContent = current + '+';
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Asegurar que llegue al valor final exacto
            if (originalText.includes('%')) {
                element.textContent = target + '%';
            } else if (originalText.includes('+')) {
                element.textContent = target + '+';
            } else {
                element.textContent = target;
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

// Form Validation
function validateForm(data) {
    let isValid = true;
    const form = document.querySelector('.form');
    
    // Remove previous error messages
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    
    // Validate required fields
    Object.keys(data).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && field.hasAttribute('required') && !data[key].trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        }
    });
    
    // Validate email
    if (data.email && !isValidEmail(data.email)) {
        const emailField = form.querySelector('[name="email"]');
        showFieldError(emailField, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validate phone
    if (data.phone && !isValidPhone(data.phone)) {
        const phoneField = form.querySelector('[name="phone"]');
        showFieldError(phoneField, 'Por favor ingresa un teléfono válido');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove previous error
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('error');
    
    // Check if required
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        isValid = false;
    }
    
    // Validate email
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validate phone
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Por favor ingresa un teléfono válido');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    field.parentNode.appendChild(errorDiv);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (Chilean format)
function isValidPhone(phone) {
    const phoneRegex = /^(\+56|56)?[\s-]?[9][\s-]?[0-9]{4}[\s-]?[0-9]{4}$|^(\+56|56)?[\s-]?[2-9][\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

// Close notification
function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax Effect for Hero Section
// function initParallax() {
//     const hero = document.querySelector('.hero');
//     const heroImage = document.querySelector('.hero-image');
//     
//     if (hero && heroImage) {
//         window.addEventListener('scroll', () => {
//             const scrolled = window.pageYOffset;
//             const rate = scrolled * -0.5;
//             heroImage.style.transform = `translateY(${rate}px)`;
//         });
//     }
// }

// Initialize parallax on load
// window.addEventListener('load', initParallax);

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Service Card Interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize service cards
initServiceCards();

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        // Add transition style and gradient color for animation
        heroTitle.style.transition = 'all 0.8s ease';
        heroTitle.style.background = 'linear-gradient(45deg, #7d79d1, #7d79d1)';
        heroTitle.style.webkitBackgroundClip = 'text';
        heroTitle.style.webkitTextFillColor = 'transparent';
        heroTitle.style.backgroundClip = 'text';

        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Smooth transition to styled version
                setTimeout(() => {
                    heroTitle.style.opacity = '0.7';
                    setTimeout(() => {
                        heroTitle.innerHTML = originalHTML;
                        heroTitle.style.opacity = '1';
                    }, 400);
                }, 300);
            }
        };
        
        // Start typing effect immediately
        typeWriter();
    }
}



// Add loading class to elements for staggered animations
function addLoadingClasses() {
    const elements = document.querySelectorAll('.service-card, .industry-card, .team-member, .contact-card');
    elements.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
}

// Initialize loading animations
window.addEventListener('load', addLoadingClasses);

// Smooth reveal animations
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.about-card, .case-content, .section-header');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(30px)';
        reveal.style.transition = 'all 0.8s ease';
        revealObserver.observe(reveal);
    });
}

// Initialize reveal animations
initRevealAnimations();

// Add error styles to CSS dynamically
const errorStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c !important;
        background-color: #fdf2f2 !important;
    }
    
    .error-message {
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log('%c¡Bienvenido a Grupo Delega!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cSitio web desarrollado con ❤️ para ofrecer la mejor experiencia de usuario.', 'color: #666; font-size: 14px;');