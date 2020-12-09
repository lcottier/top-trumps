<script lang="ts">
import { Hero } from '@/store/modules/models';
import { defineComponent, SetupContext } from 'vue';

interface Props {
  hero: Hero;
}

export default defineComponent({
  name: 'HeroBattleCard',
  props: {
    hero: {
      type: Hero,
      default: () => '',
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    function selectTrait(trait: string) {
      emit('trait-selected', trait);
    }

    return {
      selectTrait,
    };
  },
});
</script>

<template>
  <div class="battle-card">
    <div class="hero-battle-content">
      <div class="name">{{ hero.name }}</div>
      <div class="description">{{ hero.description }}</div>
      <div class="description" @click="selectTrait('speed')">
        Speed: {{ hero.speed }}
      </div>
      <div class="description" @click="selectTrait('strength')">
        Strength: {{ hero.strength }}
      </div>
      <div class="description" @click="selectTrait('intelligence')">
        Intelligence: {{ hero.intelligence }}
      </div>
    </div>
  </div>
</template>
