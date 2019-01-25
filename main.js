$("#search").click(search);
var main = $(".main");

$("#card-type").change(function() {
  if ($("#card-type").val() === "pokemon") {
    $("#pokemon").removeClass("removed");
    $("#trainer").addClass("removed");
    $("#energy").addClass("removed");
    $(".pokemon-fields").removeClass("hidden");
  } else if ($("#card-type").val() === "trainer") {
    $("#pokemon").addClass("removed");
    $("#trainer").removeClass("removed");
    $("#energy").addClass("removed");
    $(".pokemon-fields").addClass("hidden");
  } else if ($("#card-type").val() === "energy") {
    $("#pokemon").addClass("removed");
    $("#trainer").addClass("removed");
    $("#energy").removeClass("removed");
    $(".pokemon-fields").addClass("hidden");
  }
});

$(".type").click(function() {
  if ($(this).hasClass("selected")) {
    $(this).removeClass("selected");
  } else {
    $(this).addClass("selected");
  }
});

function search() {
  main.empty();
  let url = "https://api.pokemontcg.io/v1/cards?";
  if (
    $("#name")
      .val()
      .trim()
  ) {
    url +=
      "name=" +
      $("#name")
        .val()
        .trim();
  }
  if ($("#format").val() === "standard") {
    url += "&setCode=smp|sm1|sm2|sm3|sm4|sm5|sm6|sm7|sm8|sm9|sm10";
  }
  //else
  //  if($("#format").val()==="Expanded"){
  //     url += ""}
  if ($("#card-type").val() === "pokemon") {
    url += "&supertype=Pokémon";
    if ($(".selected").length) url += "&types=";
    $(".selected").each(function() {
      url += $(this).attr("alt") + "|";
    });
    url += "&hp=" + $("#max-or-min").val() + $("#max-hp").val();
    if ($("#pokemon-select").val() !== "all") {
      url += "&subtype=" + $("#pokemon-select").val();
    }
  } else if ($("#card-type").val() === "trainer") {
    url += "&supertype=Trainer";
    if ($("#trainer-select").val() !== "all") {
      url += "&subtype=" + $("#trainer-select").val();
    }
  } else if ($("#card-type").val() === "energy") {
    url += "&supertype=Energy";
    if ($("#energy-select").val() !== "all") {
      url += "&subtype=" + $("#energy-select").val();
    }
  }
  console.log(url);

  fetch(url)
    .then(data => data.json())
    .then(res => {
      console.log(res);
      for (let i = 0; i < res.cards.length; i++) {
        const img = $("<img>");
        img.attr("src", res.cards[i].imageUrl);
        img.addClass("card");
        main.append(img);
      }
    });
}

function createurl() {
  if (
    $("#name")
      .val()
      .trim()
  ) {
    url += $("#name")
      .val()
      .trim();
  }
  if ($("#format").val() === "Standard") {
    url += "smp|sm1|sm2|sm3|sm4|xm5|xm6|sm7|sm8|sm9|sm10";
  }
  //else
  //  if($("#format").val()==="Expanded"){
  //     url += ""}
}

$(document).keyup(function(e) {
  if (e.keyCode == 13) {
    search();
  }
});
