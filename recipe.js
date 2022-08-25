let recipelist = JSON.parse(localStorage
  .getItem("meal-list"))

  recipelist.shift()
  //   .replace(/\d+/g, "")
  // .replace(/-/g, "")
  // .replace(/","/g, "")
  // .replace(/['[']/g, "<li>")
  // .replace(/]/g, "</li>")
  // .replace(/["]/g, "")
  // .replace(/\\ /g, "");
  var ingr = [""];
  console.log(recipelist)
//shoppinglist.replaceAll('[\\]', '');
// shoppinglist.replace(/[\[\]']+/g,'')
// recipelist.replaceAll("[\\]", "");
// shoppinglist.replace(/[\[\]']+/g,'')
// shoppinglist.replace(/[\[\]']+/g,'')

// let recipeid = localStorage
//   .getItem("meal-list")
//   .replace(/[<= => “ ”]/g, "")
//   .replace(/[a-z]/g, "")
//   .replace(/[A-Z]/g, "")
//   .replace(/-/g, "")
//   .replace(/","/g, "")
//   .replace(/[\[\]']+/g, "")
//   .replace(/["]/g, "")
//   .replace(/[/]/g, "")
//   .replace(/\\ /g, "");

recipelist.forEach((element) => {
   var listitem = $("<li>");
  listitem.addClass("item");
  listitem.text(element);
  var container = $("<div>");
  container.addClass("container")
  var button = $("<button>");
  button.text("Delete");
  var open = $("<button>");
  open.text("Open");
  open.addClass("open")
  
  
  // var button = document.querySelector("#delete");
button.on("click", function remove() {
  var liItem = $(this).siblings("li").text();
  const recipelist = JSON.parse(localStorage.getItem("meal-list"));
  const filtered = recipelist.filter(item => item !== liItem);
  localStorage.setItem("meal-list", JSON.stringify(filtered));
  location.reload()
 });
 
 container.append(button);
 container.append(open);
 
  container.append(listitem);
  
  $("#display").append(container);

  open.on("click", function openmeal() {
    var query = $(this).siblings("li").text();
    console.log(query);
    // fetch("https://tasty.p.rapidapi.com/recipes/get-more-info?id="+query, {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "23fecd81a3mshb52812b90f54ff6p137a2ajsna2c88b9cae07",
    //     "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    //   },
    // })
    fetch(
      "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=" +
        query,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "23fecd81a3mshb52812b90f54ff6p137a2ajsna2c88b9cae07",
          "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.results);
        //   console.log(data.results.name);
          for (let i = 0; i < data.results.length; i++) {
            var html = "";
  
            console.log(data.results);
         
        var html = "";
  
        // console.log(data.results[i].nutrition.calories);
  
        var did = data.results[i].id;
        var mealName = data.results[i].name;
        var description = data.results[i].description;
  
        var instructionsHtml = "";
        var ingredientsHtml = "";
        var componentsHtml = "";
        var nutritionHTML =
          "<li>Calories: " +
          data.results[i].nutrition.calories +
          "<li><li>Carbohydrates: " +
          data.results[i].nutrition.carbohydrates +
          "<li>";
  
        //   if (data.instructions.length > 0) {
        //     instructionsHtml += "<ul>";
  
        for (let j = 1; j < data.results[i].instructions.length; j++) {
          instructionsHtml +=
            "<li>" + data.results[i].instructions[j].display_text + "</li>";
        }
        instructionsHtml += "</ul>";
  
        for (let k = 0; k < data.results[i].sections.length; k++) {
          componentsHtml += "<li>" + data.results[i].sections[k] + "</li>";
        }
        componentsHtml += "</ul>";
  
        for (let l = 0; l < data.results[i].sections["0"].components.length; l++) {
          ingredientsHtml +=
            "<li a href='#' class='listitem'>" +
            data.results[i].sections["0"].components[l].raw_text +
            "</li>";
          console.log("#tabcon-" + did + " a");
        }
  
        ingredientsHtml += "</ul>";
  
        var rating = Math.round(data.results[i].user_ratings.score * 10);
        var votes =
          data.results[i].user_ratings.count_positive + data.results[i].user_ratings.count_negative;
  
        // console.log(votes);
          
  
        var nutritionHTML =
          "<li>Calories: " +
          data.results[i].nutrition.calories +
          "</li><li>Carbohydrates: " +
          data.results[i].nutrition.carbohydrates +
          "</li><li>Fat: " +
          data.results[i].nutrition.fat +
          "</li><li>Fibre: " +
          data.results[i].nutrition.fibre +
          "</li><li>Protein: " +
          data.results[i].nutrition.protein +
          "</li><li>Sugar: " +
          data.results[i].nutrition.sugar +
          "</li>";
  
        html += "<div class='tab' id='" + did + "'>";
        html +=
          "<div class='header'><div><h2>" +
          data.results[i].name +
          "</h2></div><strong><p class='cooking-time'>Cooking Time: </strong>" +
          data.results[i].cook_time_minutes +
          "mins  -<strong>  Prep Time: </strong>" +
          data.results[i].prep_time_minutes +
          "mins<br><strong>  Servings: </strong>" +
          data.results[i].num_servings +
          "  -<strong>  User Rating: </strong>" +
          rating +
          "/10 (" +
          votes +
          " votes)</p></div>";
        html +=
          "<button class='tablinks tabbtn-" +
          did +
          " active' id='overview" +
          did +
          "' data-id='" +
          did +
          "'>Overview</button>";

      
  
        html +=
          "<button class='tablinks tabbtn-" +
          did +
          "' id='ingredients" +
          did +
          "'  data-id='" +
          did +
          "'>Ingredients</button>";
        html +=
          "<button class='tablinks tabbtn-" +
          did +
          "' id='instructions" +
          did +
          "'  data-id='" +
          did +
          "'>Instructions</button>";
        html += "</div>";
        html +=
          "<div class='tabcontent tabcon-" +
          did +
          " active overview" +
          did +
          "'><div class='row'><div class='col s3'><img class='activator' src='" +
          data.results[i].thumbnail_url +
          "'/></div>";
        html +=
          "<div class='col s3'>" +
          data.results[i].description +
          "<div><h4>Nutrition</h4>" +
          nutritionHTML +
          "</div></div></div>";
        html += "</div>";
        html +=
          "<div class='tabcontent tabcon-" +
          did +
          " ingredients" +
          did +
          "'><ul class='inglist'>" +
          ingredientsHtml +
          "</ul><a href='#'></a></div>";
        html +=
          "<div class='tabcontent tabcon-" +
          did +
          " instructions" +
          did +
          "'>" +
          instructionsHtml +
          "</div>";
      
        $(".card-action").append(html);
      
        $(".listitem").on("click", function (event) {
          event.preventDefault();
          $(this).attr("id", "done");
console.log($(this).text());
          ingr.push(
            // "<li id='item'>" +
              $(this).text()
            
                .replace(/\d+/g, "")
                .replace(
                  /tablespoons|tablespoon|cups|pints|teaspoons|to taste|slices|of|ounces|sliced|teaspoon|cup|sharp|¼|¾|½|⅓|room temperature|-ounce|-ounces|plus more|-whole|cans|can/g,
                  ""
                  
                ).trim()
               
                // +"</li>"
          );
          // names.push($(this).html())
          let filteredNames = [...new Set(ingr)];

          console.log(filteredNames);

          localStorage.setItem("shopping-list", JSON.stringify(filteredNames));
        });
      }
      
      });
});

  })



