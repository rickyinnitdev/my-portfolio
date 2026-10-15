<template>
  <div class="not-found">
    <div class="container">
      <p class="label">404</p>
      <h1 class="nf-title">Page not found.</h1>
      <p class="nf-desc">This page doesn't exist — or it moved somewhere else.</p>
      <a href="/" class="nf-link">← Back home</a>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-height);
}

.label {
  color: var(--accent);
  margin-bottom: var(--space-4);
  display: block;
}

.nf-title {
  font-size: var(--text-5xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: var(--space-4);
}

.nf-desc {
  font-size: var(--text-lg);
  color: var(--text-muted);
  margin-bottom: var(--space-8);
}

.nf-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.nf-link:hover {
  color: var(--text);
}
</style>
