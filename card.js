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
  hasMatch: false,
  clickedCards: [],

  // Modifying state.
  createCards: function() {
    for(var i = 0; i < 2; i++) {
      this.cards.push(this.colors[i]);
      this.cards.push(this.colors[i]);
    }
  },

  addClickedCard: function(color) {
    this.clickedCards.push(color);
  },

  checkCurrentStoredColor: function(color) {
    debugger;
    if (this.clickedCards.length === 2) {
      if (this.clickedCards.pop() === this.clickedCards.pop()) {
        this.hasMatch = true;
      }
    }
  }
};

// Presents cards.
// Have controller call a view render()
// Click handler
var view = {
  init: function(cardsData) {
    this.cacheContainer();
    cardsData.forEach(function(card){
      $container.append("<div class='card'" + "id=" + card + " </div>");
    });
    this.cacheCards();
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
      controller.leaveColorDisplayed(this.id);
    });
  },

  removeColors: function(color, currentMatch) {
    // $cards.find("#" + currentMatch).removeClass(currentMatch);
    // $cards.find("#" + color).removeClass(color);
    $(".container").find("div").removeClass(color);
    $(".container").find("div").removeClass(currentMatch);
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
    model.addClickedCard(color);
    // if (model.currentMatch === "") {
    //   model.storeCurrentMatch(color);
    // }
    // model.toggleClickStatus();
    // else {
    //   model.curreStoreCurrentMatch('');
    // }
  },

  checkColor: function(color) {
    model.checkCurrentStoredColor(color);
    // if (model.currentMatch !== "") {
    //   model.currentMatch = "";
    //   return model.checkCurrentStoredColor(color);
    // }
  },

  leaveColorDisplayed: function(color) {
    if (!model.hasMatch && model.clickedCards.length == 2) {
      view.removeColors(color, model.currentMatch);
      model.hasMatch = false;
    }
  }

};
