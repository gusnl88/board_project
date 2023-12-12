  document.addEventListener("mousemove", function (e) {
        var follower = document.getElementById("follower");
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        // 동그라미를 마우스 위치로 이동
        follower.style.display="block";
        follower.style.left = mouseX+15 + "px";
        follower.style.top = mouseY+15+ "px";
    });