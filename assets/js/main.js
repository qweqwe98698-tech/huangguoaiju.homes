/**
 * 黄果短剧 (huangguoaiju.homes) - 高转化引流与核心交互引擎
 * 针对【光速云】(https://sahude.gsyvipaff.com/#/?code=keqgvT5Y) 深度定制
 */

(function () {
  'use strict';

  const GSY_CONFIG = {
    affiliateUrl: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    dwellTimeMs: 10000 // 10秒驻留自动弹窗
  };

  let hasOpenedModal = false;

  // 1. DOM 就绪处理
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  function initApp() {
    initMobileNav();
    initFilterTabs();
    initSmoothScroll();
    initGlobalClickInterceptor();
    initDwellTimer();
  }

  // 2. 移动端折叠菜单
  function initMobileNav() {
    const nav = document.querySelector('.nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. 分类标签切换
  function initFilterTabs() {
    const filterTabs = document.querySelectorAll('[data-filter]');
    const posterCards = document.querySelectorAll('.poster-card');
    if (!filterTabs.length || !posterCards.length) return;

    filterTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetCategory = tab.dataset.filter || 'all';

        filterTabs.forEach(t => {
          const isActive = t === tab;
          t.classList.toggle('is-active', isActive);
          t.setAttribute('aria-selected', String(isActive));
        });

        posterCards.forEach(card => {
          const cardType = card.dataset.type;
          const isVisible = targetCategory === 'all' || cardType === targetCategory;
          card.classList.toggle('is-hidden', !isVisible);
        });
      });
    });
  }

  // 4. 锚点平滑滚动
  function initSmoothScroll() {
    document.querySelectorAll('.site-header .nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId !== '#' && targetId !== '#download') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (history.pushState) history.pushState(null, '', targetId);
          }
        }
      });
    });
  }

  // 5. 复制剪贴板工具
  async function copyToClipboard(text) {
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        success = false;
      }
    }
    if (!success) {
      try {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.focus();
        temp.select();
        success = document.execCommand('copy');
        document.body.removeChild(temp);
      } catch (err) {
        success = false;
      }
    }
    return success;
  }

  // 6. 全局 Toast
  function showToast(message) {
    let toast = document.getElementById('gsyToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gsyToast';
      toast.className = 'gsy-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.removeAttribute('hidden');
    toast.style.setProperty('display', 'flex', 'important');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.setAttribute('hidden', '');
      toast.style.setProperty('display', 'none', 'important');
    }, 2800);
  }

  // 7. 弹窗控制函数
  function openConversionModal(title) {
    const modal = document.getElementById('gsyModal');
    const nameEl = document.getElementById('gsyDramaName');
    if (!modal) return;

    if (nameEl && title) {
      nameEl.textContent = title;
    }
    modal.removeAttribute('hidden');
    modal.style.setProperty('display', 'flex', 'important');
    document.body.style.overflow = 'hidden';
    hasOpenedModal = true;
  }

  function closeConversionModal() {
    const modal = document.getElementById('gsyModal');
    if (modal) {
      modal.setAttribute('hidden', '');
      modal.style.setProperty('display', 'none', 'important');
      document.body.style.overflow = '';
    }
  }

  function openWechatMask() {
    const mask = document.getElementById('wechatMask');
    if (mask) {
      mask.removeAttribute('hidden');
      mask.style.setProperty('display', 'flex', 'important');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeWechatMask() {
    const mask = document.getElementById('wechatMask');
    if (mask) {
      mask.setAttribute('hidden', '');
      mask.style.setProperty('display', 'none', 'important');
      document.body.style.overflow = '';
    }
  }

  // 8. 处理主注册按钮点击
  function handleAffiliateClick(e) {
    const ua = navigator.userAgent.toLowerCase();
    const isInApp = /micromessenger|mqqbrowser|weibo|ucbrowser/i.test(ua);

    if (isInApp) {
      if (e) e.preventDefault();
      copyToClipboard(GSY_CONFIG.affiliateUrl);
      openWechatMask();
      showToast('专属链接已复制！请点击右上角在浏览器中打开');
      return;
    }

    // 外部系统浏览器中：复制链接备用并允许 a 标签正常打开新窗口
    copyToClipboard(GSY_CONFIG.affiliateUrl);
    showToast('已复制专属注册链接！正在前往光速云...');
  }

  // 9. 【全局事件捕获器】：捕获一切看剧 / 下载 / 海报点击
  function initGlobalClickInterceptor() {
    // 监听 document 捕获阶段，确保不漏掉任何深层子元素
    document.addEventListener('click', function (e) {
      // (1) 弹窗内部关闭按钮
      if (e.target.closest('#gsyCloseBtn')) {
        e.preventDefault();
        e.stopPropagation();
        closeConversionModal();
        return;
      }

      // (2) 弹窗内部备用复制按钮
      if (e.target.closest('#gsyCopyBtn')) {
        e.preventDefault();
        e.stopPropagation();
        const copyBtn = document.getElementById('gsyCopyBtn');
        copyToClipboard(GSY_CONFIG.affiliateUrl).then(ok => {
          if (ok) {
            if (copyBtn) copyBtn.textContent = '✅ 已成功复制光速云注册链接';
            showToast('专属链接已复制！可在浏览器地址栏粘贴访问');
            setTimeout(() => {
              if (copyBtn) copyBtn.textContent = '📋 复制专属注册链接 (备用)';
            }, 3000);
          } else {
            showToast('复制失败，请长按链接手动复制');
          }
        });
        return;
      }

      // (3) 弹窗内部主直达按钮
      if (e.target.closest('#gsyGoBtn')) {
        handleAffiliateClick(e);
        return;
      }

      // (4) 微信防封遮罩内部按钮
      if (e.target.closest('#wechatCloseBtn')) {
        e.preventDefault();
        e.stopPropagation();
        closeWechatMask();
        return;
      }
      if (e.target.closest('#wechatCopyBtn')) {
        e.preventDefault();
        e.stopPropagation();
        copyToClipboard(GSY_CONFIG.affiliateUrl).then(() => {
          showToast('专属链接已复制！可在系统浏览器中粘贴');
        });
        return;
      }

      // (5) 点击弹窗黑色半透明背景空白处关闭
      if (e.target.id === 'gsyModal') {
        closeConversionModal();
        return;
      }
      if (e.target.id === 'wechatMask') {
        closeWechatMask();
        return;
      }

      // (6) 如果点击在弹窗卡片本体内部，不作拦截
      if (e.target.closest('.gsy-modal-dialog') || e.target.closest('.wechat-guide-box')) {
        return;
      }

      // (7) 放行顶部主要导航跳转 (首页、AI画境等，但排除“下载”)
      const navItem = e.target.closest('.site-header .nav a');
      if (navItem) {
        const href = navItem.getAttribute('href');
        if (href && href !== '#download') {
          return;
        }
      }

      // (8) 放行折叠菜单按钮与分类筛选 Tab
      if (e.target.closest('.menu-toggle') || e.target.closest('[data-filter]')) {
        return;
      }

      // (9) 放行 FAQ 折叠展开
      if (e.target.closest('.faq-item summary')) {
        return;
      }

      // (10) 【核心拦截点】：任何海报、播放键、下载、剧集卡片、榜单
      const trigger = e.target.closest(`
        .poster-card,
        .category-card,
        .editorial-card,
        .rank-list li,
        .review-card,
        .hero-poster,
        .hero-actions,
        .play-bubble,
        .image-play-link,
        .btn,
        .mobile-download a,
        .download-actions a,
        a[href="#download"],
        a[href="#featured"],
        a[href="#creator"]
      `);

      if (trigger) {
        e.preventDefault();
        e.stopPropagation();

        // 智能解析剧名
        let dramaName = '海外 4K 未删减原版短剧';
        const cardParent = trigger.closest('.poster-card, .category-card, .editorial-card, li, .hero, .download-card') || trigger;
        const heading = cardParent.querySelector('h3, h2, strong, .status');
        if (heading && heading.textContent.trim()) {
          dramaName = heading.textContent.trim().replace(/^《|》$/g, '');
        } else {
          const img = trigger.querySelector('img[alt]') || (trigger.tagName === 'IMG' ? trigger : null);
          if (img && img.alt) {
            dramaName = img.alt.replace(/封面|Logo/g, '').trim() || dramaName;
          }
        }

        openConversionModal(dramaName);
      }
    }, true); // capturing phase

    // ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeConversionModal();
        closeWechatMask();
      }
    });
  }

  // 10. 停留 10 秒主动弹窗
  function initDwellTimer() {
    setTimeout(() => {
      if (!hasOpenedModal) {
        openConversionModal('全网热门短剧 · 海外未删减专区');
      }
    }, GSY_CONFIG.dwellTimeMs);
  }

})();
