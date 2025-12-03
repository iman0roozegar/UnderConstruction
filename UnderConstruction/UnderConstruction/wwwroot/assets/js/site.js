//If browser is mobile
function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Regex to check for common mobile device names
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}


// carousel.js

// Keep track of all carousels with their dotnet refs keyed by id
const carousels = new Map();

let resizeListener = null;

// 👇 **CORRECTED LOGIC** to match the new 5-step layout
function calculateVisibleCount() {
    // Corresponds to xl:w-1/5 (≥1280px)
    if (window.innerWidth >= 1280) return 5;
    // Corresponds to lg:w-1/4 (≥1024px)
    if (window.innerWidth >= 1024) return 4;
    // Corresponds to md:w-1/3 (≥768px)
    if (window.innerWidth >= 768) return 3;
    // Corresponds to sm:w-1/2 (≥640px)
    if (window.innerWidth >= 640) return 2;
    // Corresponds to w-full (<640px)
    return 1;
}

function onResize() {
    const count = calculateVisibleCount();
    carousels.forEach((dotNetObjectRef) => {
        dotNetObjectRef.invokeMethodAsync('UpdateVisibleCount', count)
            .catch(() => { /* Handle errors */ });
    });
}

window.initializeCarousel = (id, dotNetObjectReference) => {
    carousels.set(id, dotNetObjectReference);
    if (!resizeListener) {
        resizeListener = onResize;
        window.addEventListener('resize', resizeListener);
    }
    onResize();
};

window.disposeCarousel = (id) => {
    carousels.delete(id);
    if (carousels.size === 0 && resizeListener) {
        window.removeEventListener('resize', resizeListener);
        resizeListener = null;
    }
};





// Blobs
const blobStates = [];

window.initBlobs = function () {
    const isMobile = window.innerWidth < 768;

    const blobs = document.querySelectorAll('.blob');
    console.log("initBlobs called. Mobile:", isMobile);

    // Clear previous states
    blobStates.length = 0;

    // Control how many blobs to animate
    const maxBlobs = isMobile ? 6 : blobs.length;

    for (let i = 0; i < maxBlobs; i++) {
        const blob = blobs[i];
        if (!blob) continue;

        // Responsive sizing
        const baseSize = isMobile ? 120 : 200;
        const sizeVariance = 40;
        const size = baseSize + Math.random() * sizeVariance;

        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;

        // Responsive blur
        const blurAmount = isMobile ? 50 : 100;
        blob.style.filter = `blur(${blurAmount}px)`;

        const w = size;
        const h = size;
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let dx = (Math.random() - 0.5) * 1.2;
        let dy = (Math.random() - 0.5) * 1.2;

        const scalePhase = Math.random() * Math.PI * 2;
        const opacityPhase = Math.random() * Math.PI * 2;
        const scaleSpeed = 0.002 + Math.random() * 0.002;
        const opacitySpeed = 0.002 + Math.random() * 0.003;

        blob.style.position = "absolute";
        blob.style.left = "0px";
        blob.style.top = "0px";
        blob.style.willChange = "transform, opacity";

        blobStates.push({ blob, x, y, dx, dy, w, h, scalePhase, opacityPhase, scaleSpeed, opacitySpeed, changeTimer: 0 });
    }

    animateBlobs();
};

// Shared animation loop for all blobs
function animateBlobs() {
    const time = Date.now();

    blobStates.forEach(state => {
        state.changeTimer++;

        // Slightly change direction every ~2 seconds
        if (state.changeTimer > 120) {
            state.changeTimer = 0;
            state.dx += (Math.random() - 0.5) * 0.4;
            state.dy += (Math.random() - 0.5) * 0.4;
            state.dx = Math.max(Math.min(state.dx, 1.5), -1.5);
            state.dy = Math.max(Math.min(state.dy, 1.5), -1.5);
        }

        state.x += state.dx;
        state.y += state.dy;

        // Wrap around screen edges
        if (state.x > window.innerWidth) state.x = -state.w;
        if (state.x < -state.w) state.x = window.innerWidth;
        if (state.y > window.innerHeight) state.y = -state.h;
        if (state.y < -state.h) state.y = window.innerHeight;

        const scale = 1 + Math.sin(time * state.scaleSpeed + state.scalePhase) * 0.05;
        const opacity = 0.3 + Math.sin(time * state.opacitySpeed + state.opacityPhase) * 0.15;

        state.blob.style.transform = `translate(${state.x}px, ${state.y}px) scale(${scale})`;
        state.blob.style.opacity = opacity.toFixed(2);
    });

    requestAnimationFrame(animateBlobs);
}

// Recalculate size on resize
window.addEventListener("resize", () => {
    blobStates.forEach(state => {
        state.w = state.blob.offsetWidth;
        state.h = state.blob.offsetHeight;
    });
});


