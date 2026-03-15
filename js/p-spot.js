(function(){
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('siteNav');
  const spacer = document.getElementById('nav-spacer');
  if(!header || !nav || !spacer) return;

  const THRESHOLD = 50; // 往下 50px 才顯示

  function setSpacer(){
    if(header.classList.contains('visible')){
      spacer.style.height = nav.offsetHeight + 'px';
    } else {
      spacer.style.height = '0px';
    }
  }

  function onScroll(){
    const y = window.scrollY || window.pageYOffset;
    if(y > THRESHOLD){
      header.classList.remove('hidden');
      header.classList.add('visible');
      nav.classList.add('nav-sticky'); // 保留你原 sticky
    } else {
      header.classList.add('hidden');
      header.classList.remove('visible');
      nav.classList.remove('nav-sticky');
    }
    setSpacer();
  }

  // 初始化
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', setSpacer);
})();


$(document).ready(function () {
  function toggleNavbarMethod() {
    if ($(window).width() > 992) {
      $('.navbar .dropdown').off('mouseenter mouseleave');

      $('.navbar .dropdown').on('mouseenter', function () {
        $(this).addClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'true');
        $(this).find('.dropdown-menu').addClass('show');
      });

      $('.navbar .dropdown').on('mouseleave', function () {
        $(this).removeClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'false');
        $(this).find('.dropdown-menu').removeClass('show');
      });

    } else {
      // 手機就交給 Bootstrap 點擊展開
      $('.navbar .dropdown').off('mouseenter mouseleave');
    }
  }

  toggleNavbarMethod();
  $(window).resize(toggleNavbarMethod);
});


















// ✅ 強制關掉 Pre Loader（避免一直轉圈圈）
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("show");
});




// ====== 你只需要改這個陣列：圖片/標題/日期/摘要/連結 ======
const POSTS = [
  {
    title: "玉井老街",
    date: "始於1764年",
    tag: "小鎮慢日常",
    excerpt: "玉井老街是感受小鎮日常的最佳起點，芒果季節、冰店與水果攤的香氣，讓街道熱鬧又充滿生活氣息。",
    image: "img/TSA00160i.jpg",
    href: "p-view.html"
  },
  {
    title: "有間冰舖芒果冰",
    date: "始於1992年",
    tag: "人氣芒果冰",
    excerpt: "玉井街角的冰舖，食材使用當季水果，保留下最純粹甜蜜的風味。",
    image: "img/DSCF3022i.jpg",
    href: "p-view2.html"
  },
  {
    title: "二空張家涼麵",
    date: "始於1963年",
    tag: "古早味涼麵",
    excerpt: "涼麵都是由李神父親手製作，品嚐的不只是美味，更有人情溫度。",
    image: "img/2023-09-30.jpg",
    href: "p-view3.html"
  },
  {
    title: "噍吧哖文化園區",
    date: "始於2015年",
    tag: "玉井歷史館",
    excerpt: "透過互動展覽與漫畫介紹，讓歷史近在眼前。此外，旁邊的淺山故事館還能回味玉井的故事。",
    image: "img/DSCF4593i.jpg",
    href: "p-view4.html"
  },
  {
    title: "玉井夜市",
    date: "始於1980年",
    tag: "夜裡的玉井",
    excerpt: "每週三和週六會有許多攤販聚集在此，從小型市集發展至今，它承載著玉井的生活記憶與山區娛樂文化。",
    image: "img/夜市.jpg",
    href: "p-view5.html"
  }
];

function createCard(post) {
  const card = document.createElement("article");
  card.className = "hp-card";
  card.tabIndex = 0;               // 讓卡片可被鍵盤選到
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `${post.title}，前往文章頁`);

  card.innerHTML = `
    <div class="hp-media">
      <img src="${post.image}" alt="${post.title}">
    </div>

    <div class="hp-body">
      <div class="hp-meta">
        <div class="hp-date">${post.date}</div>
        <div class="hp-pill">${post.tag}</div>
      </div>

      <div class="hp-title-row">
        <h2 class="hp-h2">${post.title}</h2>
        <div class="hp-arrow">→</div>
      </div>

      <p class="hp-excerpt">${post.excerpt}</p>
    </div>
  `;

  const go = () => window.location.href = post.href;

  // 滑鼠點擊
  card.addEventListener("click", go);

  // 鍵盤 Enter / Space
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  });

  return card;
}

function renderHomePosts() {
  const list = document.getElementById("hpList");
  if (!list) return;

  list.innerHTML = "";
  POSTS.forEach(p => list.appendChild(createCard(p)));
}

document.addEventListener("DOMContentLoaded", renderHomePosts);

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mHamburger');
  const menu = document.getElementById('mMenu');
  if (!btn || !menu) return;

  const isOpen = () => menu.classList.contains('is-open');

  const openMenu = () => {
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };

  btn.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });

  const socialToggle = document.querySelector('.m-social-toggle');
  const socialGroup = document.querySelector('.m-menu__social-group');

  if (socialToggle && socialGroup) {
    socialToggle.addEventListener('click', () => {
      const isSubOpen = socialGroup.classList.toggle('is-open');
      socialToggle.setAttribute('aria-expanded', isSubOpen ? 'true' : 'false');
    });
  }
});


