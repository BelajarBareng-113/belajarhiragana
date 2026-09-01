const tabs = document.querySelectorAll('.tab');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const mulaiBtn = document.getElementById('mulai');
const berhentiBtn = document.getElementById('berhenti');
const waktuSelect = document.getElementById('waktu');
const progressBar = document.getElementById('progress');
const benarEl = document.getElementById('benar');
const salahEl = document.getElementById('salah');
const modeInputs = document.querySelectorAll('input[name="mode"]');

let timer = null;
let timeTotal = waktuSelect.value;
let timeLeft = waktuSelect.value;
let currentMode = document.querySelector('input[name="mode"]:checked')?.value;
let benar = 0;
let salah = 0;


const data = {
  dasar: [
    {q: 'あ', a: 'a'}, {q: 'い', a: 'i'}, {q: 'う', a: 'u'}, {q: 'え', a: 'e'}, {q: 'お', a: 'o'},
    {q: 'か', a: 'ka'}, {q: 'き', a: 'ki'}, {q: 'く', a: 'ku'}, {q: 'け', a: 'ke'}, {q: 'こ', a: 'ko'},
    {q: 'さ', a: 'sa'}, {q: 'し', a: 'shi'}, {q: 'す', a: 'su'}, {q: 'せ', a: 'se'}, {q: 'そ', a: 'so'},
    {q: 'た', a: 'ta'}, {q: 'ち', a: 'chi'}, {q: 'つ', a: 'tsu'}, {q: 'て', a: 'te'}, {q: 'と', a: 'to'},
    {q: 'な', a: 'na'}, {q: 'に', a: 'ni'}, {q: 'ぬ', a: 'nu'}, {q: 'ね', a: 'ne'}, {q: 'の', a: 'no'},
    {q: 'は', a: 'ha'}, {q: 'ひ', a: 'hi'}, {q: 'ふ', a: 'fu'}, {q: 'へ', a: 'he'}, {q: 'ほ', a: 'ho'},
    {q: 'ま', a: 'ma'}, {q: 'み', a: 'mi'}, {q: 'む', a: 'mu'}, {q: 'め', a: 'me'}, {q: 'も', a: 'mo'},
    {q: 'や', a: 'ya'}, {q: 'ゆ', a: 'yu'}, {q: 'よ', a: 'yo'},
    {q: 'ら', a: 'ra'}, {q: 'り', a: 'ri'}, {q: 'る', a: 'ru'}, {q: 'れ', a: 're'}, {q: 'ろ', a: 'ro'},
    {q: 'わ', a: 'wa'}, {q: 'を', a: 'wo'}, {q: 'ん', a: 'n'}
  ],
  tenten: [
    {q: 'が', a: 'ga'}, {q: 'ぎ', a: 'gi'}, {q: 'ぐ', a: 'gu'}, {q: 'げ', a: 'ge'}, {q: 'ご', a: 'go'},
    {q: 'ざ', a: 'za'}, {q: 'じ', a: 'ji'}, {q: 'ず', a: 'zu'}, {q: 'ぜ', a: 'ze'}, {q: 'ぞ', a: 'zo'},
    {q: 'だ', a: 'da'}, {q: 'ぢ', a: 'ji'}, {q: 'づ', a: 'zu'}, {q: 'で', a: 'de'}, {q: 'ど', a: 'do'},
    {q: 'ば', a: 'ba'}, {q: 'び', a: 'bi'}, {q: 'ぶ', a: 'bu'}, {q: 'べ', a: 'be'}, {q: 'ぼ', a: 'bo'},
    {q: 'ぱ', a: 'pa'}, {q: 'ぴ', a: 'pi'}, {q: 'ぷ', a: 'pu'}, {q: 'ぺ', a: 'pe'}, {q: 'ぽ', a: 'po'}
  ],
  youon: [
    {q: 'きゃ', a: 'kya'}, {q: 'きゅ', a: 'kyu'}, {q: 'きょ', a: 'kyo'},
    {q: 'しゃ', a: 'sha'}, {q: 'しゅ', a: 'shu'}, {q: 'しょ', a: 'sho'},
    {q: 'ちゃ', a: 'cha'}, {q: 'ちゅ', a: 'chu'}, {q: 'ちょ', a: 'cho'},
    {q: 'にゃ', a: 'nya'}, {q: 'にゅ', a: 'nyu'}, {q: 'にょ', a: 'nyo'},
    {q: 'ひゃ', a: 'hya'}, {q: 'ひゅ', a: 'hyu'}, {q: 'ひょ', a: 'hyo'},
    {q: 'みゃ', a: 'mya'}, {q: 'みゅ', a: 'myu'}, {q: 'みょ', a: 'myo'},
    {q: 'りゃ', a: 'rya'}, {q: 'りゅ', a: 'ryu'}, {q: 'りょ', a: 'ryo'},
    {q: 'ぎゃ', a: 'gya'}, {q: 'ぎゅ', a: 'gyu'}, {q: 'ぎょ', a: 'gyo'},
    {q: 'じゃ', a: 'ja'}, {q: 'じゅ', a: 'ju'}, {q: 'じょ', a: 'jo'},
    {q: 'びゃ', a: 'bya'}, {q: 'びゅ', a: 'byu'}, {q: 'びょ', a: 'byo'},
    {q: 'ぴゃ', a: 'pya'}, {q: 'ぴゅ', a: 'pyu'}, {q: 'ぴょ', a: 'pyo'}
  ]
};

