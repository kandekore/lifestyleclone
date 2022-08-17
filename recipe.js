let recipelist = localStorage.getItem('meal-list').replace(/\d+/g, '').replace(/-/g,"").replace(/","/g,"").replace(/[\[\]']+/g,'').replace(/["]/g,"").replace(/\\ /g,"")
//shoppinglist.replaceAll('[\\]', '');
// shoppinglist.replace(/[\[\]']+/g,'')
recipelist.replaceAll('[\\]', '');
// shoppinglist.replace(/[\[\]']+/g,'')
// shoppinglist.replace(/[\[\]']+/g,'')



console.log(recipelist);
$("#display").append(recipelist).html()
