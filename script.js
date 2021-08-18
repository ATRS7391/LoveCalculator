function processQuery(query) {
    urlQuery = encodeURIComponent(query.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
    return String(urlQuery);
}

function Calculatewithloader(name1, name2) {
    document.getElementById('container').innerHTML = `
            <div class="loadersss" id="loadersss">
            <div class="loader"></div>
            </div>
            `;
        var url = 'https://atrs-webapis.herokuapp.com/API/calculate_love/' + processQuery(name1) + '/' + processQuery(name2)
        var per;
        // I'm using my API because I am really bad at JavaScript, so I am taking the help of Backend (Python).
            fetch(url).then(function(response) {
                if (response.status != 200) {
                    showerror();
                }
                else {
                    response.text().then(data => per = data).then(() => show(per));
                }
            }).catch(() => {
                showerror();
              });
        
}

function restore() {
    document.getElementById("container").innerHTML = `
    <div class="name1">
    <input type="text" placeholder="Enter your Name " autocomplete="off" spellcheck="false" id="name1"/>
</div>
<div class="name2">
    <input type="text" placeholder="Enter your Partner's or Crush's Name " autocomplete="off" spellcheck="false" id="name2"/>
</div>
<div class="wrong" id="wrong"></div>
<div class="love-check-button">
    <button onclick="getq()">Calculate</button>
</div>
    `;
}


function getq() {
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var check1 = String(name1).replace(/\s/g, '');
    var check2 = String(name2).replace(/\s/g, '');

    if (check1.length == 0 || check2.length == 0) {
        document.getElementById("wrong").innerHTML = "One or more field is empty or invalid values";
    }
    else {
        Calculatewithloader(name1, name2)
    }
}
    

function show(per) {
    document.getElementById("loadersss").innerHTML = `<div class="loaders" style="color: white; font-size: 3em;">Your love score is `+per+`</div>
                    <div class="love-check-button" style='margin-top: 5vh;'>
        <button onclick="restore()">Test again</button>
    </div>`;
}

function showerror() {
    document.getElementById("loadersss").innerHTML = `<div class="loaders" style="color: white; font-size: 3em;">Something went wrong, try later. </div>
                    <div class="love-check-button" style='margin-top: 5vh;'>
        <button onclick="restore()">Try Later</button>
    </div>`;
}
