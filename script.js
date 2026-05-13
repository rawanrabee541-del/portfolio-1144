// 1. Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
if(themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });
}

// 2. Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
if(menuBtn) menuBtn.addEventListener('click', () => navbar.classList.toggle('show'));

// 3. Doctors Data + Rating
const doctors = [
  { id: 1, name: 'د. أحمد سعيد', spec: 'قلب', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop', exp: '15 سنة', rating: 4.9, votes: 120 },
  { id: 2, name: 'د. منى فاروق', spec: 'أطفال', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1374&auto=format&fit=crop', exp: '12 سنة', rating: 4.8, votes: 95 },
  { id: 3, name: 'د. خالد رمزي', spec: 'عظام', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop', exp: '20 سنة', rating: 5.0, votes: 200 },
  { id: 4, name: 'د. سارة علي', spec: 'قلب', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop', exp: '10 سنوات', rating: 4.7, votes: 80 },
];

const doctorsGrid = document.getElementById('doctors-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function displayDoctors(filter = 'all') {
  if(!doctorsGrid) return;
  doctorsGrid.innerHTML = '';
  const filtered = filter === 'all' ? doctors : doctors.filter(d => d.spec === filter);
  filtered.forEach(doc => {
    doctorsGrid.innerHTML += `
      <div class="card">
        <img src="${doc.img}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin:1rem auto">
        <h3>${doc.name}</h3>
        <p>استشاري ${doc.spec} | ${doc.exp} خبرة</p>
        <div class="rating" data-doctor="${doc.id}">
          ${generateStars(doc.rating)}
          <span>(${doc.votes} تقييم)</span>
        </div>
        <a href="#appointment" class="btn-primary" style="padding:8px 20px;font-size:.9rem;margin-bottom:1rem">احجز</a>
      </div>`;
  });
  addRatingListeners();
}

function generateStars(rating) {
  let stars = '';
  for(let i = 1; i <= 5; i++) {
    if(i <= Math.floor(rating)) stars += `<i class="fa-solid fa-star"></i>`;
    else if(i - 0.5 <= rating) stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
    else stars += `<i class="fa-regular fa-star"></i>`;
  }
  return stars + ` ${rating}`;
}

function addRatingListeners() {
  document.querySelectorAll('.rating').forEach(ratingDiv => {
    ratingDiv.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-star')) {
        const docId = ratingDiv.dataset.doctor;
        alert(`شكراً لتقييمك الدكتور! سيتم مراجعة التقييم`);
      }
    });
  });
}

if(doctorsGrid) displayDoctors();

if(filterBtns) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayDoctors(btn.dataset.filter);
    });
  });
}

// 4. Chatbot
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-msg');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

if(chatbotIcon) {
  chatbotIcon.addEventListener('click', () => chatbotWindow.classList.toggle('show'));
  closeChat.addEventListener('click', () => chatbotWindow.classList.remove('show'));
}

function sendMessage() {
  const msg = userInput.value.trim();
  if(msg === '') return;
  
  chatMessages.innerHTML += `<div class="user-msg">${msg}</div>`;
  userInput.value = '';
  
  setTimeout(() => {
    let reply = getBotReply(msg);
    chatMessages.innerHTML += `<div class="bot-msg">${reply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
}

function getBotReply(msg) {
  msg = msg.toLowerCase();
  if(msg.includes('موعد') || msg.includes('حجز')) return 'تقدر تحجز موعد من قسم "احجز موعد" في الموقع. اختار القسم والتاريخ المناسب وهيجيلك تأكيد فوراً 📅';
  if(msg.includes('طوارئ') || msg.includes('اسعاف')) return 'للطوارئ اتصل على 123 فوراً. موقعنا في Basandilah مفتوح 24 ساعة 🚑';
  if(msg.includes('مكان') || msg.includes('عنوان')) return 'عنواننا: Basandilah, Dakahlia, Egypt. هتلاقي الخريطة في الموقع تحت 📍';
  if(msg.includes('دكتور') || msg.includes('تخصص')) return 'عندنا دكاترة في القلب، العظام، الأطفال، والمخ والأعصاب. شوف قسم "الأطباء" واختار اللي يناسبك 👨‍⚕️';
  if(msg.includes('تحليل') || msg.includes('نتيجة')) return 'نتائج التحاليل بتظهر في "بوابة المريض". سجل دخول برقم الملف الطبي وهتلاقي كل تقاريرك 📊';
  return 'مفهمتش سؤالك بالظبط. ممكن تسأل عن: المواعيد، الطوارئ، مكان المستشفى، أو التخصصات المتاحة 😊';
}

if(sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });
}

// 5. Scroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.animation = 'fadeInUp 1s forwards';
  });
});
document.querySelectorAll('.card, .section-title').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

const style = document.createElement('style');
style.innerHTML = `@keyframes fadeInUp { from {opacity:0; transform:translateY(30px)} to {opacity:1; transform:translateY(0)} }`;
document.head.appendChild(style);