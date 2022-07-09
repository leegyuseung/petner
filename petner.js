// ajax요청하기
async function petner() {
  // ul 비워주기

  const url = "https://petner.kr/api/v6/publics";

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      $("#contents").empty();
      $(".tns-controls").empty();
      // 10개 불러오기
      data.forEach((datas, index) => {
        // image가 null일 때 다른 이미지 대체하기
        if (datas.petner.image === null) {
          datas.petner.image = "user-profile-default.png";
        }
        // title 이 25글자 이상일때 25글자만 보여주기
        if (datas.title.length > 25) {
          datas.title = `${datas.title.substring(0, 25)}...`;
        }
        // 날짜 시간 제외하기
        let time = datas.created_at.substring(0, 10);

        // content
        const petnerContent = document.getElementById("contents");
        const li = document.createElement("li");
        li.className = "petner-content-item ";
        li.id = "petnerLi";
        li.innerHTML =
          `<div class='container cardDiv'><div class ='container petnerDiv'><img src=` +
          datas.petner.image +
          ` class='petnerImg'></img><span class='petName'>` +
          `&nbsp;${datas.companion.name}` +
          "</span><h4 class='petnerId'>" +
          `ID:${datas.petner.id}` +
          "</h4></div><div><img src=" +
          datas.image +
          " class='petImg'></img></div><br><div><h4 class='title'>" +
          datas.title +
          "</h4><span class='timeSpan'>" +
          time +
          "</span></div></div>";
        petnerContent.appendChild(li);
      });
    });
  var slider = tns({
    items: 1,
    controls: false,
    responsive: {
      350: {
        items: 3,
        controls: true,
        edgePadding: 30,
      },
      500: {
        items: 7,
      },
    },
    container: ".petner-content",
    swipeAngle: false,
    speed: 400,
    mouseDrag: true,
  });
}

petner();
