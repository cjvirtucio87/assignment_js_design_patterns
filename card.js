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
    if (this.currentMatch === color) {
      this.hasMatch = true;
    } else {
      // Toggle hasMatch and reset memorized currentMatch.
      this.hasMatch = false;
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
    if (model.currentMatch === "") {
      model.storeCurrentMatch(color);
    }
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
    if (!model.hasMatch) {
      view.removeColors(color, model.currentMatch);
      model.currentMatch = "";
    }
  }

};
