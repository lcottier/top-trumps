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
  <div class="battle-card" v-bind:class="{ 'is-flipped': !visible }">
    <div v-bind:class="{ 'villain-overlay': visible }">
      <div style="padding-top: 5px" v-if="visible">TOUR OF HEROES</div>
    </div>
    <div class="villain-card-content">
      <div v-if="!visible">
        <div class="name">{{ villain.name }}</div>
        <div class="description">{{ villain.description }}</div>
        <div class="description">Speed: {{ villain.speed }}</div>
        <div class="description">Strength: {{ villain.strength }}</div>
        <div class="description">Intelligence: {{ villain.intelligence }}</div>
      </div>
    </div>
  </div>
</template>
