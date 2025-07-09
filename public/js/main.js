// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO MOBILE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== ANIMAÇÃO DE ELEMENTOS NO SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Adiciona efeito de brilho para cards
                if (entry.target.classList.contains('servico-card')) {
                    entry.target.style.animationDelay = '0.1s';
                }
                
                if (entry.target.classList.contains('depoimento-card')) {
                    entry.target.style.animationDelay = '0.2s';
                }
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animateElements = document.querySelectorAll('.servico-card, .depoimento-card, .feature, .stat, .contato-item');
    animateElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ===== EFEITO DE PARTÍCULAS NO HERO =====
    function createParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ===== FORMULÁRIO DE CONTATO =====
    const formContato = document.getElementById('formContato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Pega os dados do formulário
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.nome || !data.email || !data.assunto || !data.mensagem) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Adiciona classe de loading
            this.classList.add('form-loading');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Enviando...';
            
            // Simula envio (substitua por chamada real da API)
            setTimeout(() => {
                // Remove classe de loading
                this.classList.remove('form-loading');
                submitBtn.querySelector('span').textContent = originalText;
                
                // Simula sucesso
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
                
                // Aqui você pode adicionar a chamada real para o backend
                // fetch('/contato', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(data)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     if (data.success) {
                //         showMessage(data.message, 'success');
                //         this.reset();
                //     } else {
                //         showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
                //     }
                // })
                // .catch(error => {
                //     showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
                // });
                
            }, 2000);
        });
    }
    
    // ===== FUNÇÃO PARA MOSTRAR MENSAGENS =====
    function showMessage(message, type) {
        // Remove mensagens existentes
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Cria nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-text">${message}</span>
                <button class="message-close">&times;</button>
            </div>
        `;
        
        // Adiciona estilos
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            border: 1px solid ${type === 'success' ? '#10b981' : '#ef4444'};
            border-radius: 12px;
            padding: 15px 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
            backdrop-filter: blur(10px);
        `;
        
        // Adiciona ao DOM
        document.body.appendChild(messageDiv);
        
        // Adiciona estilos para o conteúdo da mensagem
        const messageContent = messageDiv.querySelector('.message-content');
        messageContent.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        `;
        
        const messageText = messageDiv.querySelector('.message-text');
        messageText.style.cssText = `
            flex: 1;
            font-weight: 500;
        `;
        
        const closeBtn = messageDiv.querySelector('.message-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: inherit;
            padding: 0;
            line-height: 1;
        `;
        
        // Evento para fechar mensagem
        closeBtn.addEventListener('click', () => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        });
        
        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== MÁSCARA PARA TELEFONE =====
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
                value = value.replace(/(\d{2})/, '($1');
            }
            e.target.value = value;
        });
    }
    
    // ===== CONTADOR ANIMADO =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            }
        }
        
        updateCounter();
    }
    
    // Observa os contadores para animá-los quando aparecerem
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('h3');
                if (counter) {
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    animateCounter(counter, target);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observa os elementos com estatísticas
    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostra/esconde o botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Evento de clique para voltar ao topo
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== HOVER EFFECTS PARA CARDS =====
    const cards = document.querySelectorAll('.servico-card, .depoimento-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== EFEITO DE TEXTO DIGITADO =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplica efeito de digitação no título do hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        const typeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typeWriter(heroTitle, originalText, 50);
                    }, 500);
                    typeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        typeObserver.observe(heroTitle);
    }
    
    // ===== LAZY LOADING PARA IMAGENS =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
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
    
    // ===== EFEITO DE PARALLAX SUAVE =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background, .hero-overlay');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===== ANIMAÇÕES CSS ADICIONAIS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
            }
            50% { 
                transform: translateY(-20px) rotate(180deg); 
            }
        }
        
        .scroll-to-top:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
            transform: translateY(-2px) scale(1.1);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5) !important;
        }
        
        .servico-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
            transition: left 0.5s;
        }
        
        .servico-card:hover::after {
            left: 100%;
        }
        
        .feature-icon {
            transition: all 0.3s ease;
        }
        
        .feature:hover .feature-icon {
            transform: rotate(5deg) scale(1.1);
        }
        
        .btn svg {
            transition: transform 0.3s ease;
        }
        
        .btn:hover svg {
            transform: translateX(3px);
        }
        
        .hero-badge {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== INICIALIZAÇÃO COMPLETA =====
    console.log('Site do Adriano Lisboa Advogados carregado com sucesso!');
    
    // Adiciona classe para indicar que o JavaScript está carregado
    document.body.classList.add('js-loaded');
    
    // Adiciona efeito de loading inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Carousel functionality
    class ImageCarousel {
        constructor(container) {
            this.container = container;
            this.wrapper = container.querySelector('.elementor-image-carousel');
            this.slides = container.querySelectorAll('.swiper-slide');
            this.prevButton = container.querySelector('.elementor-swiper-button-prev');
            this.nextButton = container.querySelector('.elementor-swiper-button-next');
            this.pagination = container.querySelector('.swiper-pagination');
            this.currentSlide = 0;
            this.slideWidth = 100;
            this.autoplayInterval = null;
            this.autoplayDelay = 5000;
            
            this.init();
        }
        
        init() {
            if (this.slides.length <= 1) return;
            
            this.setupPagination();
            this.setupButtons();
            this.startAutoplay();
            this.updateSlide();
        }
        
        setupPagination() {
            if (!this.pagination) return;
            
            this.slides.forEach((_, index) => {
                const bullet = document.createElement('span');
                bullet.className = 'swiper-pagination-bullet';
                bullet.setAttribute('role', 'button');
                bullet.setAttribute('data-bullet-index', index);
                bullet.setAttribute('aria-label', `Go to slide ${index + 1}`);
                
                bullet.addEventListener('click', () => {
                    this.goToSlide(index);
                });
                
                this.pagination.appendChild(bullet);
            });
            
            this.bullets = this.pagination.querySelectorAll('.swiper-pagination-bullet');
        }
        
        setupButtons() {
            if (this.prevButton) {
                this.prevButton.addEventListener('click', () => {
                    this.prevSlide();
                });
            }
            
            if (this.nextButton) {
                this.nextButton.addEventListener('click', () => {
                    this.nextSlide();
                });
            }
        }
        
        goToSlide(index) {
            this.currentSlide = index;
            this.updateSlide();
            this.resetAutoplay();
        }
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlide();
            this.resetAutoplay();
        }
        
        prevSlide() {
            this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
            this.updateSlide();
            this.resetAutoplay();
        }
        
        updateSlide() {
            const translateX = -this.currentSlide * this.slideWidth;
            this.wrapper.style.transform = `translate3d(${translateX}%, 0px, 0px)`;
            
            // Update pagination
            if (this.bullets) {
                this.bullets.forEach((bullet, index) => {
                    bullet.classList.toggle('swiper-pagination-bullet-active', index === this.currentSlide);
                });
            }
            
            // Update slide visibility
            this.slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== this.currentSlide);
                slide.setAttribute('inert', index !== this.currentSlide);
            });
        }
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        }
        
        resetAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.startAutoplay();
            }
        }
        
        pauseAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
        }
    }
    
    // Mobile menu functionality
    class MobileMenu {
        constructor() {
            this.toggle = document.querySelector('.mobile-menu-toggle');
            this.nav = document.querySelector('.nav-menu');
            this.init();
        }
        
        init() {
            if (!this.toggle || !this.nav) return;
            
            this.toggle.addEventListener('click', () => {
                this.toggle.classList.toggle('active');
                this.nav.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            this.nav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    this.toggle.classList.remove('active');
                    this.nav.classList.remove('active');
                }
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Intersection Observer for animations
    function initAnimations() {
        const elements = document.querySelectorAll('.atuacao-card, .contato-item, .sobre-content');
        
        if (!elements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Header scroll effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(30, 58, 138, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#1e3a8a';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // Initialize carousels
    function initCarousels() {
        const carouselContainers = document.querySelectorAll('.elementor-image-carousel-wrapper');
        carouselContainers.forEach(container => {
            new ImageCarousel(container);
        });
    }
    
    // Initialize mobile menu
    function initMobileMenu() {
        new MobileMenu();
    }
    
    // Form handling
    function initContactForm() {
        const form = document.getElementById('formContato');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.nome || !data.email || !data.mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Initialize everything when DOM is loaded
    initCarousels();
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initHeaderScroll();
    initContactForm();
    initLazyLoading();
    
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Reinitialize carousels on resize
        const carouselContainers = document.querySelectorAll('.elementor-image-carousel-wrapper');
        carouselContainers.forEach(container => {
            const carousel = container.carousel;
            if (carousel) {
                carousel.updateSlide();
            }
        });
    });
    
    // Handle visibility change for autoplay
    document.addEventListener('visibilitychange', () => {
        const carouselContainers = document.querySelectorAll('.elementor-image-carousel-wrapper');
        
        if (document.hidden) {
            carouselContainers.forEach(container => {
                const carousel = container.carousel;
                if (carousel) {
                    carousel.pauseAutoplay();
                }
            });
        } else {
            carouselContainers.forEach(container => {
                const carousel = container.carousel;
                if (carousel) {
                    carousel.startAutoplay();
                }
            });
        }
    });
    
    // Add hover effects for icon boxes
    document.addEventListener('DOMContentLoaded', () => {
        const iconBoxes = document.querySelectorAll('.jkit-icon-box');
        
        iconBoxes.forEach(box => {
            box.addEventListener('mouseenter', () => {
                box.style.transform = 'translateY(-5px)';
            });
            
            box.addEventListener('mouseleave', () => {
                box.style.transform = 'translateY(0)';
            });
        });
    });
    
    // Add click effects for buttons
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.jkit-button-wrapper');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });
    

    
    // Add mobile menu styles
    const mobileMenuStyles = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: #1e3a8a;
                flex-direction: column;
                padding: 20px 0;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            
            .nav-menu.active {
                transform: translateY(0);
            }
            
            .nav-menu li {
                margin: 10px 0;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                background: rgba(255,255,255,0.1);
                margin-top: 10px;
                border-radius: 5px;
            }
            
            .dropdown-menu a {
                color: white;
                padding: 8px 20px;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileMenuStyles;
    document.head.appendChild(styleSheet);
}); 