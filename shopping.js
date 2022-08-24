let shoppinglist = JSON.parse(localStorage.getItem("shopping-list"));

shoppinglist.shift()

// .replace(/","/g, "")
// .replace(/[\[\]']+/g, "")
// .replace(/["]/g, "")
// .replace(/[,]/g, "")
// .replace(/\\/g, "");

// shoppinglist.replaceAll("[\\]g", "");

console.log(shoppinglist);
// $("#display").append(shoppinglist).html();

shoppinglist.forEach((element) => {
  var listitem = $("<li>");
  listitem.addClass("item");
  listitem.text(element);
  var container = $("<div>");
  container.addClass("container")
  var button = $("<button>");
  button.text("delete");
  // button.on("click", function () {
  // var liItem = $(this).siblings("li").text();
  // localStorage.setItem("shopping-list", JSON.stringify(shoppinglist));
  // console.log( $(this).siblings("li").text())
  //   }
    button.on("click", function remove() {
      var liItem = $(this).siblings("li").text();
      const shoppinglist = JSON.parse(localStorage.getItem("shopping-list"));
      const filtered = shoppinglist.filter(item => item !== liItem);
      localStorage.setItem("shopping-list", JSON.stringify(filtered));
      location.reload()
     }
     
  );
  container.append(button);
  container.append(listitem);
  
  $("#display").append(container);
});
