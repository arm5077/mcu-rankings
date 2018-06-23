import Vue from 'vue';

export default Vue.component('results', {
  template: `<div id="mcu-list">
    <h1>Here's your list!</h1>
    <ul>
    <li v-for='movie in movies'>{{movie.elements[0]}}</li>
  </div>`,
  props: ['movies'],
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
  },
  destroyed() {
    console.log('it gone');
  },
});
