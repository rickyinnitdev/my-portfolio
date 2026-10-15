<template>
  <section class="hero">
    <div class="container hero-inner">

      <!-- Left column -->
      <div class="hero-left">
        <!-- Labels row -->
        <div class="hero-labels reveal">
          <span class="pill pill-yellow">Based in 🇰🇭 Phnom Penh</span>
          <span class="pill pill-default">Open to work</span>
        </div>

        <!-- Big name -->
        <h1 class="hero-name reveal">
          <span class="name-line">MORM</span>
          <span class="name-line name-accent">KIMHENG</span>
        </h1>

        <!-- Tagline -->
        <div class="hero-tagline reveal">
          <p>
            Curiosity took me from phone specs and football posters to building software.
            Now I make apps, websites, and games, with a goal of making everyday
            work easier for people in Cambodia.
          </p>
        </div>

        <!-- Role pills -->
        <div class="hero-roles reveal">
          <span class="pill pill-green">Web Dev</span>
          <span class="pill pill-pink">Designer</span>
          <span class="pill pill-yellow">Builder</span>
        </div>

        <!-- CTA buttons -->
        <div class="hero-actions reveal">
          <a href="/work" class="btn-main">
            See my work <span class="btn-arrow">↗</span>
          </a>
          <a href="/about" class="btn-outline">
            About me
          </a>
        </div>
      </div>

      <!-- Right column — collage -->
      <div class="hero-collage" aria-hidden="true">
        <!-- Scattered design work samples -->
        <div class="collage-item c1 polaroid">
          <img src="/images/5.jpg" alt="" />
        </div>
        <div class="collage-item c2 polaroid">
          <img src="/images/60.png" alt="" />
        </div>
        <div class="collage-item c3 polaroid">
          <img src="/images/42.png" alt="" />
        </div>
        <div class="collage-item c4 polaroid">
          <img src="/images/57.png" alt="" />
        </div>

        <!-- Floating labels -->
        <div class="float-tag ft1 pill pill-yellow">Graphic Design</div>
        <div class="float-tag ft2 pill pill-green">Web Dev</div>
        <div class="float-tag ft3 pill pill-pink">Building</div>

        <!-- Profile photo -->
        <div class="collage-item c5 polaroid hero-photo">
          <img src="/images/34.JPG" alt="Morm Kimheng" />
        </div>
      </div>
    </div>

    <!-- Scroll line -->
    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-line-anim"></span>
      <span class="label">scroll</span>
    </div>
  </section>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--nav-height);
  position: relative;
  overflow: hidden;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  padding-block: var(--space-16);
}

/* ===== LEFT ===== */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-labels {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* The big name */
.hero-name {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
  letter-spacing: -0.05em;
  font-size: var(--text-hero);
  font-weight: 900;
  transition-delay: 60ms;
}

.name-line {
  display: block;
  color: var(--text);
}

.name-accent {
  /* Outlined text on dark, filled on light */
  color: transparent;
  -webkit-text-stroke: 2px var(--text);
  transition: -webkit-text-stroke-color var(--transition);
}

[data-theme="light"] .name-accent {
  -webkit-text-stroke-color: var(--text);
}

.hero-tagline {
  transition-delay: 120ms;
}

.hero-tagline p {
  font-size: var(--text-lg);
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 420px;
}

.hero-roles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  transition-delay: 180ms;
}

.hero-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  transition-delay: 240ms;
}

.btn-main {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 13px 28px;
  background: var(--text);
  color: var(--bg);
  font-size: var(--text-sm);
  font-weight: 700;
  border-radius: var(--radius-pill);
  letter-spacing: 0.01em;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.btn-main:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.btn-arrow {
  font-size: 1rem;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  padding: 13px 28px;
  border: 1.5px solid var(--border-strong);
  color: var(--text-muted);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-pill);
  transition: all var(--transition-fast);
}

.btn-outline:hover {
  border-color: var(--text);
  color: var(--text);
  transform: translateY(-2px);
}

/* ===== RIGHT — COLLAGE ===== */
.hero-collage {
  position: relative;
  height: 520px;
}

.collage-item {
  position: absolute;
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.collage-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.collage-item:hover {
  transform: rotate(0deg) scale(1.04) !important;
  box-shadow: var(--shadow-lg);
  z-index: 10;
}

/* Polaroid padding already comes from base.css .polaroid */
.polaroid img {
  display: block;
}

/* Individual positions + rotations */
.c1 {
  width: 180px;
  height: 200px;
  top: 20px;
  left: 10px;
  transform: rotate(-4deg);
  z-index: 2;
}

.c2 {
  width: 220px;
  height: 160px;
  top: 80px;
  right: 20px;
  transform: rotate(3deg);
  z-index: 3;
}

.c3 {
  width: 160px;
  height: 180px;
  bottom: 60px;
  left: 50px;
  transform: rotate(2deg);
  z-index: 4;
}

.c4 {
  width: 200px;
  height: 150px;
  bottom: 20px;
  right: 40px;
  transform: rotate(-2.5deg);
  z-index: 2;
}

.hero-photo {
  width: 150px;
  height: 190px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(1.5deg);
  z-index: 5;
}

/* Floating tags */
.float-tag {
  position: absolute;
  z-index: 6;
  cursor: default;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease;
}

.float-tag:hover {
  transform: translateY(-3px) scale(1.05);
}

.ft1 {
  top: 12px;
  right: 60px;
  transform: rotate(-3deg);
}

.ft2 {
  bottom: 120px;
  left: 0;
  transform: rotate(2deg);
}

.ft3 {
  top: 240px;
  right: 10px;
  transform: rotate(-1.5deg);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  opacity: 0.4;
}

.scroll-line-anim {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, var(--text-muted), transparent);
  animation: scrollDown 2s ease-in-out infinite;
}

@keyframes scrollDown {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* Mobile */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-collage {
    display: none;
  }

  .hero-name {
    font-size: clamp(3rem, 16vw, 6rem);
  }
}
</style>
