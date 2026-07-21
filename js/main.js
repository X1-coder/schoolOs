// ========================================
// SCHOOL OS - MAIN JAVASCRIPT
// Core Functionality
// ========================================

(function() {
    'use strict';

    // ============================================
    // GLOBAL FUNCTIONS
    // ============================================
    
    window.handleLogin = function() {
        showToast('🔐 Login functionality coming soon!');
    };

    window.handleDemo = function() {
        showToast('📅 Book a demo - We\'ll get back to you within 24 hours!');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    window.handleGetStarted = function() {
        showToast('🚀 Get started with School OS! We\'ll guide you through the onboarding process.');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    window.performSearch = function() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput?.value.toLowerCase().trim();
        if (!query) return;

        const sections = document.querySelectorAll('section[id]');
        let found = false;

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                section.style.transition = 'background 0.5s ease';
                section.style.background = 'rgba(37, 99, 235, 0.1)';
                setTimeout(() => {
                    section.style.background = '';
                }, 2000);
                found = true;
            }
        });

        if (!found) {
            showToast('🔍 No results found for "' + query + '"');
        }
    };

    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    
    function showToast(message) {
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
            background: var(--bg-card); color: var(--text-primary);
            padding: 0.75rem 1.5rem; border-radius: 0.75rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            border: 1px solid var(--border-primary);
            z-index: 10000; font-weight: 500; font-size: 0.9375rem;
            animation: slideUpToast 0.3s ease;
            max-width: 90%; text-align: center;
            backdrop-filter: blur(10px);
        `;

        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            toast.style.background = '#1e293b';
            toast.style.color = '#f8fafc';
            toast.style.borderColor = '#334155';
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // ============================================
    // DOM READY
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 School OS - Website Loaded');

        // ---- THEME TOGGLE ----
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(themeToggle, savedTheme);

            themeToggle.addEventListener('click', function() {
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(this, newTheme);
            });
        }

        function updateThemeIcon(button, theme) {
            const icon = button.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }

        // ---- PROGRESS BAR ----
        const progressBar = document.getElementById('progressBar');
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, { passive: true });

        // ---- LIVE CLOCK ----
        function updateClock() {
            const clockDisplay = document.getElementById('clockDisplay');
            if (clockDisplay) {
                const now = new Date();
                const time = now.toLocaleTimeString('en-GH', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                });
                clockDisplay.textContent = time;
            }
        }
        updateClock();
        setInterval(updateClock, 1000);

        // ---- BACK TO TOP ----
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop?.classList.add('visible');
            } else {
                backToTop?.classList.remove('visible');
            }
        }, { passive: true });

        backToTop?.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ---- COOKIE CONSENT ----
        function checkCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                document.getElementById('cookieConsent')?.classList.add('show');
            }
        }
        
        window.acceptCookies = function() {
            localStorage.setItem('cookieConsent', 'accepted');
            document.getElementById('cookieConsent')?.classList.remove('show');
            showToast('🍪 Cookies accepted!');
        };
        
        window.declineCookies = function() {
            localStorage.setItem('cookieConsent', 'declined');
            document.getElementById('cookieConsent')?.classList.remove('show');
        };

        checkCookieConsent();

        // ---- SEARCH ----
        document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // ---- NEWSLETTER ----
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('newsletterEmail');
                if (email && email.value.trim()) {
                    showToast('✅ Thank you for subscribing to our newsletter! 🎉');
                    email.value = '';
                }
            });
        }

        // ---- TESTIMONIAL TABS ----
        const tabs = document.querySelectorAll('.tab-btn');
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.tab;
                testimonialCards.forEach(card => {
                    if (filter === 'all' || card.dataset.type === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        // ---- MOBILE MENU ----
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        let menuOpen = false;

        function toggleMenu() {
            menuOpen = !menuOpen;
            navLinks?.classList.toggle('open', menuOpen);
            hamburger?.classList.toggle('active', menuOpen);
            navOverlay?.classList.toggle('active', menuOpen);
            if (hamburger) {
                hamburger.setAttribute('aria-expanded', menuOpen);
            }
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        }

        hamburger?.addEventListener('click', toggleMenu);
        navOverlay?.addEventListener('click', toggleMenu);

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMenu();
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOpen) toggleMenu();
        });

        // ---- SMOOTH SCROLL ----
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            });
        });

        // ---- NAVBAR SCROLL ----
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        }, { passive: true });

        // ---- ACTIVE NAV LINK ----
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            const scrollPosition = window.scrollY + 120;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinksAll.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();

        // ---- SCROLL ANIMATIONS ----
        function initScrollAnimations() {
            const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            elements.forEach(el => observer.observe(el));
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                }
            });
        }

        initScrollAnimations();

        // ---- ANIMATED COUNTERS ----
        function initCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.animated) {
                        animateCounter(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => counterObserver.observe(counter));
        }

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            if (isNaN(target) || target === 0) return;
            element.dataset.animated = 'true';
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                element.textContent = current.toLocaleString();
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
            requestAnimationFrame(updateCounter);
        }

        initCounters();

        // ---- FAQ ACCORDION ----
        function initFaq() {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.addEventListener('click', function() {
                        const isActive = item.classList.contains('active');
                        faqItems.forEach(other => {
                            if (other !== item && other.classList.contains('active')) {
                                other.classList.remove('active');
                                other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                            }
                        });
                        item.classList.toggle('active');
                        this.setAttribute('aria-expanded', item.classList.contains('active'));
                    });
                }
            });
        }

        initFaq();

        // ---- CONTACT FORM ----
        function initContactForm() {
            const form = document.getElementById('contactForm');
            if (!form) return;

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('contactName');
                const email = document.getElementById('contactEmail');
                const message = document.getElementById('contactMessage');

                if (!name.value.trim()) {
                    showToast('❌ Please enter your full name.');
                    name.focus();
                    return;
                }
                if (!email.value.trim() || !email.value.includes('@')) {
                    showToast('❌ Please enter a valid email address.');
                    email.focus();
                    return;
                }
                if (!message.value.trim()) {
                    showToast('❌ Please enter your message.');
                    message.focus();
                    return;
                }

                const button = form.querySelector('button[type="submit"]');
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                button.disabled = true;

                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    button.style.background = 'var(--secondary)';

                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.background = '';
                        button.disabled = false;
                        form.reset();

                        const successMsg = document.createElement('div');
                        successMsg.className = 'form-success';
                        successMsg.innerHTML = '✅ Thank you! We\'ll get back to you soon.';
                        successMsg.style.cssText = `
                            padding: 1rem;
                            background: var(--secondary);
                            color: white;
                            border-radius: var(--radius);
                            text-align: center;
                            margin-top: 1rem;
                        `;
                        const existing = form.querySelector('.form-success');
                        if (existing) existing.remove();
                        form.appendChild(successMsg);
                        setTimeout(() => {
                            successMsg.style.opacity = '0';
                            successMsg.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => successMsg.remove(), 500);
                        }, 5000);
                    }, 2000);
                }, 1500);
            });
        }

        initContactForm();

        // ---- AI CHAT ----
        function initAIChat() {
            const aiInput = document.getElementById('aiInput');
            const aiSendBtn = document.getElementById('aiSendBtn');
            const aiChat = document.getElementById('aiChat');
            if (!aiInput || !aiSendBtn || !aiChat) return;

            const responses = [
                "I'll help you with that! 📚 Let me process your request...",
                "Great question! Here's what I found... 🔍",
                "I understand. Let me assist you with that... 💡",
                "Done! I've processed your request. ✅",
                "That's an excellent idea! Let me help you implement it... 🚀",
                "I've analyzed the data. Here are my recommendations... 📊"
            ];

            function sendAIMessage() {
                const text = aiInput.value.trim();
                if (!text) return;

                const userMsg = document.createElement('div');
                userMsg.className = 'ai-message ai-message-user';
                userMsg.innerHTML = `<div class="ai-bubble">${text}</div>`;
                aiChat.appendChild(userMsg);
                aiChat.scrollTop = aiChat.scrollHeight;
                aiInput.value = '';

                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'ai-message ai-message-bot';
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    botMsg.innerHTML = `
                        <div class="ai-avatar"><i class="fas fa-robot"></i></div>
                        <div class="ai-bubble">${randomResponse}<br><span style="font-size:0.75rem;opacity:0.6;">⚡ AI Assistant</span></div>
                    `;
                    aiChat.appendChild(botMsg);
                    aiChat.scrollTop = aiChat.scrollHeight;
                }, 800);
            }

            aiSendBtn.addEventListener('click', sendAIMessage);
            aiInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendAIMessage();
                }
            });
        }

        initAIChat();

        // ---- FLOATING CARDS ----
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            card.style.animationDelay = (index * 1.5) + 's';
        });

        // ---- TYPEWRITER ----
        const heroTitle = document.querySelector('.hero-title .gradient-text');
        if (heroTitle && window.innerWidth > 768) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let charIndex = 0;
            function typeWriter() {
                if (charIndex < text.length) {
                    heroTitle.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                }
            }
            setTimeout(typeWriter, 800);
        }

        // ---- RIPPLE EFFECT ----
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                `;
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // ---- SHARE BUTTON ----
        const shareBtn = document.getElementById('shareButton');
        const shareDropdown = document.getElementById('shareDropdown');
        let isShareOpen = false;

        if (shareBtn && shareDropdown) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                isShareOpen = !isShareOpen;
                shareDropdown.classList.toggle('show', isShareOpen);
            });

            document.addEventListener('click', function(e) {
                if (!shareBtn.contains(e.target)) {
                    shareDropdown.classList.remove('show');
                    isShareOpen = false;
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isShareOpen) {
                    shareDropdown.classList.remove('show');
                    isShareOpen = false;
                }
            });

            window.addEventListener('scroll', function() {
                if (isShareOpen) {
                    shareDropdown.classList.remove('show');
                    isShareOpen = false;
                }
            }, { passive: true });
        }

        // ---- SHARE PAGE ----
        window.sharePage = function(platform) {
            const url = window.location.href;
            const title = 'School OS - Intelligent School Management Platform';
            const text = 'Check out School OS - the all-in-one school management platform! 🏫✨';
            
            let shareUrl = '';

            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
                    break;
                case 'copy':
                    copyToClipboard(url);
                    closeShareDropdown();
                    return;
                default:
                    if (navigator.share) {
                        navigator.share({ title, text, url }).catch(() => {});
                        closeShareDropdown();
                        return;
                    }
                    showToast('Share not supported on this device');
                    closeShareDropdown();
                    return;
            }

            if (shareUrl) {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=500');
                }
                closeShareDropdown();
            }
        };

        function copyToClipboard(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => showToast('✅ Link copied to clipboard!'))
                    .catch(() => fallbackCopy(text));
            } else {
                fallbackCopy(text);
            }
        }

        function fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('✅ Link copied to clipboard!');
            } catch (err) {
                showToast('❌ Failed to copy. Please copy manually.');
            }
            document.body.removeChild(textArea);
        }

        function closeShareDropdown() {
            const dropdown = document.getElementById('shareDropdown');
            if (dropdown) dropdown.classList.remove('show');
        }

        // ---- TOAST ANIMATION ----
        if (!document.querySelector('#toast-style')) {
            const style = document.createElement('style');
            style.id = 'toast-style';
            style.textContent = `
                @keyframes slideUpToast {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                }
                @keyframes ripple {
                    0% { width: 0; height: 0; opacity: 0.5; }
                    100% { width: 300px; height: 300px; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        console.log('✅ All features initialized successfully');
    });

})();