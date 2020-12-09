<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';

import ListHeader from '@/components/list-header.vue';
import HeroBattleCard from '@/components/hero-battle-card.vue';
import VillainBattleCard from '@/components/villain-battle-card.vue';
import { useVillains } from '../villains/use-villains';
import { useHeroes } from '../heroes/use-heroes';
import { Villain, Hero } from '../../store/modules/models';
import store from '../../store';

const captains = console;

interface ComponentState {
  errorMessage: string;
  message: string;
  routePath: string;
  title: string;
  villains: Villain[];
  heroes: Hero[];
  selectedVillain: Villain | null;
  selectedHero: Hero | null;
  showBattle: boolean;
  result: String;
  hideVillain: boolean;
}

export default defineComponent({
  name: 'Battle',
  data() {
    return {
      message: '',
      routePath: '/battle',
      title: 'Battle',
    };
  },
  components: {
    ListHeader,
    HeroBattleCard,
    VillainBattleCard,
  },
  setup() {
    const { getVillainsAction } = useVillains();
    const { getHeroesAction } = useHeroes();

    const state: ComponentState = reactive({
      errorMessage: '',
      message: '',
      routePath: '/battle',
      title: 'Battle',
      villains: computed(() => store.getters.villains as Villain[]),
      heroes: computed(() => store.getters.heroes as Hero[]),
      selectedHero: null,
      selectedVillain: null,
      showBattle: false,
      result: '',
      hideVillain: true,
    });

    onMounted(async () => {
      getHeroes();
      getVillains();
      console.log(state);
    });

    function startBattle() {
      selectHero();
      selectVillain();
      state.showBattle = true;
    }

    function selectHero() {
      const selectedIndex = Math.floor(Math.random() * state.heroes.length);
      state.selectedHero = state.heroes[selectedIndex];
    }

    function selectVillain() {
      const selectedIndex = Math.floor(Math.random() * state.villains.length);
      state.selectedVillain = state.villains[selectedIndex];
    }

    function traitSelected(trait: string) {
      battle(trait);
    }

    function battle(trait: string) {
      if (state.selectedVillain && state.selectedHero) {
        if (
          state.selectedVillain[trait as keyof Villain] <
          state.selectedHero[trait as keyof Hero]
        ) {
          state.result = 'Win';
        } else if (
          state.selectedVillain[trait as keyof Villain] >
          state.selectedHero[trait as keyof Hero]
        ) {
          state.result = 'Lose';
        } else {
          state.result = 'Draw';
        }
        state.hideVillain = false;
      }
    }

    async function getVillains() {
      state.errorMessage = '';
      try {
        await getVillainsAction();
      } catch (error) {
        captains.error(error);
        state.errorMessage = 'Unauthorized';
      }
    }

    async function getHeroes() {
      state.errorMessage = '';
      try {
        await getHeroesAction();
      } catch (error) {
        captains.error(error);
        state.errorMessage = 'Unauthorized';
      }
    }

    return {
      ...toRefs(state),
      getVillains,
      getHeroes,
      startBattle,
      selectHero,
      selectVillain,
      traitSelected,
    };
  },
});
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      :routePath="routePath"
      :showAdd="false"
      :showRefresh="false"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <button v-if="!showBattle" @click="startBattle">Start Battle?</button>
      <div v-if="showBattle">
        <HeroBattleCard
          :hero="selectedHero"
          v-on:trait-selected="traitSelected"
        >
        </HeroBattleCard>
        vs
        <VillainBattleCard
          :villain="selectedVillain"
          :visible="hideVillain"
        ></VillainBattleCard>
      </div>
    </div>
  </div>
</template>
