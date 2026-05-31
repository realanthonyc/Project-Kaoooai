const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = form.querySelector("[data-form-result]");
    if (result) {
      result.textContent = "送信ありがとうございます。担当者より1営業日以内にご連絡します。";
    }
    form.reset();
  });
});

document.querySelectorAll(".footer-links a").forEach((link) => {
  const label = link.textContent.trim();
  if (label === "会社概要") {
    link.href = "https://www.istart.co.jp/about.html";
    link.target = "_blank";
    link.rel = "noopener";
  }
  if (label === "セキュリティ方針") {
    link.href = "security.html";
  }
  if (label === "セキュリティ要件の相談") {
    link.href = "contact.html?intent=security";
  }
});

document.querySelectorAll(".site-footer .footer-grid > div:first-child").forEach((footerIntro) => {
  if (footerIntro.querySelector(".footer-company-note")) return;
  const note = document.createElement("div");
  note.className = "footer-company-note";
  note.innerHTML = "<strong>提供会社：</strong>創点株式会社";
  footerIntro.appendChild(note);
});

document.querySelectorAll("[data-roi-calculator]").forEach((calculator) => {
  const teamInput = calculator.querySelector("[data-roi-team]");
  const rateInput = calculator.querySelector("[data-roi-rate]");
  const monthInput = calculator.querySelector("[data-roi-month]");
  const reductionInput = calculator.querySelector("[data-roi-reduction]");
  const teamLabel = calculator.querySelector("[data-roi-team-label]");
  const rateLabel = calculator.querySelector("[data-roi-rate-label]");
  const monthLabel = calculator.querySelector("[data-roi-month-label]");
  const reductionLabel = calculator.querySelector("[data-roi-reduction-label]");
  const savingLabel = calculator.querySelector("[data-roi-saving]");
  const manualBar = calculator.querySelector("[data-roi-manual-bar]");
  const kaoooaiBar = calculator.querySelector("[data-roi-kaoooai-bar]");

  if (!teamInput || !rateInput || !monthInput || !reductionInput || !teamLabel || !rateLabel || !monthLabel || !reductionLabel || !savingLabel || !manualBar || !kaoooaiBar) return;

  const formatManYen = (value) => {
    const man = Math.round(value / 10000);
    if (man >= 10000) {
      const oku = Math.floor(man / 10000);
      const rest = man % 10000;
      return rest ? `${oku}億${rest.toLocaleString("ja-JP")}万円` : `${oku}億円`;
    }
    return `${man.toLocaleString("ja-JP")}万円`;
  };

  const updateRoi = () => {
    const team = Number(teamInput.value);
    const rate = Number(rateInput.value) * 10000;
    const months = Number(monthInput.value);
    const reduction = Number(reductionInput.value) / 100;
    const manual = team * rate * months;
    const kaoooai = manual * (1 - reduction);
    const saving = manual - kaoooai;

    teamLabel.textContent = `${team}名`;
    rateLabel.textContent = `${Number(rateInput.value)}万円`;
    monthLabel.textContent = `${months}か月`;
    reductionLabel.textContent = `${Number(reductionInput.value)}%`;
    savingLabel.textContent = formatManYen(saving);
    manualBar.textContent = formatManYen(manual);
    kaoooaiBar.textContent = formatManYen(kaoooai);
    manualBar.style.width = "100%";
    kaoooaiBar.style.width = `${Math.max(14, (kaoooai / manual) * 100)}%`;
  };

  [teamInput, rateInput, monthInput, reductionInput].forEach((input) => input.addEventListener("input", updateRoi));
  updateRoi();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Intent-based URL parameters parser and interactive card switcher for the contact/inquiry page
(function() {
  const selectTopic = document.querySelector("select[name='topic']");
  if (!selectTopic) return;

  const intentCards = document.querySelectorAll(".intent-card");
  const pageTitleH1 = document.querySelector(".page-title h1");
  const pageTitleP = document.querySelector(".page-title p");
  const messageField = document.querySelector("textarea[name='message']");
  
  const applyIntent = (intent, syncSelect = true) => {
    // Reset active styles
    intentCards.forEach(c => c.classList.remove("is-active"));

    if (intent === "material") {
      if (syncSelect) selectTopic.value = "資料がほしい";
      if (intentCards[0]) intentCards[0].classList.add("is-active");
      if (pageTitleH1) pageTitleH1.textContent = "資料請求";
      if (pageTitleP) pageTitleP.textContent = "Kaoooaiのサービス概要資料、PoC検討ガイド、セキュリティ確認シートをお送りします。以下のフォームよりお申し込みください。";
      if (messageField) {
        messageField.placeholder = "特定の知りたい内容や、自社の開発環境に関するご要望などがあればご記入ください（任意）。";
      }
    } else if (intent === "demo") {
      if (syncSelect) selectTopic.value = "デモ相談を希望";
      if (intentCards[1]) intentCards[1].classList.add("is-active");
      if (pageTitleH1) pageTitleH1.textContent = "個別デモ相談";
      if (pageTitleP) pageTitleP.textContent = "実際の画面操作や、ご指定いただいた要件・規約に対するコード自動生成・E2Eテスト実行の様子をライブでお見せします。";
      if (messageField) {
        messageField.placeholder = "現在の開発課題、対象システム、希望時期などをご記入ください。";
      }
    } else if (intent === "poc") {
      if (syncSelect) selectTopic.value = "PoCを相談したい";
      if (intentCards[1]) intentCards[1].classList.add("is-active");
      if (pageTitleH1) pageTitleH1.textContent = "PoC（共同検証）相談";
      if (pageTitleP) pageTitleP.textContent = "貴社のソースコードや開発ルールを用いて、どの程度の削減効果が得られるかを短期間で安全に検証するための計画をご提案します。";
      if (messageField) {
        messageField.placeholder = "現在の開発課題、対象システム、希望時期などをご記入ください。";
      }
    } else if (intent === "letter") {
      if (syncSelect) selectTopic.value = "メールマガジンを購読したい";
      if (intentCards[2]) intentCards[2].classList.add("is-active");
      if (pageTitleH1) pageTitleH1.textContent = "メールマガジン購読";
      if (pageTitleP) pageTitleP.textContent = "AIエージェントの動向、PoCの進め方、開発規約・品質レビュー標準化に関する情報をお届けします。";
      if (messageField) {
        messageField.placeholder = "知りたいテーマや、日頃の開発業務における課題などがあればご記入ください（任意）。";
      }
    } else if (intent === "security") {
      if (syncSelect) selectTopic.value = "セキュリティ要件を確認したい";
      if (pageTitleH1) pageTitleH1.textContent = "セキュリティ要件の確認";
      if (pageTitleP) pageTitleP.textContent = "非学習、国内環境、権限管理、監査ログ、個人情報除去、Local AI構成など、導入前に必要な確認事項をご相談ください。";
      if (messageField) {
        messageField.placeholder = "確認したいセキュリティ要件、利用環境、社内審査で必要な資料などをご記入ください。";
      }
    }
  };

  // 1. Initial page load parsing
  const urlParams = new URLSearchParams(window.location.search);
  const intent = urlParams.get("intent");
  applyIntent(intent || "demo");

  // 2. Click event listeners on cards
  if (intentCards[0]) {
    intentCards[0].addEventListener("click", () => applyIntent("material"));
  }
  if (intentCards[1]) {
    intentCards[1].addEventListener("click", () => {
      // Toggle between PoC and Demo, defaulting to Demo
      const currentVal = selectTopic.value;
      if (currentVal === "PoCを相談したい") {
        applyIntent("poc");
      } else {
        applyIntent("demo");
      }
    });
  }
  if (intentCards[2]) {
    intentCards[2].addEventListener("click", () => applyIntent("letter"));
  }

  // 3. Sync select dropdown change events back to cards
  selectTopic.addEventListener("change", () => {
    const val = selectTopic.value;
    if (val === "資料がほしい") {
      applyIntent("material", false);
    } else if (val === "デモ相談を希望") {
      applyIntent("demo", false);
    } else if (val === "PoCを相談したい") {
      applyIntent("poc", false);
    } else if (val === "メールマガジンを購読したい") {
      applyIntent("letter", false);
    } else if (val === "セキュリティ要件を確認したい") {
      applyIntent("security", false);
    } else {
      // Reset intent active card if they choose other things like "security"
      intentCards.forEach(c => c.classList.remove("is-active"));
    }
  });
})();

// 1. Hero Video Modal Controls
(function() {
  const trigger = document.querySelector("[data-video-trigger]");
  const modal = document.getElementById("video-modal");
  const closeBtn = document.querySelector("[data-video-close]");

  if (trigger && modal) {
    trigger.addEventListener("click", () => {
      modal.showModal();
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.close();
    });
  }

  if (modal) {
    // Close modal when clicking outside on the backdrop
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });
  }
})();


