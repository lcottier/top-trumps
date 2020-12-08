<script lang="ts">
import { Hero } from '@/store/modules/models';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroTrumpCard',
  props: {
    hero: {
      type: Hero,
      default: () => '',
    },
  },
});
</script>

<template>
  <div class="battle-card">
    <div class="content">
      <div class="name">{{ hero.name }}</div>
      <div class="description">{{ hero.description }}</div>
      <div class="description">Speed: {{ hero.speed }}</div>
      <div class="description">Strength: {{ hero.strength }}</div>
      <div class="description">Intelligence: {{ hero.intelligence }}</div>
    </div>
  </div>
</template>
