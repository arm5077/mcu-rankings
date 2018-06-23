import Vue from 'vue';
import ArrayShuffle from 'array-shuffle';
import Movies from './data/movies.json';
import { makeChallenge } from './js/helpers';
import Cards from './components/cards';
import Results from './components/results';
import './styles.scss';

const App = new Vue({
  el: '#app',
  data: {
    cards: [],
    master: [],
    action: {},
  },
  methods: {
    recieved(data) {
      console.log(data);
      const response = this.$data.action.get(data);
      this.$data.cards.pop();
      if (response.type === 'confirmation') {
        this.makeUICard(this.$data.action.do());
      } else if (response.type === 'reconcile') {
        this.$data.master = this.$data.master.concat(this.$data.action.reconcile());
        this.$data.master.sort((a, b) => a.start - b.start);
        console.log(this.$data.master);
        [this.$data.master, this.$data.action] = makeChallenge(this.$data.master);
        this.makeUICard(this.$data.action.do());
      }
    },
    makeChallenge,
    makeUICard(prompt) {
      console.log(prompt);
      if (prompt.type !== 'finished') {
        this.$data.cards.push(prompt);
        /*
        const Card = document.createElement('div');
        Card.innerHTML = `<h2>${prompt.text}</h2>`;
        Card.classList.add('card');
        const List = document.createElement('ul');
        prompt.elements.forEach((element) => {
          const Item = document.createElement('li');
          Item.innerHTML = element;
          List.appendChild(Item);
        });
        Card.appendChild(List);
        document.bodyo.appendChild(Card);
        */
      }
    },
  },
  mounted() {
    this.$data.master = [{
      start: 0,
      end: Movies.length - 1,
      elements: ArrayShuffle(Movies),
    }];
    [this.$data.master, this.$data.action] = makeChallenge(this.$data.master);
    this.makeUICard(this.$data.action.do());
  },
});

function init() {
  /*
  const mcuList = document.getElementById('mcu-list');
  Movies.forEach((movie, i) => {
    const movieElem = document.createElement('li');
    movieElem.innerHTML = `<span>${i + 1}.</span> ${movie}`;
    mcuList.appendChild(movieElem);
  });
  */
  // Intitialize the definitive list of movies and their positions
  /*
  console.log(mcuList);
  const sortable = Sortable.create(mcuList, {
    ghostClass: 'ghost',
    delay: 100,
    onUpdate: (event) => {
      mcuList.childNodes.forEach((movie, i) => {
        const elem = movie.querySelector('span');
        elem.innerHTML = `${i + 1}.`;
      });
    },
  });
  */
  // listPick(master[0]);
}
init();