// 2. Fixed Bottom Floating CTA Banner (Scroll & Close)
(function() {
  const cta = document.getElementById("floating-cta");
  const closeBtn = document.querySelector("[data-cta-close]");

  if (!cta) return;

  const handleScroll = () => {
    const footer = document.querySelector(".site-footer");
    const footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight - 24 : false;
    if (window.scrollY > 320 && !footerVisible && sessionStorage.getItem("floating-cta-dismissed") !== "true") {
      cta.classList.add("is-visible");
    } else {
      cta.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", handleScroll);

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      cta.classList.remove("is-visible");
      sessionStorage.setItem("floating-cta-dismissed", "true");
      // Remove scroll listener to conserve resources
      window.removeEventListener("scroll", handleScroll);
    });
  }
})();


// 3. Global Live Chat Widget Bot Logic
(function() {
  const toggleBtn = document.querySelector("[data-chat-toggle]");
  const windowEl = document.getElementById("chat-window");
  const bodyEl = document.getElementById("chat-body");
  const inputEl = document.querySelector("[data-chat-input]");
  const sendBtn = document.querySelector("[data-chat-send]");
  const optButtons = document.querySelectorAll("[data-chat-opt]");

  if (!toggleBtn || !windowEl || !bodyEl) return;

  const avatar = windowEl.querySelector(".chat-avatar");
  if (avatar) avatar.textContent = "AI";
  optButtons.forEach((btn) => {
    const type = btn.getAttribute("data-chat-opt");
    if (type === "material") btn.textContent = "サービス紹介資料をもらう";
    if (type === "demo") btn.textContent = "画面デモ・PoCの日程調整";
    if (type === "custom") btn.textContent = "直接メッセージを入力する";
  });

  // Toggle chat widget opening
  toggleBtn.addEventListener("click", () => {
    const isActive = windowEl.classList.toggle("is-active");
    toggleBtn.classList.toggle("is-open");

    if (isActive) {
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }
  });

  const appendMessage = (sender, text) => {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text;
    bodyEl.appendChild(msg);
    bodyEl.scrollTop = bodyEl.scrollHeight;
    return msg;
  };

  const showBotReply = (text, delay = 800) => {
    // Show bot typing indicator
    const typing = appendMessage("bot", '<span style="color:#718096; font-style:italic;">入力中...</span>');

    setTimeout(() => {
      typing.remove();
      appendMessage("bot", text);
    }, delay);
  };

  // Handle Quick-Select Options
  optButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-chat-opt");
      const optionText = btn.textContent;

      // 1. Append user bubble
      appendMessage("user", optionText);

      // 2. Hide option selectors
      const optionsContainer = document.querySelector(".chat-options");
      if (optionsContainer) {
        optionsContainer.style.display = "none";
      }

      // 3. Process bot answer
      if (type === "material") {
        showBotReply(`
          Kaoooaiのサービス資料やPoC計画ガイドをご検討ですね。<br>
          以下のフォームからお申し込みいただけます。<br><br>
          <a class="button primary" href="contact.html?intent=material" style="display:inline-flex; align-items:center; justify-content:center; padding:6px 14px; font-size:12px; height:32px;">資料請求フォームへ ➔</a>
        `);
      } else if (type === "demo") {
        showBotReply(`
          画面デモやPoC（共同検証）のご相談ですね。<br>
          ご希望の日程や検証要件を、以下のフォームからご登録ください。担当者より調整のご案内をいたします。<br><br>
          <a class="button primary" href="contact.html?intent=demo" style="display:inline-flex; align-items:center; justify-content:center; padding:6px 14px; font-size:12px; height:32px;">デモ相談フォームへ ➔</a>
        `);
      } else if (type === "custom") {
        showBotReply("下の入力欄からメッセージを入力して送信してください。");
        // Enable input
        if (inputEl && sendBtn) {
          inputEl.removeAttribute("disabled");
          sendBtn.removeAttribute("disabled");
          inputEl.focus();
        }
      }
    });
  });

  // Handle Custom Message Submission
  const handleCustomSend = () => {
    const val = inputEl.value.trim();
    if (!val) return;

    appendMessage("user", val);
    inputEl.value = "";

    showBotReply("お問い合わせありがとうございます。対応範囲、セキュリティ確認、料金プランについては、担当者より1営業日以内を目安にメールでご連絡します。<br><br>詳細なご要件がお決まりの場合は、<a href='contact.html' style='color:var(--blue);text-decoration:underline;font-weight:700;'>お問い合わせフォーム</a>もあわせてご利用ください。");
  };

  if (sendBtn && inputEl) {
    sendBtn.addEventListener("click", handleCustomSend);
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleCustomSend();
      }
    });
  }
})();

// 4. Looping Article Hero Carousel Logic
(function() {
  const carousel = document.getElementById("article-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const dots = carousel.querySelectorAll(".carousel-dot");
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const slideCount = slides.length;
  let autoplayTimer = null;

  const updateCarousel = (index) => {
    if (index < 0) {
      currentSlide = slideCount - 1;
    } else if (index >= slideCount) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      updateCarousel(currentSlide + 1);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      updateCarousel(currentSlide - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      updateCarousel(currentSlide + 1);
      startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-slide-index"), 10);
      if (!isNaN(index)) {
        updateCarousel(index);
        startAutoplay();
      }
    });
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  updateCarousel(0);
  startAutoplay();
})();

