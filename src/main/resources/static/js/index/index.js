  document.addEventListener("mousemove", function (e) {
        var follower = document.getElementById("follower");
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        // 동그라미를 마우스 위치로 이동
        follower.style.left = mouseX+15 + "px";
        follower.style.top = mouseY+15+ "px";
    });
    function createStar() {
            const star = document.createElement('div');
            star.className = 'star';
            document.body.appendChild(star);

            const randomSize=(Math.random() * 5) ;
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