   /* const pTag1=document.querySelector('.first-parallel')
    const pTag2=document.querySelector('.second-parallel')

    const textArr1 = 'Hello, Im preparing a developer.Please excuse me if I lack in any way.'.split(' ')
    const textArr2 = 'I will work hard to become a developer who takes a step forward.'.split(' ')
    let count1 = 0
    let count2 = 0
    function initTexts(element, textArray) {
        textArray.push(...textArray)
        for (let i = 0; i < textArray.length; i++) {
            element.innerText += `${textArray[i]}\u00A0`
        }
    }
    initTexts(pTag1, textArr1)
    initTexts(pTag2, textArr2)
    function marqueeText(count, element, direction) {
        if (count > element.scrollWidth / 2) {
            element.style.transform = `translate3d(0, 0, 0)`
            count = 0
        }
        element.style.transform = `translate3d(${direction * count}px, 0, 0)`

        return count
    }

    function animate() {
        count1++
        count2++

        count1 = marqueeText(count1, pTag1, -1)
        count2 = marqueeText(count2, pTag2, 1)


        window.requestAnimationFrame(animate)
    }
    function scrollHandler() {
        count1 += 15
        count2 += 15
    }

    window.addEventListener('scroll', scrollHandler)
    animate()
    */
   let observer= new IntersectionObserver((e)=>{
       e.forEach((box)=>{
           if (box.isIntersecting){
           box.target.style.opacity=1;
           // box.target.style.transform='rotate(0deg)';
           }
           else {
               box.target.style.opacity=0;
           //     // box.target.style.transform='rotate(-360deg)';
           }
       })

   })

   let div = document.querySelectorAll('div')
   observer.observe(div[0]) //html 요소가화면에 등장하는지 감시해줌
   observer.observe(div[1])
   observer.observe(div[2])
   observer.observe(div[3])
   observer.observe(div[4])