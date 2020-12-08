<script lang="ts">
import { Villain } from '@/store/modules/models';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VillainBattleCard',
  props: {
    villain: {
      type: Villain,
      default: () => '',
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
});
</script>

<template>
  <div class="battle-card">
    <div v-if="visible" class="villain-overlay">VILLAIN</div>
    <div v-if="!visible" class="content">
      <div class="name">{{ villain.name }}</div>
      <div class="description">{{ villain.description }}</div>
      <div class="description">Speed: {{ villain.speed }}</div>
      <div class="description">Strength: {{ villain.strength }}</div>
      <div class="description">Intelligence: {{ villain.intelligence }}</div>
    </div>
  </div>
</template>
