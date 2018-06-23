import Vue from 'vue';

export function makeMultipleChoice() {
  console.log('dooob');
}

export function makeUICard(App, prompt) {
  if (prompt.type === 'multiple') {
    App.$data.cards.push(prompt);
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
}
