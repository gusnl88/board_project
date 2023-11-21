$(document).on('click', '.pagination a', function (e) {
    e.preventDefault();

    var url = $(this).attr('href');

    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            var commentHtml = $('<div>').html(data).find('.comments').html();
            $('.comments').html(commentHtml);
        }
    });
});
// ********************************************************  네브바 메뉴아이콘
const $toggleBtn = document.querySelector(".toggleBtn");
const $menu = document.querySelector(".menu");
const $logo = document.querySelector(".logo")


$toggleBtn.addEventListener("click", () => {
$menu.classList.toggle("active");
$logo.classList.toggle("active");
})

// ******************************************************** 댓글 코드

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

//*********************************************************댓글 삭제 컴펌 함수
 function confirmDelete(id) {
      if (confirm("삭제하시겠습니까?")) {
          deleteItem(id);
      }
  }

  async function deleteItem(id) {
      try {
          const response = await fetch(`/main/${id}/delete`, {
              method: 'GET'
          });

          if (response.ok) {
              location.reload(); // 새로고침
              alert("삭제되었습니다.");
              // 삭제 후에 필요한 작업 수행
          } else {
              console.error("서버에서 오류 응답을 받았습니다.");
          }
      } catch (error) {
          console.error("삭제 동안 오류가 발생했습니다.", error);
      }
  }


// ********************************************************  이미지 슬라이드 함수


//document.addEventListener("DOMContentLoaded", function () {
//    const project1 = document.querySelector("#project1");
//    const project2 = document.querySelector("#project2");
//    const project3 = document.querySelector("#project3");
//
//    // 첫 번째 프로젝트 슬라이더 초기화
//    setupSlider(project1);
//
//    // 두 번째 프로젝트 슬라이더 초기화
//    setupSlider(project2);
//    // 세 번째 프로젝트 슬라이더 초기화
//    setupSlider(project3);
//});

// function setupSlider(sliderContainer) { //슬라이더 함수를 생성하여 요소를 매개변수로 받아 실행
//     const slider = sliderContainer.querySelector(".slider");
//     const prevButton = sliderContainer.querySelector(".prev");
//     const nextButton = sliderContainer.querySelector(".next");
//     const currentPageElement = sliderContainer.querySelector(".currentPage");
//     const totalPagesElement = sliderContainer.querySelector(".totalPages");
//
//     let imageWidth; // 이미지의 너비
//     let position = 0;
//     let currentPage = 1; // 현재 페이지
//     const totalPages = slider.children.length; // 총 페이지 수
//
//     // 함수를 사용하여 이미지 너비 설정
//     function setImageWidth() {
//         if (window.innerWidth < 768) {
//             // 모바일 화면
//             imageWidth = 275.35;
//         } else {
//             // 데스크톱 화면
//             imageWidth = 390.58;
//         }
//     }
//
//     // 초기 이미지 너비 설정
//     setImageWidth();
//
//     // 현재 페이지와 총 페이지 업데이트
//     function updatePageInfo() {
//         currentPageElement.textContent = currentPage;
//         totalPagesElement.textContent = totalPages;
//     }
//
//     // 다음 이미지로 이동
//     function nextSlide() {
//         if (position > -(imageWidth * (totalPages - 1))) {
//             position -= imageWidth;
//             slider.style.transform = `translateX(${position}px)`;
//             currentPage += 1;
//             updatePageInfo();
//         } else {
//             // 마지막 요소에서 다음 버튼 클릭 시 첫 번째 요소로 이동
//             position = 0;
//             slider.style.transform = `translateX(${position}px)`;
//             currentPage = 1;
//             updatePageInfo();
//         }
//     }
//
//     // 이전 이미지로 이동
//     function prevSlide() {
//         if (position < 0) {
//             position += imageWidth;
//             slider.style.transform = `translateX(${position}px)`;
//             currentPage -= 1;
//             updatePageInfo();
//         } else {
//             // 첫 번째 요소에서 이전 버튼 클릭 시 마지막 요소로 이동
//             position = -(imageWidth * (totalPages - 1));
//             slider.style.transform = `translateX(${position}px)`;
//             currentPage = totalPages;
//             updatePageInfo();
//         }
//     }
//
//     // 윈도우 크기가 변경될 때 이미지 너비 다시 설정
//     window.addEventListener("resize", setImageWidth);
//
//     // 이전 버튼 클릭 시
//     prevButton.addEventListener("click", function () {
//         prevSlide();
//     });
//
//     // 다음 버튼 클릭 시
//     nextButton.addEventListener("click", function () {
//         nextSlide();
//     });
//
//     // 초기 페이지 정보 업데이트
//     updatePageInfo();
// }


// ********************************************************  하단우측 버튼 활성화 코드
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scrollToTop");

    // 스크롤 이벤트 감지
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) { // 예시로 300px 스크롤하면 버튼 표시
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    // 버튼 클릭 시 페이지 맨 위로 스크롤
    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

//**************************************************** 모달창 효과
    function openModal(src) {
        var modal = document.getElementById("myModal");
        var modalImage = document.getElementById("modalImage");
        var imageSrc =src.getAttribute("src")

        modal.style.opacity = "0"; // 초기 투명도를 0으로 설정
        modal.style.display = "block";
        modalImage.src = imageSrc;

        // 모달 팝업의 투명도를 스무스하게 1로 증가
        setTimeout(function() {
            modal.style.opacity = "1";
        }, 10);
    }

    function closeModal() {
        var modal = document.getElementById("myModal");
        modal.style.opacity = "0"; // 모달 팝업의 투명도를 스무스하게 0으로 감소

        // 모달 팝업이 완전히 사라지도록 display를 변경
        setTimeout(function() {
            modal.style.display = "none";
        }, 400); // 시간은 transition의 시간과 일치시킵니다.
    }

 //**************************************************** 스와이퍼 슬라이드
    // 슬라이더 초기화 함수
 function initSwiper(containerId, paginationId) {
     new Swiper(containerId, {
         loop: true,
         spaceBetween: 10,
         pagination: {
             el: paginationId,
             clickable: true,
         },
         autoplay: {
             delay: 3000,
         },
     });
 }

 // 각 슬라이더를 초기화
 initSwiper('#swiper-container-1', '#swiper-pagination-1');
 initSwiper('#swiper-container-2', '#swiper-pagination-2');
 initSwiper('#swiper-container-3', '#swiper-pagination-3');
