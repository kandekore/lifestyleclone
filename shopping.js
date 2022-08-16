let shoppinglist = localStorage.getItem('shopping-list').replace(/","/g,"").replace(/[\[\]']+/g,'').replace(/["]/g,"").replace(/\\ /g,"")
shoppinglist.replaceAll('[\\]', '');
// shoppinglist.replace(/[\[\]']+/g,'')
// shoppinglist.replace(/[\[\]']+/g,'')



console.log(shoppinglist);
$("#display").append(shoppinglist).html()

