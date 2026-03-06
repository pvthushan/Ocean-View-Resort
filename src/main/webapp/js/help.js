document.addEventListener('DOMContentLoaded', function() {

    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.accordion-item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });


            }
        });
    });


    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Scroll slightly to ensure header is visible after collapse/expand
            setTimeout(() => {
                const rect = this.parentElement.getBoundingClientRect();
                if (rect.top < 100) {
                    window.scrollBy({ top: -50, behavior: 'smooth' });
                }
            }, 300);
        });
    });
});