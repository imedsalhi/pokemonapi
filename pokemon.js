function charger() {
    afficher('https://pokeapi.co/api/v2/pokemon');
}
var nextp = "";
var prev = "";

function nextpage(id) {

    var adresse = "";
    switch (id) {
        case 'a':
            afficher(nextp);

            break;
        case 'b':
            if (prev.length > 1) {
                afficher(prev);
            }

            break;

    }

}

function detaille(url) {

    fetch(url)
        .then(
            response => response.json())
        .then(
            function(data) {



                var Parent = document.getElementById("pokemon_info");
                Parent.innerHTML = "";

                var id = document.createElement("li");

                id.innerText = "id = " + data.id;
                Parent.appendChild(id);
                var nom = document.createElement("li");

                nom.innerText = "nom = " + data.forms[0].name;
                Parent.appendChild(nom);
                var hight = document.createElement("li");


                hight.innerText = "hight = " + data.height;
                Parent.appendChild(hight);
                var pic = document.createElement("img");
                // alert(chargerpic(data.forms[0].url));
                // chargerpic(data.forms[0].url);
                fetch(data.forms[0].url)
                    .then(
                        response => response.json())
                    .then(
                        function(data) {
                            pic.setAttribute("src", data.sprites.front_shiny);


                        })
                    .catch(function(error) { alert("Erreur : " + error); })
                    //  pic.setAttribute("src", imgres);
                Parent.appendChild(pic);






            })
        .catch(function(error) { alert("Erreur : " + error); })
}
var imgres = ""

function chargerpic(url) {

    fetch(url)
        .then(
            response => response.json())
        .then(
            function(data) {
                imgres = data.sprites.front_shiny;


            })
        .catch(function(error) { alert("Erreur : " + error); })


}

function afficher(url) {
    fetch(url)
        .then(
            response => response.json())
        .then(
            function(data) {
                nextp = data.next;

                prev = data.previous;
                var Parent = document.getElementById("pokemon_list");
                Parent.innerHTML = "";
                for (let index = 0; index < data.results.length; index++) {
                    var new_element = document.createElement("li");
                    new_element.addEventListener('click',
                        function() {
                            detaille(data.results[index].url);
                        }
                    );

                    new_element.innerText = data.results[index].name;
                    Parent.appendChild(new_element);


                }


            })
        .catch(function(error) { alert("Erreur : " + error); })
}