function openTab(evt, id) {
  alert(id);
  alert(evt);
}
var preExistingData = localStorage.getItem("meal-list")
// .replace(/[[]/g, "<div><li>").replace(/[]]/g, "").replace(/","/g, "</li><button id='delete'>Delete</button></div><div class='container'><li>").replace(/"/g, "").replace(/[\[\]']+/g, "");






var names = [" "];
names.push(preExistingData);
if (preExistingData === null) {
  var names = [""];
}

console.log(names);
console.log(recipelist);
console.log(preExistingData)

// preExistingData.forEach((element) => {
//   var listitem = $("<li>");
//   listitem.addClass("item");
//   listitem.text(element);
//   var container = $("<div>");
//   container.addClass("container")
//   var button = $("<button>");
//   button.text("delete");})


// console.log(recipeid);
// $("#display").append(container);
var idGen = $(".item").attr("id");
// console.log(idGen);

// $(".open").on("click", function (event) {
//   var query = $(this).attr("id");
//   console.log(query);
//   fetch("https://tasty.p.rapidapi.com/recipes/get-more-info?id=" + query, {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "23fecd81a3mshb52812b90f54ff6p137a2ajsna2c88b9cae07",
//       "X-RapidAPI-Host": "tasty.p.rapidapi.com",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       console.log(data.name);
//       //   console.log(data.results[i].name);
//       //   for (let i = 0; i < data.results[i].length; i++) {
//       //     var html = "";

//       //     console.log(data.results);
//       //   }
//       var html = "";

//       console.log(data);

