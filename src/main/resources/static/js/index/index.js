document.addEventListener("mousemove", function (e) {
    if (!('ontouchstart' in window) || (navigator.maxTouchPoints < 1) || (navigator.msMaxTouchPoints < 1)) {
                var followers = [
                    { id: "follower", offset: 15 },
                    { id: "follower2", offset: 25 },
                    { id: "follower3", offset: 35 }
                ];
            followers.forEach((follower, index) => {
                setTimeout(() => {
                    var element = document.getElementById(follower.id);
                    element.style.display = "block";
                    element.style.left = e.pageX + follower.offset + "px";
                    element.style.top = e.pageY + follower.offset + "px";
                }, 100 + 50 * index);
            });
        }
});