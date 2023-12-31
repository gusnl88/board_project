const $toggleBtn = document.querySelector(".toggleBtn");
const $menu = document.querySelector(".menu");
const $logo = document.querySelector(".logo")


$toggleBtn.addEventListener("click", () => {
$menu.classList.toggle("active");
$logo.classList.toggle("active");
})
// 여기까지 네브바 메뉴아이콘

// comments.js

document.addEventListener("DOMContentLoaded", () => {
  const commentButton = document.getElementById("commentButton");
  const nameInput = document.getElementById("nameInput");
  const contentInput = document.getElementById("contentInput");
  const commentList = document.getElementById("commentList");
  // "댓글 등록" 버튼 클릭 이벤트 핸들러
  commentButton.addEventListener("click", async () => {
    const name = nameInput.value;
    const content = contentInput.value;

    if (name && content) {
      try {
        // 서버로 데이터를 전송하는 비동기 함수를 호출합니다.
         const content = contentInput.value;
         const name= nameInput.value;
            // 한글 문자만 포함되어 있는지 확인하는 정규 표현식
         const isAllowed = /^[가-힣\s!@#$%^&*(),.?":{}|<>0-9]+$/.test(name);
          if (!isAllowed || name.length > 10) {
              alert("이름은 한글, 특수 문자, 띄어쓰기를 포함하여 10자 이내로 가능합니다.");
              nameInput.value = ""; // 입력 내용 지우기
              return;
          }

            if (content.length > 20) {
                alert("내용은 20자 이내로 등록 가능합니다.");
                return;
            }
            const response = await sendCommentToServer(name, content);

            if (response.status === 200) {

                 const responseData = await response.text(); // JSON 대신 text로 응답을 받음
                  if (responseData === "success") {
                        location.reload(); //등록후 새로고침
                        alert("글이 성공적으로 등록되었습니다.\n글은 3번만 등록 가능합니다.");
                  } else if (responseData === "exceeded") {
                        location.reload(); //등록후 새로고침
                        alert("글등록 횟수를 초과하였습니다.");
                        return;
                  }
            } else {
              console.error("서버에서 오류 응답을 받았습니다.");
            }

      } catch (error) {
        console.error("글을 업데이트하는 동안 오류가 발생했습니다.", error);
      }
    } else {
      alert("이름과 내용을 모두 입력하세요.");
    }
  });

  // 서버로 댓글을 비동기적으로 전송하는 함수
  async function sendCommentToServer(name, content) {
    const data = { name, content };
    const response = await fetch("/main/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  }
});

// 이미지 슬라이드 함수

 document.addEventListener("DOMContentLoaded", function () {
     const slider = document.querySelector(".slider");
     const prevButton = document.getElementById("prev");
     const nextButton = document.getElementById("next");
     const currentPageElement = document.getElementById("currentPage");
     const totalPagesElement = document.getElementById("totalPages");
     let imageWidth; // 이미지의 너비
     let position = 0;
     let currentPage = 1; // 현재 페이지
     const totalPages = slider.children.length; // 총 페이지 수

     // 함수를 사용하여 이미지 너비 설정
     function setImageWidth() {
         if (window.innerWidth < 768) {
             // 모바일 화면
             imageWidth = 274.79;
         } else {
             // 데스크톱 화면
             imageWidth = 390.58;
         }
     }

     // 초기 이미지 너비 설정
     setImageWidth();

     // 현재 페이지와 총 페이지 업데이트
     function updatePageInfo() {
         currentPageElement.textContent = currentPage;
         totalPagesElement.textContent = totalPages;
     }

     // 다음 이미지로 이동
     function nextSlide() {
         if (position > -(imageWidth * (totalPages - 2))) {
             position -= imageWidth;
             slider.style.transform = `translateX(${position}px)`;
             currentPage += 1;
             updatePageInfo();
         } else {
             // 마지막 요소에서 다음 버튼 클릭 시 첫 번째 요소로 이동
             position = 0;
             slider.style.transform = `translateX(${position}px)`;
             currentPage = 1;
             updatePageInfo();
         }
     }

     // 이전 이미지로 이동
     function prevSlide() {
         if (position < 0) {
             position += imageWidth;
             slider.style.transform = `translateX(${position}px)`;
             currentPage -= 1;
             updatePageInfo();
         } else {
             // 첫 번째 요소에서 이전 버튼 클릭 시 마지막 요소로 이동
             position = -(imageWidth * (totalPages - 2));
             slider.style.transform = `translateX(${position}px)`;
             currentPage = totalPages;
             updatePageInfo();
         }
     }

     // 윈도우 크기가 변경될 때 이미지 너비 다시 설정
     window.addEventListener("resize", setImageWidth);

     // 이전 버튼 클릭 시
     prevButton.addEventListener("click", function () {
         prevSlide();
     });

     // 다음 버튼 클릭 시
     nextButton.addEventListener("click", function () {
         nextSlide();
     });

     // 초기 페이지 정보 업데이트
     updatePageInfo();
 });


