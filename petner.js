let petnerContent = document.getElementById("responsive");
// ajax요청하기
async function petner() {
  // ul 비워주기
  $(".petner-content").empty();
  const url = "https://petner.kr/api/v6/publics";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // 10개 불러오기
      data.forEach((data, index) => {
        // image가 null일 때 다른 이미지 대체하기
        if (data.petner.image === null) {
          data.petner.image = "user-profile-default.png";
        }
        // title 이 25글자 이상일때 25글자만 보여주기
        if (data.title.length > 25) {
          data.title = `${data.title.substring(0, 25)}...`;
        }
        // 날짜 시간 제외하기
        let time = data.created_at.substring(0, 10);
        const div = document.createElement("div");
        div.className = "item tns-item";
        div.id = `responsive-item${index}`;
        div.innerHTML =
          `<li class='petnerLi list-group-item'><div class='container cardDiv'><header class='petnerHeader'><div class ='container petnerDiv'><img src=` +
          data.petner.image +
          " class='petnerImg'></img><span class='petName'>" +
          `&nbsp;${data.companion.name}` +
          "</span><h4 class='petnerId'>" +
          `ID:${data.petner.id}` +
          "</h4></div></header><div><img src=" +
          data.image +
          " class='petImg'></img></div><br><footer><div><h4 class='title'>" +
          data.title +
          "</h4><span class='timeSpan'>" +
          time +
          "</span></div></footer></div></li>";
        petnerContent.appendChild(div);
      });
    });
}

petner();

var slider = tns({
  items: 2,
  controls: false,
  responsive: {
    350: {
      items: 3,
      controls: true,
      edgePadding: 30,
    },
    500: {
      items: 4,
    },
  },
  container: "#responsive",
  swipeAngle: false,
  speed: 400,
});
