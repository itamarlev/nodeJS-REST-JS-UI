
fetch('http://localhost:3000/instruments')
    .then(response => response.json(), console.error)
    .then(json => {

        const rows = (json || []).map(inst => (`
                <tr class="table-primary">
                    <td>${inst.instrumentId}</td>
                    <td>${inst.name}</td>
                    <td>${inst.symbol}</td>
                    <td>${inst.instrumentType}</td>
                </tr>
            `)
        )

        const template = `
        <table class='table table-hover'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>symbol</th>
                    <th>type</th>
                </tr>
            </thead>
            <tbody>
                ${rows.join('')}
            </tbody>
        </table>        
        `;

        document.querySelector('.instruments').innerHTML = template;
    })
    .catch(console.error);


    fetch('http://localhost:3000/favorites/1')
    .then(response => response.json(), console.error)
    .then(json => {

        const rows = (json || []).map(inst => (`
                <tr class="table-primary">
                    <td>${inst.instrumentId}</td>
                    <td>${inst.name}</td>
                    <td>${inst.symbol}</td>
                    <td>${inst.instrumentType}</td>
                </tr>
            `)
        )

        const template = `
        <table class='table table-hover'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>symbol</th>
                    <th>type</th>
                </tr>
            </thead>
            <tbody>
                ${rows.join('')}
            </tbody>
        </table>        
        `;

        document.querySelector('.instruments').innerHTML = template;
    })
    .catch(console.error);