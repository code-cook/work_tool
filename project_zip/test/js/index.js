function Index(){
  this.name = 'index';
}

Index.prototype._init = function(){
  alert('index init');
}

var index = new Index();
index._init();