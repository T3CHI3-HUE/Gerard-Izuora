// Builds the showcased work list (all MP4s) for the gallery.
// NOTE: To avoid fetch issues when opening via file://, we generate the list directly.
const DEFAULT_THUMB = "./images/image0 (3).jpeg";

const work = [

  { title: "Legacy Sport", description: "LaLiga Street Banter.", tags: ["reels"], videoSrc: "./images/1b22230c-e364-4375-80cb-44ea85830ff7.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Flour Mills of Nigeria", description: "Business Day.", tags: ["corporate"], videoSrc: "./images/4a820522-2acc-449f-8df5-0668f232a272.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Photo Shoot", description: "Behind the Scenes.", tags: ["behind"], videoSrc: "./images/5ca81997-3f0c-4b23-b039-401b517bc2dd.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Flour Mills of Nigeria", description: "64th General Meeting.", tags: ["corporate"], videoSrc: "./images/5cb376f3-dc22-4fe8-838a-467570dc901b.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "WAKA ", description: "Work out and Exercise.", tags: ["reels"], videoSrc: "./images/5f7cd1d0-ae59-4f47-8c25-7a28c289a84e.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Flour Mills of Nigeria", description: "Exhibition.", tags: ["reels"], videoSrc: "./images/19eddf7a-1a5d-4f13-af25-fc04409f3381.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Eki Silk", description: "Fashion.", tags: ["behind"], videoSrc: "./images/65ee5e13-9519-4c66-981c-258bd6e9788a.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Legacy Sport", description: "LaLiga.", tags: ["reels"], videoSrc: "./images/137a106d-1b3d-4d94-9644-c9f6e9a03ba6.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Legacy Sport", description: "LaLiga.", tags: ["reels"], videoSrc: "./images/869a8cf0-dd42-417c-891a-532e8aec7cd4.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Social events", description: "Wedding Proposal.", tags: ["highlight"], videoSrc: "./images/2887bb6e-8106-49bb-b2e3-f13545a1a9f5.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Indomie", description: "The fan club.", tags: ["highlight"], videoSrc: "./images/74752402-1674-4487-8f75-80e462a18c01.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Legacy Sport", description: "LaLiga.", tags: ["reels"], videoSrc: "./images/b886fc70-e13f-4d6f-9a77-54bbc3b1a487.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Eki Silk", description: "GTCO fashion week.", tags: ["reels"], videoSrc: "./images/df8379d7-de4e-45e7-b0d0-0da3d584996e.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Eki Silk", description: "Fashion.", tags: ["behind"], videoSrc: "./images/e355aeb5-b2b2-422e-b4ef-f0709a06f082.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "WAKA", description: "Work out and Exercise.", tags: ["reels"], videoSrc: "./images/ecb54973-6d0d-4bce-b512-ec496be94ba1.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Closer Pictures", description: "Creative Economy Practice.", tags: ["highlight"], videoSrc: "./images/f6ee242e-5c82-455e-bd9f-93f4693a048d.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Social Event", description: "Social Event.", tags: ["Video"], videoSrc: "./images/f78f538f-c254-4d60-b28d-ea945a64d5b6.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Masha Music Academy", description: "2025 Recital.", tags: ["highlight"], videoSrc: "./images/faa815e3-5a9b-47cf-8cd0-dfac14e297de.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "BRAS MARINE", description: "Promotional video", tags: ["reels"], videoSrc: "./images/61e764a8-241d-43b1-baad-b1df0eec2d22.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Flour Mills of Nigeria", description: "Golden Penny.", tags: ["corporate"], videoSrc: "./images/eb420ce5-ffe3-4f8f-9719-a55d350f85a2.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Fiducia", description: "Fiducia", tags: ["corporate"], videoSrc: "./images/93e5a091-0843-42cd-831f-13b4cb97529e.MP4", thumbSrc: DEFAULT_THUMB },
  { title: "Legacy Sport", description: "LaLiga", tags: ["Video"], videoSrc: "./images/0c22f32d-c9ab-4654-9428-d8108ce79756.MP4", thumbSrc: DEFAULT_THUMB }
];







const elWorkGrid = document.getElementById("workGrid");
const viewMoreBtn = document.getElementById("viewMoreBtn");
const hideBtn = document.getElementById("hideBtn");

const INITIAL_VISIBLE_COUNT = 6;
let visibleCount = INITIAL_VISIBLE_COUNT;
const template = document.getElementById("workCardTemplate");
const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const modalCloseBtn = document.getElementById("videoModalClose");

// Ensure the modal video element exists.
if (!modal || !modalVideo || !modalCloseBtn) {
  console.error("Missing modal elements (#modal / #modalVideo / #videoModalClose)");
}



function safeSetText(node, text) {
node.textContent = (text !== null && text !== undefined) ? text : "";
}

let activeFilter = "all";

function matchesFilter(item) {
  if (activeFilter === "all") return true;

  const tags = Array.isArray(item.tags) ? item.tags.map((t) => String(t).toLowerCase()) : [];

  if (activeFilter === "behind") return tags.includes("behind");
  if (activeFilter === "reels") return tags.includes("reels");
  if (activeFilter === "highlight") return tags.includes("highlight");
  if (activeFilter === "corporate") return tags.includes("corporate");

  // If filter doesn't match anything, fall back to all visible.

  return true;
}


function renderCards() {
  if (!elWorkGrid || !template) return;

  elWorkGrid.innerHTML = "";

  const filtered = work.filter(matchesFilter);
  const itemsToRender = filtered.slice(0, visibleCount);


  for (const item of itemsToRender) {
    const card = template.content.cloneNode(true);

    const article = card.querySelector(".work-card");
    const btn = card.querySelector("button[data-video]");


    const thumb = card.querySelector("img[data-thumb]");

    const title = card.querySelector("h3[data-title]");
    const desc = card.querySelector("p[data-desc]");
    const actions = card.querySelector("a[data-watch-link]");

    const tagWrap = card.querySelector(".work-tags");


    if (thumb) {
      // Use the existing thumbnail so covers are never blank.
      thumb.src = item.thumbSrc || DEFAULT_THUMB;
      thumb.alt = item.title || "";
    }

    if (title) safeSetText(title, item.title);
    if (desc) safeSetText(desc, item.description);

    if (tagWrap) {
      tagWrap.innerHTML = "";
      for (const t of item.tags) {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = t;
        tagWrap.appendChild(span);
      }
    }

    if (btn) {
      btn.dataset.video = item.videoSrc;
      btn.addEventListener("click", () => openModalWithVideo(item));
    }

    // If user clicks anywhere on the card, play in modal
    if (article) {
      article.addEventListener("click", () => openModalWithVideo(item));
    }

    // Make the watch link point to the video
    if (actions) {
      actions.href = item.videoSrc;
    }


    elWorkGrid.appendChild(card);

    // Improve accessibility: allow Enter/Space on card itself
    if (article) {
      article.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModalWithVideo(item);

        }
      });
    }
  }
}

