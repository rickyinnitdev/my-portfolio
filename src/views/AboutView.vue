<template>
  <div class="about-view">
    <div class="container">

      <!-- Big header — Robin's "ABOUT" style -->
      <div class="about-header reveal">
        <span class="pill pill-green">About</span>
        <h1 class="about-big-title">ABOUT<br />ME.</h1>
      </div>

      <!-- Story + Photo -->
      <div class="story-grid reveal">
        <!-- Photo — polaroid style -->
        <div class="story-photo-col">
          <div class="story-photo polaroid">
            <img src="/images/34.JPG" alt="Morm Kimheng" />
          </div>
          <div class="story-photo-labels">
            <span class="pill pill-yellow">Morm Kimheng</span>
            <span class="pill pill-default">Phnom Penh 🇰🇭</span>
          </div>
        </div>

        <!-- Text -->
        <div class="story-text-col">
          <p class="what-tag label">what's up.</p>
          <div class="story-paragraphs">
            <p>I am a Software Engineering student at BELTEI International University in Phnom Penh. My interest in technology started long before university: I wanted to understand my phone’s specs, find out what would run my games, and see what I could change to make things work better.</p>
            <p>In sixth grade, I started designing matchday posters and a page for my first football team. I used mobile design apps, and my uncle helped me learn Photoshop. In seventh grade, my first low-end laptop became both my design workspace and an experiment in getting Minecraft to run well enough to play with friends.</p>
            <p>My mum bought me my first PC, which gave me room to explore more. By tenth grade, I was learning Blender and making Instagram filters with Spark AR Studio. My filters reached around 2.7 million users. The platform is gone now, but that experience showed me how far a small creative project could travel.</p>
            <p>After high school, I chose software engineering. I still loved poster design, but software gave me more ways to follow my curiosity and solve problems. I kept learning design alongside it. I am grateful that my first year, around 2023–2024, pushed me to work through programming foundations manually; that understanding still matters when I use AI tools today.</p>
            <p>Now I build apps, websites, and tools, independently and in teams. I want to create software that helps people, especially tools that improve workflows in Cambodia and reduce repetitive manual work. There is more to this story, and I will keep adding to it as I go.</p>
          </div>

          <!-- Role pills -->
          <div class="story-roles">
            <span class="pill pill-yellow">Web Dev</span>
            <span class="pill pill-green">Designer</span>
            <span class="pill pill-pink">Photographer</span>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="about-block reveal">
        <h2 class="block-heading">What I work with</h2>
        <SkillGroup
          v-for="group in skillGroups"
          :key="group.id"
          :group="group"
        />
      </div>

      <!-- Experience -->
      <div class="about-block reveal">
        <h2 class="block-heading">Experience</h2>
        <ExperienceItem v-for="item in experience" :key="item.id" :item="item" />
      </div>

      <!-- Education -->
      <div class="about-block reveal">
        <h2 class="block-heading">Education</h2>
        <ExperienceItem v-for="item in education" :key="item.id" :item="item" />
      </div>

      <!-- Contact — Robin's "LET'S TALK" style -->
      <div class="contact-block reveal">
        <span class="pill pill-yellow">Get in touch</span>
        <h2 class="contact-big-title">LET'S<br />TALK.</h2>
        <p class="contact-sub">
          Got a project, an idea, or just want to say hi? I'm always happy to chat.
        </p>
        <div class="contact-links">
          <a :href="`mailto:${personal.email}`" class="contact-email">
            {{ personal.email }}
          </a>
          <div class="contact-socials">
            <a :href="personal.socials.telegram" target="_blank" rel="noopener" class="pill pill-default">
              Telegram →
            </a>
            <a :href="personal.socials.facebook" target="_blank" rel="noopener" class="pill pill-default">
              Facebook →
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import SkillGroup from '../components/about/SkillGroup.vue'
import ExperienceItem from '../components/about/ExperienceItem.vue'
import { personal } from '../data/personal.js'
import { skillGroups } from '../data/skills.js'
import { education, experience } from '../data/experience.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()
</script>

<style scoped>
.about-view {
  padding-top: calc(var(--nav-height) + var(--space-16));
  padding-bottom: var(--space-24);
  min-height: 100svh;
}

/* Header */
.about-header {
  margin-bottom: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-big-title {
  font-size: var(--text-6xl);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  color: var(--text);
  margin-top: var(--space-4);
}

/* Story grid */
.story-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-16);
  align-items: start;
  margin-bottom: var(--space-20);
  padding-bottom: var(--space-16);
  border-bottom: 1px solid var(--border);
}

.story-photo-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: flex-start;
}

.story-photo {
  width: 100%;
  border-radius: var(--radius);
  overflow: hidden;
  transform: rotate(-2deg);
  transition: transform 0.4s ease;
}

.story-photo:hover {
  transform: rotate(0deg);
}

.story-photo img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
}

.story-photo-labels {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.story-text-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.what-tag {
  color: var(--yellow);
  font-size: var(--text-sm);
}

.story-paragraphs {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.story-paragraphs p {
  font-size: var(--text-lg);
  color: var(--text-muted);
  line-height: 1.8;
}

.story-roles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Blocks */
.about-block {
  margin-bottom: var(--space-20);
}

.block-heading {
  font-size: var(--text-3xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border);
}

/* Contact */
.contact-block {
  border-top: 1px solid var(--border);
  padding-top: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-big-title {
  font-size: var(--text-6xl);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  color: var(--text);
  margin-top: var(--space-4);
}

.contact-sub {
  font-size: var(--text-lg);
  color: var(--text-muted);
  max-width: 420px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-top: var(--space-4);
}

.contact-email {
  font-size: var(--text-3xl);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  transition: color var(--transition-fast);
  word-break: break-all;
}

.contact-email:hover { color: var(--yellow); }

.contact-socials {
  display: flex;
  gap: var(--space-3);
}

.contact-socials a {
  font-size: var(--text-sm);
  font-weight: 600;
  transition: opacity var(--transition-fast);
}

.contact-socials a:hover { opacity: 0.7; }

/* Responsive */
@media (max-width: 900px) {
  .story-grid {
    grid-template-columns: 1fr;
  }

  .story-photo-col {
    flex-direction: row;
    align-items: center;
    gap: var(--space-5);
  }

  .story-photo {
    width: 150px;
    flex-shrink: 0;
  }

  .story-photo-labels {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .about-big-title,
  .contact-big-title {
    font-size: clamp(2.5rem, 14vw, 5rem);
  }

  .contact-email {
    font-size: var(--text-xl);
  }
}
</style>
