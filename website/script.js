function filterTable(param){
    console.log(param.parentNode);
    filter = param.value.toUpperCase();
    table = param.parentNode.querySelector('table');
    tr = table.getElementsByTagName("tr");
   
    for (i = 0; i < tr.length; i++) {
     td = tr[i].getElementsByTagName("td")[1];
     if (td) {
       txtValue = td.textContent || td.innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         tr[i].style.display = "";
       } else {
         tr[i].style.display = "none";
       }
     }
   }
}


function switchUser(value) {
    populateDiv('http://localhost:3000/favorites/'+ value +'?userId='+ value ,document.querySelector('.favorite'), false, 'Watchlist Portfolio', idSet);
}

function persistFavorite(instrumentId, add){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"userId":document.querySelector(".user").value,"instrumentId":instrumentId});
    
    var requestOptions = {
      method: add ? 'POST' : 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/favorite", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

function getPlusDeleteIcomTD(edit){
    return edit ?
    `<i class="material-icons button edit" onClick="addToFavorites(this)">add</i>` :
    `<i class="material-icons button delete" onClick="removeFromFavorites(this)">delete</i>`;
}

function deleteRow(cell) {
    const favoritesTable = document.querySelector('.favorite');
    var row = cell.parentNode.parentNode;
    idSet.delete(+row.children[0].innerText);
    row.parentNode.removeChild(row);
}

function addToFavorites(param) {
    const favoritesTable = document.querySelector('.favorite');
    const favoritesTableBody = favoritesTable.querySelector('tbody');

    const tr = document.createElement('tr');
    const numberTD = document.createElement('td');
    const nameTD = document.createElement('td');
    const symbolTD = document.createElement('td');
    const typeTD = document.createElement('td');
    const iconTD = document.createElement('td');

    const fromTR = param.parentElement.parentElement;
    numberTD.innerText = fromTR.children[0].innerText;

    if(idSet && idSet.has(+numberTD.innerText)) {
        console.log('this instrument is already in your favorites');
        return;
    } else {
        idSet.add(+numberTD.innerText);
    }

    nameTD.innerText = fromTR.children[1].innerText;
    symbolTD.innerText = fromTR.children[2].innerText;
    typeTD.innerText = fromTR.children[3].innerText;
    iconTD.innerHTML = getPlusDeleteIcomTD(false);

    tr.appendChild(numberTD);
    tr.appendChild(nameTD);
    tr.appendChild(symbolTD);
    tr.appendChild(typeTD);
    tr.appendChild(iconTD);

    favoritesTableBody.appendChild(tr);

    persistFavorite(numberTD.innerText, true);

}

function removeFromFavorites(param) {
    const instrumentId = param.parentElement.parentElement.children[0].innerText;
    deleteRow(param);
    persistFavorite(instrumentId, false);
}

function populateDiv(url, divElement, edit, label, ids){
    fetch(url)
    .then(response => response.json(), console.error)
    .then(json => {
        if(!Array.isArray(json)){
            json = [];
            ids.clear();
        }

        (json || []).forEach(inst => { if (ids)
            { 
                ids.add(inst.instrumentId); 
            } 
        });

        const rows = (json || [])
                .map(inst => (`
                <tr class="table-primary" >
                    <td>${inst.instrumentId}</td>
                    <td>${inst.name}</td>
                    <td>${inst.symbol}</td>
                    <td>${inst.instrumentType}</td>
                    <td>${getPlusDeleteIcomTD(edit)}</td>
                </tr>
            `)
        )

        const template = `
        <label class="table-label">${label}</label> <div></div>
        <input type="text" class="table-filter" onkeyup="filterTable(this)" placeholder="Search by name of instrument">
        <table class='table table-hover'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>symbol</th>
                    <th>type</th>
                    <th> + / - </th>
                </tr>
            </thead>
            <tbody>
                ${rows.join('')}
            </tbody>
        </table>        
        `;


        divElement.innerHTML = template;

    })
    .catch(console.error);
}

let idSet  = new Set();
let userId = document.querySelector(".user").value;
switchUser(userId);
populateDiv('http://localhost:3000/instruments',document.querySelector('.instruments'), true, 'Market Instruments');


