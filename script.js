// ===== 導覽選單開關 =====
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}

// ===== 網站人次統計 =====
const viewCount = localStorage.getItem('viewCount') || 0;
const newCount = parseInt(viewCount) + 1;
localStorage.setItem('viewCount', newCount);
const viewDisplay = document.getElementById('viewCount');
if (viewDisplay) viewDisplay.textContent = newCount;

// ===== 首頁開始遊戲按鈕 =====
const startBtn = document.getElementById("startGameBtn");
if(startBtn){
  startBtn.addEventListener("click", ()=>{
    startBtn.classList.add("fade-out");
    setTimeout(()=>{
      window.location.href = "game.html";
    }, 500);
  });
}

// ===== 遊戲邏輯 =====
const questions = [
  {
    question: "下列那幾個是紙容器？",
    images: [
      "圖片庫/1.png",
      "圖片庫/2.png",
      "圖片庫/3.png",
      "圖片庫/4.png",
      "圖片庫/5.png"
    ],
    options: ["①②③", "①③", "②④⑤"],
    correct: 1
  },
  {
    question: "哪個排列順序是對的？",
    images: ["圖片庫/清分疊.png"],
    options: ["疊分清", "清疊分", "清分疊"],
    correct: 2
  },
  {
    question: "下列哪一項要與紙容器分開回收？",
    options: ["淋膜", "金屬", "保麗龍"],
    correct: 0
  }
];

let currentQuestion = 0;
const container = document.getElementById("question-container");
const nextBtn = document.getElementById("next-button");

function loadQuestion() {
  const q = questions[currentQuestion];
  let html = `<h3>${q.question}</h3>`;
  if (q.images) {
    html += `<div class="option-images">`;
    q.images.forEach(src => html += `<img src="${src}" alt="題目圖">`);
    html += `</div>`;
  }
  html += `<div id="options">`;
  q.options.forEach((opt,i)=>html+=`<button class="option" onclick="checkAnswer(${i})">${opt}</button>`);
  html += `</div>`;
  container.innerHTML = html;
}

function checkAnswer(i){
  const q = questions[currentQuestion];
  if(i === q.correct) alert("答對！");
  else alert("答錯！");
  nextBtn.classList.remove("hidden");
}

function nextQuestion(){
  currentQuestion++;
  if(currentQuestion >= questions.length){
    container.innerHTML = `<h2>遊戲結束！🎉</h2><a href="index.html" class="btn">返回首頁</a>`;
    nextBtn.classList.add("hidden");
  } else {
    nextBtn.classList.add("hidden");
    loadQuestion();
  }
}

if(container) loadQuestion();
