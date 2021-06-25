let initial = true;
const dataSet = [];

import qlik from 'qlik';
const dataSetToString = (headers, data, deletedRows) => {
    let result = headers.reduce((result, header) => {
        result += ` ${header},`;
        return result;
    }, "[")
    result += '\n'
    data.forEach((row, index) => {
        if (!deletedRows.includes(index)) {
            row.forEach((cell) => {
                result += ` ${cell},`
            })
            result += '\n'
        }
    })
    return result += " ]";
}

export default function paint($element, layout) {
    const element = $element[0];
    dataSet.length = 0;
    const app = qlik.currApp(this);
    const script = `
    [Simple writeback]:
    LOAD
        [id],
        [username]
     FROM [lib://grigorev (qlik_team1)/Simple writeback.csv]
    (txt, utf8, embedded labels, delimiter is ',', msq);`

    const deletedRows = [];
    const isPartial = false;

    if (initial) {
        app.setScript(script).then(function (result) {
        });
        app.doReload(0, isPartial, false).then(function (e) {
            if (e) {
                app.doSave();
            }
        });
        initial = false;
    }

    if (element.firstChild) {
        element.firstChild.remove();
        if (element.firstChild) {
            element.firstChild.remove();
            if (element.firstChild) {
                element.firstChild.remove();
            }
        }
    }
    const qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

    const tableHeads = layout.qHyperCube.qDimensionInfo.map((element) => {
        return element.qFallbackTitle;
    })

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const theadrow = document.createElement('tr');

    element.appendChild(table)
    table.appendChild(thead)
    table.appendChild(tbody)
    thead.appendChild(theadrow)

    tableHeads.forEach(header => {
        const td = document.createElement('td');
        td.innerHTML = header
        theadrow.appendChild(td)
    });

    qMatrix.forEach((arr, indexRow) => {
        const tbodyrow = document.createElement('tr');
        dataSet.push([]);
        arr.forEach((element, indexCell) => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.name = `${indexRow},${indexCell}`;
            input.value = (element.qText === undefined || element.qText === 'undefined' ? '' : element.qText);

            dataSet[indexRow].push(element.qText);
            td.appendChild(input)
            tbodyrow.appendChild(td);

            input.addEventListener('change', event => {
                const [rowIndex, cellIndex] = event.target.name.split(',');
                dataSet[rowIndex][cellIndex] = event.target.value;
            })
        })
        const deleteCell = document.createElement('td');
        const delteButton = document.createElement('button');
        delteButton.innerHTML = 'X';
        delteButton.addEventListener('click', () => {
            deletedRows.push(indexRow);
            tbodyrow.remove();
        })

        deleteCell.appendChild(delteButton);
        tbodyrow.appendChild(deleteCell);
        tbody.appendChild(tbodyrow)
    })

    const buttonAdd = document.createElement("button")
    buttonAdd.innerHTML = 'add';
    buttonAdd.className = 'add';
    buttonAdd.addEventListener('click', () => {
        const rowNumber = dataSet.length;
        dataSet.push([])
        const row = document.createElement('tr');
        tableHeads.forEach((header, index) => {
            const td = document.createElement('td')
            const input = document.createElement('input')
            input.type = 'text';
            input.name = `${rowNumber},${index}`
            input.addEventListener('change', event => {
                const [rowIndex, cellIndex] = event.target.name.split(',');
                dataSet[rowIndex][cellIndex] = event.target.value;
            })

            td.appendChild(input);
            row.appendChild(td);
        })
        const deleteCell = document.createElement('td');
        const delteButton = document.createElement('button');
        delteButton.innerHTML = 'X';
        delteButton.addEventListener('click', () => {
            deletedRows.push(rowNumber);
            row.remove();
        })
        deleteCell.appendChild(delteButton)
        row.appendChild(deleteCell);
        tbody.appendChild(row)
    })

    const button = document.createElement("button")
    button.innerHTML = 'Writeback';
    button.className = 'writeback';
    button.addEventListener('click', () => {
        const scriptCreateTable = `
  [Simple]:

    LOAD

    *

    Inline
    ${dataSetToString(tableHeads, dataSet, deletedRows)};

    Left Join LOAD * FROM [lib://grigorev (qlik_team1)/Simple writeback.csv]
    (txt, utf8, embedded labels, delimiter is ',', msq);

    STORE [Simple] INTO [lib://grigorev (qlik_team1)/Simple writeback.csv] (txt);
    `

        app.setScript(scriptCreateTable).then(
            app.doReload(0, isPartial, false).then(function (e) {
                if (e) {
                    app.doSave();
                }
            })
        );

    })
    // console.log(dataSetToString(tableHeads, dataSet));
    element.appendChild(buttonAdd);
    element.appendChild(button);
}