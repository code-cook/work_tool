function Main(){
  this.name = 'main';
}

Main.prototype._init = function(){
  alert('main init');
}

var main = new Main();
main._init();