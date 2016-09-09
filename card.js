// Holds state regarding the cards.
var model = {
  init:  function(){
    this.createCards();
  },

    // Properties.
  totalMatches: 0,
  currentMatch: "",
  colors: ["red", "yellow"],
  cards: [],
  faceDown: "black",

  // Modifying state.
  createCards: function() {
    for(var i = 0; i < 2; i++) {
      this.cards.push(this.colors[i]);
      this.cards.push(this.colors[i]);
    }
  },

  storeCurrentMatch: function(color) {
    this.currentMatch = color;
  },

  checkCurrentStoredColor: function(color) {
    this.currentMatch === color;
  }
}

// Presents cards.
var view = {
  init: function(cardsData) {
    this.cacheContainer();
    cardsData.forEach(function(card){
      $container.append("<div class='card'" + "id=" + card + " </div>");
    });
    this.cacheCards();
    console.log($cards);
  },
  // Cacheing DOM objects.
  cacheContainer: function() {
    $container = $('.container');
  },
  cacheCards: function() {
    $cards = $('div.card');
  },

  // Adding listeners.
  addCardClickHandler: function() {
    $cards.on('click', function(ev) {
      $(this).addClass(this.id);
      controller.sendColor(this.id);
      controller.checkColor(this.id);
    });
  },

  removeColors: function(color, currentMatch) {
    debugger
    $cards.find("#" + currentMatch).removeClass(currentMatch);
    $cards.find("#" + color).removeClass(color);
  }
};

// Gets data from model, passes data to view.
var controller = {

  init: function() {
    model.init();
    view.init(model.cards);
    controller.preparingView();
  },

  preparingView: function() {
    view.addCardClickHandler();
  },

  sendColor: function(color) {
    if (model.currentMatch === "") {
      model.storeCurrentMatch(color);
    }
  },

  checkColor: function(color) {
    if (model.currentMatch != "") {
      model.currentMatch = "";
      return model.checkCurrentStoredColor(color);
    }
  },

  leaveColorDisplayed: function(color) {
    if (!checkColor(color)) {
      view.removeColors(color, model.currentMatch);
    }
  }

};
