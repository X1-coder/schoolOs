// ========================================
// LIGHTBOX
// ========================================

(function() {
    'use strict';

    window.openLightbox = function(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const image = document.getElementById('lightboxImage');
        
        if (lightbox && image) {
            image.src = imageSrc;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

})();