module.exports = {
  // From a list of movies, generate a challenge segment
  newListChallenge(challenge) {
    let elements = [...challenge.elements];
    const pivot = elements[elements.length - 1];
    elements.splice(elements.length - 1, 1);
    if (elements.length / 6 > 1) {
      elements = module.exports.splitList(elements, 6);
    } else {
      elements = [elements];
    }
    return {
      start: challenge.start,
      end: challenge.end,
      pivot,
      above: [],
      below: [],
      elements,
    };
  },

  splitList(list, n) {
    const newList = [];
    for (let i = 0; i < list.length; i += n) {
      newList.push(list.slice(i, (i + n)));
    }
    return newList;
  },

  getListPick(challenge, above, below) {
    challenge.above.concat(above);
    challenge.below.concat(below);
  },

  doAction(actions) {
    if (actions.length > 0) {
      actions[0]();
      actions.shift();
    }
  },

  // Take the master list and make a new challenge out of it
  makeChallenge(master) {
    let newMaster = master.filter(d => d.start !== d.end);
    if (newMaster.length === 0) {
      return [
        master,
        {
          do() {
            return {
              type: 'finished',
              text: 'Your selection is done!',
            };
          },
        },
      ];
    }
    let newChallenge = newMaster.pop();
    let newAction = null;
    if (newChallenge.elements.length === 2) {
      newAction = {
        type: 'pair',
        challenge: newChallenge,
        do() {
          return {
            type: 'pair',
            text: 'Which of these two movies is better:',
            elements: this.challenge.elements,
          };
        },
        get(response) {
          this.response = [response, this.challenge.elements.find(d => d !== response)];
          return {
            type: 'reconcile',
            text: `Got your choicee: ${response} - ready to reconcile!`,
          };
        },
        reconcile() {
          console.log('reconciling!!!');
          const additionToMaster = [];
          additionToMaster.push({
            start: this.challenge.start,
            end: this.challenge.start,
            elements: [this.response[0]],
          });

          additionToMaster.push({
            start: this.challenge.end,
            end: this.challenge.end,
            elements: [this.response[1]],
          });
          return additionToMaster;
        },
      };
    } else if (newChallenge.elements.length === 3) {
      console.log('trio!');
      newAction = {
        type: 'trio',
        challenge: newChallenge,
        do() {
          return {
            type: 'trio',
            text: 'Order these three movies from best to worst:',
            elements: this.challenge.elements,
          };
        },
        get(response) {
          this.response = response;
          return {
            type: 'reconcile',
            text: `Got your choices: ${response.join(', ')} - ready to reconcile!`,
          };
        },
        reconcile() {
          console.log('reconciling!!!');
          const additionToMaster = [];
          this.response.forEach((d, i) => {
            additionToMaster.push({
              start: this.challenge.start + i,
              end: this.challenge.start + i,
              elements: [this.response[i]],
            });
          });
          return additionToMaster;
        },
      };
    } else {
      newChallenge = module.exports.newListChallenge(newChallenge);
      newAction = {
        type: 'list',
        challenge: newChallenge,
        do() {
          return {
            type: 'multiple',
            text: this.challenge.pivot,
            elements: this.challenge.elements[0],
          };
        },
        get(response) {
          if (this.challenge.elements.length === 0) {
            return false;
          }
          const above = response;
          const below = this.challenge.elements[0].filter(d => response.indexOf(d) === -1);
          this.challenge.above = this.challenge.above.concat(above);
          this.challenge.below = this.challenge.below.concat(below);
          this.challenge.elements.shift();
          if (this.challenge.elements.length === 0) {
            return {
              type: 'reconcile',
              text: `Got your choice: ${response.join(', ')} — ready to reconcile!`,
            };
          }
          return {
            type: 'confirmation',
            text: `Got your choice: ${response.join(', ')}`,
          };
        },
        reconcile() {
          console.log('reconciling!!!');
          const additionToMaster = [];
          if (this.challenge.above.length > 0) {
            additionToMaster.push({
              start: this.challenge.start,
              end: (this.challenge.start + this.challenge.above.length) - 1,
              elements: this.challenge.above,
            });
          }

          additionToMaster.push({
            start: this.challenge.start + this.challenge.above.length,
            end: this.challenge.start + this.challenge.above.length,
            elements: [this.challenge.pivot],
          });

          if (this.challenge.below.length > 0) {
            additionToMaster.push({
              start: this.challenge.start + this.challenge.above.length + 1,
              end: this.challenge.end,
              elements: this.challenge.below,
            });
          }
          return additionToMaster;
        },
      };
    }
    newMaster = newMaster.concat(master.filter(d => d.start === d.end));
    return [newMaster, newAction];
  },
};
