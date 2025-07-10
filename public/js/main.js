// Configurações globais
const config = {
    whatsappNumber: '5562999999999',
    whatsappMessage: 'Olá! Gostaria de agendar uma consulta jurídica.',
    scrollOffset: 80,
    animationDelay: 100
};

// Elementos DOM
const elements = {
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    header: document.querySelector('.header'),
    whatsappFloat: document.querySelector('.whatsapp-float'),
    whatsappLink: document.querySelector('.whatsapp-link'),
    scrollToTop: document.querySelector('.scroll-to-top'),
    formContato: document.getElementById('formContato'),
    statNumbers: document.querySelectorAll('.stat-number'),
    particles: document.querySelector('.hero-particles')
};

// Estado da aplicação
let state = {
    isMobileMenuOpen: false,
    isScrolled: false,
    lastScrollTop: 0,
    animationObserver: null
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupAnimations();
    setupScrollEffects();
    setupFormHandling();
    setupWhatsAppIntegration();
    setupParticles();
    setupLazyLoading();
    setupCounters();
    
    // Inicializar tooltips
    initializeTooltips();
    
    // Verificar se há elementos para animar na carga inicial
    checkInitialAnimations();
}

// Configuração de event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Scroll events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Form submission
    if (elements.formContato) {
        elements.formContato.addEventListener('submit', handleFormSubmit);
    }

    // WhatsApp float interactions
    if (elements.whatsappLink) {
        elements.whatsappLink.addEventListener('mouseenter', showWhatsAppTooltip);
        elements.whatsappLink.addEventListener('mouseleave', hideWhatsAppTooltip);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Mobile menu functionality
function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.classList.toggle('active');
    }
    
    if (elements.navMenu) {
        elements.navMenu.classList.toggle('active');
    }
    
    // Animar ícones do menu
    animateMenuIcons();
}

function animateMenuIcons() {
    const spans = elements.mobileMenuToggle?.querySelectorAll('span');
    if (!spans) return;
    
    spans.forEach((span, index) => {
        if (state.isMobileMenuOpen) {
            span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                 index === 1 ? 'opacity(0)' :
                                 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
        }
    });
}

// Smooth scroll functionality
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const targetPosition = targetElement.offsetTop - config.scrollOffset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Fechar menu mobile se estiver aberto
        if (state.isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Scroll effects
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header scroll effect
    if (elements.header) {
        if (scrollTop > 100 && !state.isScrolled) {
            elements.header.classList.add('scrolled');
            state.isScrolled = true;
        } else if (scrollTop <= 100 && state.isScrolled) {
            elements.header.classList.remove('scrolled');
            state.isScrolled = false;
        }
    }
    
    // Parallax effect para hero
    if (elements.particles) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        elements.particles.style.transform = `translateY(${rate}px)`;
    }
    
    // Atualizar último scroll position
    state.lastScrollTop = scrollTop;
}

// Resize handler
function handleResize() {
    // Recalcular animações se necessário
    if (state.animationObserver) {
        state.animationObserver.disconnect();
        setupAnimations();
    }
}

// Configuração de animações
function setupAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    state.animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animar contadores se for uma seção de estatísticas
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        state.animationObserver.observe(element);
    });
}

// Animar contadores
function animateCounter(element) {
    if (!element || element.dataset.animated) return;
    
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    element.dataset.animated = 'true';
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Setup contadores
function setupCounters() {
    elements.statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        stat.dataset.target = target;
        stat.dataset.suffix = suffix;
        stat.textContent = '0' + suffix;
    });
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!validateForm(data)) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Simular envio
    showNotification('Enviando sua mensagem...', 'info');
    
    setTimeout(() => {
        // Redirecionar para WhatsApp
        const message = formatWhatsAppMessage(data);
        const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        showNotification('Mensagem enviada com sucesso!', 'success');
        e.target.reset();
    }, 1500);
}

function validateForm(data) {
    return data.nome && data.telefone && data.servico && data.mensagem;
}

function formatWhatsAppMessage(data) {
    const servicos = {
        'familia': 'Direito da Família',
        'trabalhista': 'Direito Trabalhista',
        'previdenciario': 'Direito Previdenciário',
        'consumidor': 'Direito do Consumidor'
    };
    
    return `Olá! Gostaria de agendar uma consulta jurídica.

*Nome:* ${data.nome}
*Telefone:* ${data.telefone}
*Serviço:* ${servicos[data.servico] || data.servico}
*Mensagem:* ${data.mensagem}

Aguardo seu retorno!`;
}

// WhatsApp integration
function setupWhatsAppIntegration() {
    // Atualizar link do WhatsApp flutuante
    if (elements.whatsappLink) {
        const message = encodeURIComponent(config.whatsappMessage);
        elements.whatsappLink.href = `https://wa.me/${config.whatsappNumber}?text=${message}`;
    }
    
    // Adicionar funcionalidade de clique em todos os botões do WhatsApp
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('WhatsApp') || btn.querySelector('.fab.fa-whatsapp')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const message = encodeURIComponent(config.whatsappMessage);
                window.open(`https://wa.me/${config.whatsappNumber}?text=${message}`, '_blank');
            });
        }
    });
}

function showWhatsAppTooltip() {
    const tooltip = elements.whatsappLink?.querySelector('.whatsapp-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    }
}

function hideWhatsAppTooltip() {
    const tooltip = elements.whatsappLink?.querySelector('.whatsapp-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    }
}

// Particles effect
function setupParticles() {
    if (!elements.particles) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(30, 64, 175, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        elements.particles.appendChild(particle);
        particles.push(particle);
    }
}

// Lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
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

// Scroll to top functionality
function setupScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
}

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.dataset.tooltip;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    this.tooltip = tooltip;
}

function hideTooltip() {
    if (this.tooltip) {
        this.tooltip.remove();
        this.tooltip = null;
    }
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // ESC para fechar menu mobile
    if (e.key === 'Escape' && state.isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Enter para ativar links focados
    if (e.key === 'Enter' && document.activeElement.tagName === 'A') {
        document.activeElement.click();
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Check initial animations
function checkInitialAnimations() {
    const elementsInView = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    elementsInView.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            element.classList.add('animate');
        }
    });
}

// Performance optimizations
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

// Aplicar debounce em funções que podem ser chamadas frequentemente
const debouncedScrollHandler = debounce(handleScroll, 10);
const debouncedResizeHandler = debounce(handleResize, 250);

// Substituir event listeners originais
window.removeEventListener('scroll', handleScroll);
window.removeEventListener('resize', handleResize);
window.addEventListener('scroll', debouncedScrollHandler);
window.addEventListener('resize', debouncedResizeHandler);

// Setup scroll to top
setupScrollToTop();

// Adicionar estilos CSS dinâmicos
const dynamicStyles = `
    .notification {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(30, 64, 175, 0.4);
    }
    
    .particle {
        pointer-events: none;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in-up.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }
    
    .slide-in-left.animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .slide-in-right {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.6s ease;
    }
    
    .slide-in-right.animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(15px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Exportar funções para uso global se necessário
window.AdrianoAdvogado = {
    showNotification,
    toggleMobileMenu,
    setupWhatsAppIntegration
}; 