function getCurrentData() {
  if (currentMode === 'dasar') return data.dasar;
  if (currentMode === 'tenten') return data.tenten;
  return data.youon;
}

function updateUI() {
  const persen = ((timeTotal - timeLeft) / timeTotal) * 100;
  progressBar.style.width = persen + '%';
  if (persen > 85) {
    progressBar.classList.add('danger');
  } else {
    progressBar.classList.remove('danger');
  }
  benarEl.textContent = benar;
  salahEl.textContent = salah;
}

function newQuestion() {
  const list = getCurrentData();
  const item = list[Math.floor(Math.random() * list.length)];
  questionEl.textContent = item.q;
  questionEl.dataset.answer = item.a;
  answerEl.value = '';
  answerEl.focus();
}

function cekJawaban() {
  const jawaban = answerEl.value.toLowerCase().trim();
  if (jawaban === '') return;
  if (jawaban === questionEl.dataset.answer) { benar++; } else { salah++; }
  updateUI();
  newQuestion();
}

modeInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    currentMode = e.target.value;
  });
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

answerEl.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') cekJawaban();
});

mulaiBtn.addEventListener('click', () => {
  state(true);
  resetGame();
  timeTotal = parseInt(waktuSelect.value);
  timeLeft = timeTotal;
  newQuestion();
  updateUI();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateUI();
    if (timeLeft <= 0) {
      state(false);
      clearInterval(timer);
      questionEl.textContent = '-';
      alert(`Waktu habis! Benar: ${benar}, Salah: ${salah}`);
    }
  }, 1000);
});

berhentiBtn.addEventListener('click', () => {
  state(false);
  clearInterval(timer);
  questionEl.textContent = '-';
});

function resetGame() {
  clearInterval(timer);
  benar = 0;
  salah = 0;
  progressBar.style.width = '0%';
  progressBar.classList.remove('danger');
  updateUI();
}

function state(x) {
  // mulai
  if(x) {
    modeInputs.forEach(radio => {
      radio.disabled = true;
    });
    waktuSelect.disabled = true;
    answerEl.disabled = false;
    mulaiBtn.disabled = true;
    berhentiBtn.disabled = false;
  }
  // mati
  else {
    modeInputs.forEach(radio => {
      radio.disabled = false;
    });
    waktuSelect.disabled = false;
    answerEl.disabled = true;
    mulaiBtn.disabled = false;
    berhentiBtn.disabled = true;
  }
}

resetGame();
//newQuestion();
