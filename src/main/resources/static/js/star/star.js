    function createStar() {
            const star = document.createElement('div');
            star.className = 'star';
            document.body.appendChild(star);

            const randomSize=(Math.random() * 4) ;
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            star.style.width=`${randomSize}px`;
            star.style.height=`${randomSize}px`;
            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;

            setTimeout(() => {
                star.style.animation = 'blink 2s infinite';
                star.style.opacity = '1';
            }, Math.random() * 6000); // Random delay between 0 and 4 seconds
        }

        // Create 10 stars with random delay
        for (let i = 0; i < 40; i++) {
            setTimeout(createStar, Math.random() * 4000);
        }