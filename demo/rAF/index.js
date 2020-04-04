var latestKnownScrollY = 0,
    ticking = false,
    item = document.querySelectorAll('.item');

function update() {
  // 重置ticking
  ticking = false;
  item[0].style.width = latestKnownScrollY + 100 + 'px';
}

function onScroll() {
    latestKnownScrollY = window.scrollY;
    requestTick();
}

// rAF
function requestTick() {
    if(!ticking) {
        requestAnimationFrame(update);
    }
    ticking = true;
}

 window.addEventListener('scroll', onScroll, false);


// THROTTLE

function throttled_version() {
   item[1].style.width = window.scrollY + 100 + 'px';
}

 window.addEventListener('scroll', _.throttle(throttled_version, 16), false);
