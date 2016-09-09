// Holds state regarding the cards.
var model = {
  init:  function(){
    this.askForGrid();
    this.createCards();
  },

    // Properties.
  totalMatches: 0,
  currentMatch: "",
  colors: ["red", "yellow", "green", "blue", "black", "purple", "pink"],
  cards: [],
  faceDown: "black",
  hasMatch: false,
  clickedCards: [],
  lastClicked: '',
  grid: 0,

  askForGrid: function() {
    this.grid = parseInt(prompt("How many squares per row do you want?"));
    console.log(this.grid)
    if (this.grid > 7) {
      this.grid = 7;
    }
  },

  // Modifying state.
  createCards: function() {
    console.log(this.grid);
    for(var j = 0; j < this.grid; j++) {

      this.cards.push(this.colors[j]);
      this.cards.push(this.colors[j]);
    }
    this.shuffle(this.cards);
  },

  shuffle: function(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  },

  addClickedCard: function(color) {
    this.clickedCards.push(color);
  },

  checkCurrentStoredColor: function(color) {
    //debugger;
    if (this.clickedCards.length === 2) {
      if (this.clickedCards[0] === this.clickedCards[1]) {
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

  // makeGrid: function(grid) {
  //   $container()
  // }
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
      if (!controller.compareDivs(this)) {
        controller.changeLastClicked(this);
        controller.sendColor(this.id);
        controller.checkColor(this.id);
        controller.leaveColorDisplayed(this.id);
      }
    });
  },

  removeColors: function(color, currentMatch) {
    // $cards.find("#" + currentMatch).removeClass(currentMatch);
    // $cards.find("#" + color).removeClass(color);
    setTimeout(function(){
      $(".container").find("div").removeClass(color);
      $(".container").find("div").removeClass(currentMatch);
       }, 1000);
  }
};

// Gets data from model, passes data to view.
var controller = {

  init: function() {
    model.init();
    //view.makeGrid(model.grid);
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
      view.removeColors(model.clickedCards.pop(),
        model.clickedCards.pop());
      model.hasMatch = false;
    }
  },

  changeLastClicked: function(div) {
    model.lastClicked = div;
  },

  compareDivs: function(div) {
    if (model.lastClicked !== '') {
      return model.lastClicked === div;
    } else {
      return false;
    }
  }

};
