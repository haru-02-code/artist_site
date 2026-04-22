// script.js

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  if (nav.classList.contains("open")) {
    // 閉じる動作
    nav.classList.remove("open");
    nav.classList.add("closing");
    menuBtn.classList.remove("open");

    // アニメーション終了後に完全非表示に
    setTimeout(() => {
      nav.classList.remove("closing");
    }, 500); // CSSのtransition時間と合わせる
  } else {
    // 開く動作
    nav.classList.add("open");
    menuBtn.classList.add("open");
  }
});


// アニメーション
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.fade-in-up');
  if (!('IntersectionObserver' in window)) {
    // 古いブラウザではとりあえず全表示（ポリフィルを入れるのが望ましい）
    targets.forEach(t => t.classList.add('show'));
    return;
  }

  // スクロール向き判定用（scrollイベントで常に最新の位置を保持）
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let currentScrollY = lastScrollY;
  window.addEventListener('scroll', () => {
    currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      // 現在のスクロール向き（下スクロールなら true）
      const scrollingDown = currentScrollY > lastScrollY;

      if (entry.isIntersecting) {
        if (scrollingDown) {
          // ↓ 下スクロールで入った → アニメありで表示
          el.classList.add('show');
        } else {
          // ↑ 上スクロールで入った → アニメなしで瞬時に表示
          el.classList.add('no-transition');
          el.classList.add('show');
          // 強制レイアウト更新（ブラウザに即時反映させる）
          el.getBoundingClientRect();
          // 次回以降にアニメが効くよう少ししてから no-transition を外す
          setTimeout(() => el.classList.remove('no-transition'), 20);
        }
      } else {
        // ビューポート外に出たら常に非表示に戻す（次の下スクロールで再アニメ）
        el.classList.remove('show');
        el.classList.remove('no-transition');
      }
    });

    // IntersectionObserver 呼ばれた時点で lastScrollY を更新しておく
    lastScrollY = currentScrollY;
  }, {
    threshold: 0.15 // 要素が15%見えたら発火（調整可）
  });

  targets.forEach(t => observer.observe(t));
});