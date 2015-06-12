var Matcher = {
  col : {
    a : [],
    b : []
  },
  parse : function(source){
    var src = source.innerText.trim().split("\n").reverse();
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
    el = document.getElementById(el);
    el.innerHTML = "";
    column.reverse();
    for(var t = column.length - 1; t >= 0; t--){
      var li = document.createElement("LI");
      li.innerText = column[t];
      el.appendChild(li);
    }
  },
  shuffle : function(col){
    var i = col.length, v, r;
    while(i !== 0){
      r = Math.floor(Math.random() * i--);
      v = col[i];
      col[i] = col[r];
      col[r] = v;
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
  Matcher.place(Matcher.col.b, "desc");
  document.getElementById("shuffle").addEventListener("click", function(){
    Matcher.shuffle(Matcher.col.b);
    Matcher.place(Matcher.col.b, "desc");
  });
}
