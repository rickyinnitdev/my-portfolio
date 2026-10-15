<template>
  <div class="home">
    <HeroSection />
    <JourneyTimeline />
    <FeaturedProjects />
  </div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import JourneyTimeline from '../components/home/JourneyTimeline.vue'
import FeaturedProjects from '../components/home/FeaturedProjects.vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal()
</script>
