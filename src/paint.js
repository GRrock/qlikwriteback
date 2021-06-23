let initial = true;
export default function paint($element, layout) {
    const element = $element[0];
    //const tableContainer = element.querySelector("tableContainer");
    console.log('element.firstChild');

    if (element.firstChild){
        element.firstChild.remove();
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
        td.innerHTML= header;
        theadrow.appendChild(td)
    });

    qMatrix.forEach(arr => {
        const tbodyrow = document.createElement('tr');
     arr.forEach(element => {
        const td = document.createElement('td');
        td.innerHTML = element.qText
        tbodyrow.appendChild(td);
    })
     tbody.appendChild(tbodyrow)
    })
}
// Store [Simple writeback] into lib://AttachedFiles/Simple_writeback.csv;
/*
// Concatenate LOAD 
// 	[Id],
// 	Date(Date#([Date], 'MM.DD.YYYY') ) AS [Date],
// 	[Name],
// 	[Value],
// 	[Comment] FROM [lib://grigorev (qlik_team1)/Simple writeback.csv];
 

If ScriptErrorCount = 0 then

STORE [Simple writeback] INTO [lib://grigorev (qlik_team1)/Simple writeback.csv];

Let LastExecTime = ThisExecTime;

End If


STORE [Simple writeback] INTO [lib://grigorev (qlik_team1)/Simple writeback.csv] (txt);\



let vFileExists = FileTime('lib://grigorev (qlik_team1)/New folder\users.qvd');
LET vScriptErrorDetails = ScriptErrorDetails;
IF vScriptErrorDetails <> Null() THEN
EXIT SCRIPT;
END IF;
IF vFileExists THEN
users:
REPLACE LOAD
*
From [lib://grigorev (qlik_team1)/New folder\users.qvd] (qvd, utf8);
ELSE
users:
REPLACE LOAD 
Replace( Replace( Replace( Replace( Replace( [Comment], '||vzb_quote_token||', Chr(39) ), '||vzb_doublequote_token||', Chr(34) ), '||vzb_rightSquareBracket_token||', Chr(93) ), '||vzb_newLine_token||', Chr(10) ), '||vzb_space_token||', Chr(32) ) as [Comment],
Replace( Replace( Replace( Replace( Replace( [Date], '||vzb_quote_token||', Chr(39) ), '||vzb_doublequote_token||', Chr(34) ), '||vzb_rightSquareBracket_token||', Chr(93) ), '||vzb_newLine_token||', Chr(10) ), '||vzb_space_token||', Chr(32) ) as [Date],
Replace( Replace( Replace( Replace( Replace( [Id], '||vzb_quote_token||', Chr(39) ), '||vzb_doublequote_token||', Chr(34) ), '||vzb_rightSquareBracket_token||', Chr(93) ), '||vzb_newLine_token||', Chr(10) ), '||vzb_space_token||', Chr(32) ) as [Id],
Replace( Replace( Replace( Replace( Replace( [Value], '||vzb_quote_token||', Chr(39) ), '||vzb_doublequote_token||', Chr(34) ), '||vzb_rightSquareBracket_token||', Chr(93) ), '||vzb_newLine_token||', Chr(10) ), '||vzb_space_token||', Chr(32) ) as [Value],
Replace( Replace( Replace( Replace( Replace( [Name], '||vzb_quote_token||', Chr(39) ), '||vzb_doublequote_token||', Chr(34) ), '||vzb_rightSquareBracket_token||', Chr(93) ), '||vzb_newLine_token||', Chr(10) ), '||vzb_space_token||', Chr(32) ) as [Name],
'$(vAuditCreatedBy)' as [CreatedBy_26a49cb7d7054c5f9c6418789752bdfd],
'$(vAuditCreatedAt)' as [CreatedAt_26a49cb7d7054c5f9c6418789752bdfd]
 Inline [
'Comment','Date','Id','Value','Name','CreatedBy_26a49cb7d7054c5f9c6418789752bdfd','CreatedAt_26a49cb7d7054c5f9c6418789752bdfd'
];

LET vScriptErrorDetails = ScriptErrorDetails;
IF vScriptErrorDetails <> Null() THEN
EXIT SCRIPT;
END IF;
END IF

*/