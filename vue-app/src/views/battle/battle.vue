<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';

import ListHeader from '@/components/list-header.vue';
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
    });

    onMounted(async () => {
      getHeroes();
      getVillains();
      console.log(state);
    });

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
      <button>Start Battle?</button>
    </div>
  </div>
</template>