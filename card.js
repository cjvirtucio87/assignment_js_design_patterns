// Holds state regarding the cards.
var model = {
  init:  function(){
    this.createCards();
  },
  // Modifying state.
  createCards: function() {
    for(var i = 0; i < 2; i++) {
      this.cards.push(this.colors[i]);
      this.cards.push(this.colors[i]);
    }
  },

  // Properties.
  totalMatches: 0,
  currentMatch: 0,
  colors: ["red", "yellow"],
  cards: [],
  faceDown: "black",
};

// Presents cards (modifying DOM).
var view = {
  init: function(cardsData) {
    this.cacheContainer();
    cardsData.forEach(function(card){
      $container.append("<div class='card'" + "id=" + "card-" + card + " </div>");
    });
    this.cacheCards();
    console.log($cards);
  },
  cacheContainer: function() {
    $container = $('.container');
  },
  cacheCards: function() {
    $cards = $('div.card');
  }
};

// Gets data from model, passes data to view.
var controller = {

  init: function() {
    model.init();
    view.init(model.cards);
  }

};
