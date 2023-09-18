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
                const isKorean = /^[가-힣]+$/.test(name);

                if (!isKorean || name.length > 10) {
                    alert("이름은 한글(10자이내) 이름만 가능합니다.");
                    nameInput.value = ""; // 입력 내용 지우기
                    return;
                }

            if (content.length > 20) {
            alert("내용은 150자 이내로 등록 가능합니다.");
            return;
            }
        const response = await sendCommentToServer(name, content);

        if (response.status === 200) {
          // 댓글 등록에 성공하면 화면에 댓글을 추가합니다.
//          const commentItem = document.createElement("li");
//          commentItem.className = "list-group-item";
//          commentItem.innerText = `${name}: ${content}`;
//          commentList.appendChild(commentItem);

          // 입력 필드 초기화
//          nameInput.value = "";
//          contentInput.value = "";
          location.reload(); //등록후 새로고침
        } else {
          console.error("서버에서 오류 응답을 받았습니다.");
        }
      } catch (error) {
        console.error("댓글을 업데이트하는 동안 오류가 발생했습니다.", error);
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