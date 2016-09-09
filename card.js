var model = {
  init:  function(){
    this.createCards();
  },
  totalMatches: 0,
  currentMatch: 0,
  colors: ["red", "yellow"],
  cards: [],
  faceDown: "black",
  createCards: function() {
    for(var i = 0; i < 2; i++) {
      cards.push(this.colors[i])
      cards.push(this.colors[i])
    }
  }

}

var view = {
  init: function() {
    model.cards.forEach(function(card){
      $('.container').append("<div class='card' id")
    });
  }
}


var controller = {

  init: function() {
    model.init();
    view.init(model.cards);
  }


}


