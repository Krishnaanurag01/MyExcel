let row = 100 ;
let col = 26 ;

let addressBar = document.querySelector(".address-bar")

let addressColCont = document.querySelector(".address-col-cont");

for (let i = 0; i < row ; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class","address-col") ;
    addressCol.innerText = i+1 ;
    addressColCont.appendChild(addressCol);
}


let addressRowCont = document.querySelector(".address-row-cont");

for (let i = 0; i < col ; i++) {

    let address_row = document.createElement("div");

    address_row.setAttribute("class","address-row");
    address_row.innerText = String.fromCharCode(i+65);

    addressRowCont.appendChild(address_row) ;
}

let cells_cont = document.querySelector(".cells-cont");

for (let i = 0; i < row; i++) {
    let row_cont = document.createElement("div");
    for (let j = 0; j < col ; j++) {
        let cells = document.createElement("div");
        cells.setAttribute("class","cell");
        cells.setAttribute("contentEditable","true")
        cells.setAttribute("spellcheck","false")


        // for cell and storage identification.
        cells.setAttribute("rid",i);
        cells.setAttribute("cid",j);
        
        row_cont.appendChild(cells) ;

        addressListenerToDisplay(cells,i,j);
    }
    row_cont.setAttribute("class","row-cont");
    cells_cont.appendChild(row_cont);
}

function addressListenerToDisplay(cells,i,j) {

    cells.addEventListener("click",(e)=>{
        let rowId = i+1;
        let colId = String.fromCharCode(j+65);
        addressBar.value = `${colId}${rowId}`;
    })
    
}

// default cell.

let default_cell = document.querySelector(".cell");

default_cell.click();