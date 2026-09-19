// Some browsers (and stricter autoplay policies) silently ignore the
// declarative `autoplay` attribute, especially for video mounted off-screen
// or animated in. Calling `.play()` imperatively once the element is ready
// is the reliable cross-browser way to start muted background video.
export function initAutoplayVideo(el: HTMLVideoElement | null) {
  if (!el) return;
  el.muted = true;
  const playPromise = el.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // Autoplay can still be blocked (e.g. data-saver mode); fail silently,
      // the poster frame remains a reasonable fallback.
    });
  }
}
