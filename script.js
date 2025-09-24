document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            const preloader = document.querySelector('.preloader');
            
            // Esconder preloader após 2 segundos
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 2000);
            
            // Dark Mode Toggle
            const themeToggle = document.querySelector('.theme-toggle');
            const themeIcon = themeToggle.querySelector('i');
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Verificar preferência salva
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            // Cursor personalizado
            const cursorDot = document.querySelector('[data-cursor-dot]');
            const cursorOutline = document.querySelector('[data-cursor-outline]');
            
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;
                
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
                
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: 'forwards' });
            });
            
            // Contador de estatísticas
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            const startCounters = () => {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(() => startCounters(), 1);
                    } else {
                        counter.innerText = target;
                    }
                });
            };
            
            // Iniciar contadores quando a seção estiver visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.hero-stats'));
            
            // Rotação de texto
            const textRotator = document.querySelector('.text-rotator');
            const words = textRotator.getAttribute('data-rotation').split(',');
            let currentWordIndex = 0;
            
            setInterval(() => {
                textRotator.style.opacity = 0;
                
                setTimeout(() => {
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    textRotator.textContent = words[currentWordIndex];
                    textRotator.style.opacity = 1;
                }, 500);
            }, 3000);
            
            // Form submission
            const registrationForm = document.querySelector('.registration-form');
            
            registrationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulação de envio bem-sucedido
                registrationForm.innerHTML = `
                    <div style="text-align: center; padding: 30px 0;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 20px;"></i>
                        <h3 style="margin-bottom: 10px;">Cadastro Realizado!</h3>
                        <p>Em breve entraremos em contato com mais informações.</p>
                    </div>
                `;
            });
            
            // Smooth scrolling para links âncora
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });