import Vue from 'vue';
import Sortable from 'sortablejs';

export default Vue.component('pair-card', {
  template: `<div>
    <h1>Order these three movies from best to worst.</h1>
    <ul id="mcu-list">
      <li v-for='movie in data.elements'>{{movie}}</li>
    </ul>
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
      const mcuList = document.getElementById('mcu-list').children;
      Array.from(mcuList).forEach((item) => {
        this.$data.movies.push(item.textContent);
      });
      this.$emit('submitted', this.$data.movies);
    },
  },
  mounted() {
    const mcuList = document.getElementById('mcu-list');
    const sortable = Sortable.create(mcuList, {
      ghostClass: 'ghost',
      delay: 100,
    });
  },
  destroyed() {
    console.log('it gone');
  },
});