async function captureFirstFrameToPoster(videoEl, videoSrc) {
  // Best-effort: load the video, wait for first frame to be available, draw to canvas,
  // and set poster on the given element. This works better than relying on the browser
  // to expose a first paused frame as a thumbnail.
  try {
    // Reset
    videoEl.pause();
    videoEl.removeAttribute("poster");
    videoEl.src = videoSrc;

    await new Promise((resolve) => {
      const onLoaded = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        resolve();
      };
      const cleanup = () => {
        videoEl.removeEventListener("loadeddata", onLoaded);
        videoEl.removeEventListener("error", onError);
      };

      videoEl.addEventListener("loadeddata", onLoaded);
      videoEl.addEventListener("error", onError);

      // Trigger load
      videoEl.load();
    });

    // Seek to 0 to ensure the frame is near the beginning
    await new Promise((resolve) => {
      const onSeeked = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        resolve();
      };
      const cleanup = () => {
        videoEl.removeEventListener("seeked", onSeeked);
        videoEl.removeEventListener("error", onError);
      };

      videoEl.addEventListener("seeked", onSeeked);
      videoEl.addEventListener("error", onError);

      // Some browsers require time for metadata; try-catch protects.
      try {
        videoEl.currentTime = 0;
      } catch (e) {
        // Ignore
        cleanup();
        resolve();
      }
    });

    const w = videoEl.videoWidth || 640;
    const h = videoEl.videoHeight || 360;
    if (!w || !h) return null;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(videoEl, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.72);
  } catch (e) {
    return null;
  }
}

async function openModalWithVideo(item) {
  if (!modal || !modalVideo) return;

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");

  modalVideo.pause();

  // Replace sources
  modalVideo.querySelectorAll("source").forEach((s) => s.remove());

  const source = document.createElement("source");
  source.src = item.videoSrc;
  source.type = "video/mp4";
  modalVideo.appendChild(source);

  // Force poster to match the video's first rendered frame (works when local).
  // This also keeps the modal from showing a stale/blank frame.
  const posterDataUrl = await captureFirstFrameToPoster(modalVideo, item.videoSrc);
  if (posterDataUrl) modalVideo.poster = posterDataUrl;

  modalVideo.load();
  modalVideo.play().catch(() => {
    // Ignore autoplay/playing errors; user can press play.
  });
}

function closeModal() {
  if (!modal || !modalVideo) return;

  modal.setAttribute("aria-hidden", "true");
  modal.hidden = true;

  modalVideo.pause();
  modalVideo.querySelectorAll("source").forEach((s) => s.remove());
}


function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

initYear();

// Modal interactions
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function syncViewMoreButtons() {
  if (!viewMoreBtn || !hideBtn) return;

  const total = work.filter(matchesFilter).length;


  if (total <= INITIAL_VISIBLE_COUNT) {
    viewMoreBtn.hidden = true;
    hideBtn.hidden = true;
    return;
  }

  const showingAll = visibleCount >= total;
  viewMoreBtn.hidden = showingAll;
  hideBtn.hidden = !showingAll;
}

if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    visibleCount = work.filter(matchesFilter).length;
    renderCards();
    syncViewMoreButtons();
  });
}


if (hideBtn) {
  hideBtn.addEventListener("click", () => {
    visibleCount = INITIAL_VISIBLE_COUNT;
    renderCards();
    syncViewMoreButtons();
  });
}

const filterBar = document.querySelector(".filter-bar");
if (filterBar) {
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;

    activeFilter = btn.dataset.filter || "all";

    // Update button state
    filterBar.querySelectorAll(".filter-btn").forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("is-active", isActive);
    });

    visibleCount = INITIAL_VISIBLE_COUNT;
    renderCards();
    syncViewMoreButtons();
  });
}


renderCards();
syncViewMoreButtons();




