<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <div class="footer-left">
          <a href="/" class="footer-logo">
            MK<span class="dot">.</span>
          </a>
          <p class="footer-tagline">Building things out of curiosity.</p>
          <div class="footer-pills">
            <span class="pill pill-yellow">Web Dev</span>
            <span class="pill pill-green">Design</span>
            <span class="pill pill-pink">Builder</span>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <p class="footer-col-label label">Navigate</p>
            <a v-for="link in navLinks" :key="link.to" :href="link.to" class="footer-link">
              {{ link.label }}
            </a>
          </div>
          <div class="footer-col">
            <p class="footer-col-label label">Connect</p>
            <a href="mailto:m.kimheng.dev@gmail.com" class="footer-link">Email</a>
            <a :href="personal.socials.telegram" target="_blank" rel="noopener" class="footer-link">Telegram</a>
            <a :href="personal.socials.facebook" target="_blank" rel="noopener" class="footer-link">Facebook</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="divider"></div>
        <div class="footer-meta">
          <p>© {{ year }} Morm Kimheng. All rights reserved.</p>
          <p>Phnom Penh, Cambodia</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { personal } from '../../data/personal.js'

const year = new Date().getFullYear()
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/design', label: 'Design' },
  { to: '/about', label: 'About' },
]
</script>

<style scoped>
.footer {
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  padding-block: var(--space-16) var(--space-8);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-12);
  margin-bottom: var(--space-10);
  flex-wrap: wrap;
}

.footer-logo {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: var(--text);
  display: block;
  margin-bottom: var(--space-3);
}

.dot { color: var(--yellow); }

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.footer-pills {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.footer-links {
  display: flex;
  gap: var(--space-12);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-col-label {
  color: var(--text-faint);
  margin-bottom: var(--space-1);
}

.footer-link {
  font-size: var(--text-sm);
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.footer-link:hover { color: var(--text); }

.footer-bottom { margin-top: var(--space-6); }

.footer-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-5);
  flex-wrap: wrap;
  gap: var(--space-3);
}

.footer-meta p {
  font-size: var(--text-xs);
  color: var(--text-faint);
}

@media (max-width: 640px) {
  .footer-top { flex-direction: column; }
  .footer-meta { flex-direction: column; align-items: flex-start; }
}
</style>
