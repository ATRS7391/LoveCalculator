function calculateWithLoader(name1, name2) {
    document.getElementById('container').innerHTML = `
		<div class="loadersss" id="loadersss">
		<div class="loader"></div>
		</div>
		`;
    let url = "https://atrs7391.up.railway.app/api/v2/love_calculator?api_key=love_calculator&name1=" + encodeURIComponent(name1) + "&name2=" + encodeURIComponent(name2);
    // I'm using my API because I am really bad at JavaScript, so I am taking the help of Backend (Python).
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success === true) {
                show(data.results.love_score);
                console.log(data)
            } else {
                showError();
            }
        })
        .catch(() => {
            showError();
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
		<button onclick="getQ()">Calculate</button>
		</div>
		`;
}


function getQ() {
    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;
    let check1 = String(name1).replace(/\s/g, '');
    let check2 = String(name2).replace(/\s/g, '');

    if (check1.length === 0 || check2.length === 0) {
        document.getElementById("wrong").innerHTML = "One or more field is empty or invalid values";
    } else {
        calculateWithLoader(name1, name2)
    }
}


function show(per) {
    document.getElementById("loadersss").innerHTML = `
		<div class="loaders" style="color: white; font-size: 3em;">Your love score is ` + per + `</div>
		<div class="love-check-button" style='margin-top: 5vh;'>
		<button onclick="restore()">Test again</button>
		</div>
		`;
}

function showError() {
    document.getElementById("loadersss").innerHTML = `
		<div class="loaders" style="color: white; font-size: 3em;">Something went wrong, try later. </div>
		<div class="love-check-button" style='margin-top: 5vh;'>
		<button onclick="restore()">Try Later</button>
		</div>
		`;
}
