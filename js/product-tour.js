// ========================================
// PRODUCT TOUR
// ========================================

(function() {
    'use strict';

    const tourSteps = [
        {
            element: '.hero',
            title: '🏫 Welcome to School OS',
            description: 'The all-in-one platform for modern school management. Let us show you around!'
        },
        {
            element: '#features',
            title: '📚 Powerful Features',
            description: 'From admissions to analytics, we have everything you need to run your school efficiently.'
        },
        {
            element: '.ai-section',
            title: '🤖 AI Assistant',
            description: 'Meet your intelligent assistant that helps you manage tasks with simple commands.'
        },
        {
            element: '#pricing',
            title: '💰 Flexible Pricing',
            description: 'Choose the plan that fits your school\'s needs and budget.'
        },
        {
            element: '#contact',
            title: '📞 Get Started',
            description: 'Ready to transform your school? Contact us today for a free demo!'
        }
    ];

    let currentStep = 0;
    let isTourActive = false;

    window.startProductTour = function() {
        if (isTourActive) return;
        isTourActive = true;
        currentStep = 0;
        showStep(currentStep);
    };

    function showStep(index) {
        if (index >= tourSteps.length) {
            endTour();
            return;
        }

        const step = tourSteps[index];
        const element = document.querySelector(step.element);
        if (!element) {
            currentStep++;
            showStep(currentStep);
            return;
        }

        // Remove existing tour overlay
        removeTourOverlay();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'tour-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create card
        const card = document.createElement('div');
        card.style.cssText = `
            background: var(--bg-card);
            padding: 2.5rem;
            border-radius: var(--radius-lg);
            max-width: 500px;
            width: 90%;
            box-shadow: var(--shadow-2xl);
            position: relative;
            animation: slideUp 0.3s ease;
        `;

        card.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${step.title.split(' ')[0]}</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary);">${step.title}</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">${step.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.875rem;">${index + 1} / ${tourSteps.length}</span>
                <div style="display: flex; gap: 0.75rem;">
                    <button onclick="skipTour()" style="padding: 0.5rem 1.25rem; border: none; background: transparent; color: var(--text-muted); cursor: pointer; font-family: inherit; font-weight: 500;">Skip</button>
                    <button onclick="nextTourStep()" style="padding: 0.5rem 1.5rem; border: none; background: var(--primary); color: white; border-radius: 9999px; cursor: pointer; font-family: inherit; font-weight: 600;">${index === tourSteps.length - 1 ? 'Finish' : 'Next →'}</button>
                </div>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Highlight element
        element.style.outline = '4px solid var(--primary)';
        element.style.outlineOffset = '4px';
        element.style.transition = 'outline 0.3s ease';

        // Scroll to element
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Set up navigation
        window.nextTourStep = function() {
            currentStep++;
            showStep(currentStep);
        };

        window.skipTour = function() {
            endTour();
        };
    }

    function endTour() {
        removeTourOverlay();
        isTourActive = false;
        currentStep = 0;

        // Remove highlights
        document.querySelectorAll('[style*="outline"]').forEach(el => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        });

        // Show completion
        showToast('🎉 Tour complete! Ready to get started?');
    }

    function removeTourOverlay() {
        document.querySelectorAll('.tour-overlay').forEach(el => el.remove());
    }

    // Add animation
    if (!document.querySelector('#tour-style')) {
        const style = document.createElement('style');
        style.id = 'tour-style';
        style.textContent = `
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

})();