//       var did = data.id;
//       var mealName = data.name;
//       var description = data.description;

//       var instructionsHtml = "";
//       var ingredientsHtml = "";
//       var componentsHtml = "";
//       var nutritionHTML =
//         "<li>Calories: " +
//         data.nutrition.calories +
//         "<li><li>Carbohydrates: " +
//         data.nutrition.carbohydrates +
//         "<li>";

//       //   if (data.instructions.length > 0) {
//       //     instructionsHtml += "<ul>";

//       for (let j = 1; j < data.instructions.length; j++) {
//         instructionsHtml +=
//           "<li>" + data.instructions[j].display_text + "</li>";
//       }
//       instructionsHtml += "</ul>";

//       for (let k = 0; k < data.sections.length; k++) {
//         componentsHtml += "<li>" + data.sections[k] + "</li>";
//       }
//       componentsHtml += "</ul>";

//       for (let l = 0; l < data.sections["0"].components.length; l++) {
//         ingredientsHtml +=
//           "<li a href='#' class='listitem'>" +
//           data.sections["0"].components[l].raw_text +
//           "</li>";
//         console.log("#tabcon-" + did + " a");
//       }

//       ingredientsHtml += "</ul>";

//       var rating = Math.round(data.user_ratings.score * 10);
//       var votes =
//         data.user_ratings.count_positive + data.user_ratings.count_negative;

//       // console.log(votes);

//       var nutritionHTML =
//         "<li>Calories: " +
//         data.nutrition.calories +
//         "</li><li>Carbohydrates: " +
//         data.nutrition.carbohydrates +
//         "</li><li>Fat: " +
//         data.nutrition.fat +
//         "</li><li>Fibre: " +
//         data.nutrition.fibre +
//         "</li><li>Protein: " +
//         data.nutrition.protein +
//         "</li><li>Sugar: " +
//         data.nutrition.sugar +
//         "</li>";

//       html += "<div class='tab' id='" + did + "'>";
//       html +=
//         "<div class='header'><div><h2>" +
//         data.name +
//         "</h2></div><strong><p class='cooking-time'>Cooking Time: </strong>" +
//         data.cook_time_minutes +
//         "mins  -<strong>  Prep Time: </strong>" +
//         data.prep_time_minutes +
//         "mins<br><strong>  Servings: </strong>" +
//         data.num_servings +
//         "  -<strong>  User Rating: </strong>" +
//         rating +
//         "/10 (" +
//         votes +
//         " votes)</p></div>";
//       html +=
//         "<button class='tablinks tabbtn-" +
//         did +
//         " active' id='overview" +
//         did +
//         "' data-id='" +
//         did +
//         "'>Overview</button>";

//       html +=
//         "<button class='tablinks tabbtn-" +
//         did +
//         "' id='ingredients" +
//         did +
//         "'  data-id='" +
//         did +
//         "'>Ingredients</button>";
//       html +=
//         "<button class='tablinks tabbtn-" +
//         did +
//         "' id='instructions" +
//         did +
//         "'  data-id='" +
//         did +
//         "'>Instructions</button>";
//       html += "</div>";
//       html +=
//         "<div class='tabcontent tabcon-" +
//         did +
//         " active overview" +
//         did +
//         "'><div class='row'><div class='col s3'><img class='activator' src='" +
//         data.thumbnail_url +
//         "'/></div>";
//       html +=
//         "<div class='col s3'>" +
//         data.description +
//         "<div><h4>Nutrition</h4>" +
//         nutritionHTML +
//         "</div></div></div>";
//       html += "</div>";
//       html +=
//         "<div class='tabcontent tabcon-" +
//         did +
//         " ingredients" +
//         did +
//         "'><ul class='inglist'>" +
//         ingredientsHtml +
//         "</ul><a href='#'></a></div>";
//       html +=
//         "<div class='tabcontent tabcon-" +
//         did +
//         " instructions" +
//         did +
//         "'>" +
//         instructionsHtml +
//         "</div>";

//       $(".title").append(html);
//     });
// });

// var button = document.querySelector("#delete");
// button.addEventListener("click", function remove() {
//   var liItem = $(this).siblings("li").text();
//   const recipelist = JSON.parse(localStorage.getItem("meal-list"));
//   const filtered = recipelist.filter(item => item !== liItem);
//   localStorage.setItem("meal-list", JSON.stringify(filtered));
//   location.reload()
//  })

//   .then((response) => response.json())
//     .then((data) => {
//         for (let i = 0; i < data.results[i].length; i++) {
//             var html = "";

//             console.log(data.results[i]);
//         }
//     });
