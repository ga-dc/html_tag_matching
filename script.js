var Matcher = {
  col : {
    a : [],
    b : []
  },
  parse : function(source){
    var src = source.textContent.trim().split("\n").reverse();
    for(var t = src.length - 1; t >= 0; t--){
      var line = src[t].split(",");
      this.col.a.push(line[0]);
      this.col.b.push(line[1]);
    }
  },
  format : function(column, callback){
    for(var i = column.length - 1; i >= 0; i--){
      column[i] = callback(column[i]);
    }
  },
  place : function(column, el, shuffle){
    var li, i, l = column.length;
    el = document.getElementById(el);
    el.innerHTML = "";
    for(i = 0; i < l; i++){
      li = document.createElement("LI");
      li.textContent = column[i];
      el.appendChild(li);
    }
  }
}

window.onload = function(){
  Matcher.parse(document.getElementById("raw"));
  Matcher.format(Matcher.col.b, function(tag){
    if(/^\./.test(tag)){
      return "&" + tag.substring(1) + ";";
    }else{
      return "<" + tag + ">";
    }
  });
  Matcher.place(Matcher.col.a, "tags");
  Matcher.place(shuffle(Matcher.col.b), "desc");
  document.getElementById("button").addEventListener("click", function(){
    Matcher.place(Matcher.col.b, "desc");
  });

  function shuffle(array){
    var i = array.length, v, r;
    array = array.slice();
    while(i !== 0){
      r = Math.floor(Math.random() * i--);
      v = array[i];
      array[i] = array[r];
      array[r] = v;
    }
    return array;
  }
}
