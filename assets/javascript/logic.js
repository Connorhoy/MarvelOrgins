// Marvel Origins Logic  // JS Code for Group Project #1
// Project Title and Objective: (Marvel Orgins) - Marvel Heros/Comics API Incorporation.
// Group members: Connor H(Back End), Austin I(Back End), Eric T(Front End), Jasmine B(Front End).



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_NgKLHaccGTEveDv-JmvobTEhXQweZnM",
    authDomain: "marvelorigins-2239c.firebaseapp.com",
    databaseURL: "https://marvelorigins-2239c.firebaseio.com",
    storageBucket: "marvelorigins-2239c.appspot.com",
    messagingSenderId: "17934324832"
  };

  firebase.initializeApp(config);


  // Making a reference to the database.
  var database = firebase.database();





  // Function to run when the sumbit button is pressed.
  $(document).ready(function(){
    $("#submit").on("click", function(event){
      console.log('button clicked');
    // Empty shopping items DIV for next search.
    $("#buttonList").empty();



  // Stops page refresh.
  event.preventDefault();

  // Grabs the user input from search bar.
  var hero = $("#name-input").val().trim();
  console.log(hero);

  database.ref().push({
   Hero: hero
 });


  // Setting var for API url, additionally - call the timestamp and hash neccesary for the Marvel API.
  var queryURL = "https://gateway.marvel.com/v1/public/characters"
  var private = "3462a493d0a51931d5a6e1541399a5574971cef1"
  var public = "0b9403113749dd8e6c6efc4fd3b48e8e"
  var ts = new Date().getTime();
  var hash = md5(ts + private + public).toString();


  //https://gateway.marvel.com:443/v1/public/characters?name=Black%20Widow&apikey=

  // AJAX call for Marvel API.
  $.ajax({
    url: queryURL,
    method: "GET",
    data: { 
      apikey: '0b9403113749dd8e6c6efc4fd3b48e8e',
      limit: 5,
      name: hero,
      ts: ts,
      hash: hash
    }
  })

        // Function to call and console log the response of the JSON call.
        .done(function(response) {
          
          // Variables for inputting data.
          var name = response.data.results[0].name
          var description = response.data.results[0].description
          var image = response.data.results[0].thumbnail.path
          var extension = response.data.results[0].thumbnail.extension
          var details = response.data.results[0].urls[0].url

              // Console Logging out the data.
              console.log(name);
              console.log(description);
              console.log(details);

                    // Requesting the data and posting it on the page.
                    $("#name-display").html(name)
                    $("#origin-desc").html(description)
                    $("#thumbnail").attr("src", image + "/standard_fantastic." + extension)
                    $("#linkbutton").attr("href", details)
          // Document ready and .click function for 'clear cards' button. 
          $(document).ready(function(){
            $("#clear").click(function() {

              // .empty commands to clear the data.
              $("#name-display").empty();
              $("#origin-desc").empty();
              $("#thumbnail").attr("src", "");
              $("#shopping-items").empty();
              console.log("Clear cards button clicked.")

            })


        // EBAY API call via JQuery.
        $(document).ready(function () {
          $.ebay.appid = "AustinIg-MarvelOr-PRD-dcd409a1e-ab72344b";
          $.ebay.siteid = 0;
          $.ebay.call("FindItems",{
            QueryKeywords: $("#name-input").val(),
            HideDuplicateItems: true,
            MaxEntries: 3}
            ,
              // Function that calls the response of the JQuery call.
              function(response){

              // Variables
              var items = response.Item || [];

              //console.log(items)
              //console.log(response)
              //console.log(image)


              for (i = 2; i < items.length; i++) {

               $("#shopping-items").empty();

               $.each(items, function(i, item){
                var image = $("<img>");
                image.attr("src", response.Item[i].GalleryURL)
                var link = $("<a>")
                link.attr("href", item.ViewItemURLForNaturalSearch)
                link.append(image)
                $("#shopping-items").append(link);

                
              })


               

               
             }

           })
          
        })
      })

        })

      }) 
       // begin pulling from firebase
       database.ref().on("child_added", function(childSnapshot) {
        $("#buttonList").empty();
        
      });

       database.ref().orderByChild("dateAdded").limitToLast(5).on("value", function(snapshot) {

         Object.keys(snapshot.val()).forEach(function(key) {
           console.log("Hero ID " + snapshot.val()[key].Hero);
           $("#buttonList").append("<ul><li>" + snapshot.val()[key].Hero + "</li></ul>");
           
         });
       });

     })
