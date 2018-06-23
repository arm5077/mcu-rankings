import Vue from 'vue';
import MultipleChoiceCard from './multiple-choice-card';
import PairCard from './pair-card';
import TrioCard from './trio-card';

export default Vue.component('cards', {
  components: { MultipleChoiceCard, PairCard, TrioCard },
  template: `<div>{{card.type}}
    <multiple-choice-card v-if='card.type==="multiple"' v-bind:data='card' v-on:submitted="submitted" />
    <trio-card v-if='card.type==="trio"' v-bind:data='card' v-on:submitted="submitted" />
    <pair-card v-if='card.type==="pair"' v-bind:data='card' v-on:submitted="submitted" />
  </div>`,
  props: ['card'],
  methods: {
    submitted(movies) {
      this.$emit('submitted', movies);
    },
  },
});
