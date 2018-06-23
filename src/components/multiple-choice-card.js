import Vue from 'vue';

export default Vue.component('multiple-choice-card', {
  template: `<div id="mcu-list">
    <h1>Which of these movies are better than {{data.text}}?</h1>
    <label v-for='movie in data.elements'>
      <input type="checkbox" :value="movie" v-model="movies">
      {{movie}}
    </label>
    <button v-on:click="click">Submit</button>
  </div>`,
  props: ['data'],
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    click() {
      this.$emit('submitted', this.$data.movies);
    },
  },
  mounted() {
    console.log(this.$data.movies);
  },
  destroyed() {
    console.log('it gone');
  },
});
