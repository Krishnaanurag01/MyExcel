// Storage.
let sheetDB = []

for (let i = 0; i < row; i++) {
    let sheetRow = [];
    for (let j = 0; j < col; j++) {

        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "transparent",
            value: "",
            formula : "",
            children :[]
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");

let underline = document.querySelector(".underline");

let fontSize = document.querySelector(".font-size-prop");

let fontFamily = document.querySelector(".font-family-prop");

let fontColor = document.querySelector(".font-color");

let BGcolor = document.querySelector(".bgcolor");

let alignment = document.querySelectorAll(".alignment");

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

addressBar = document.querySelector(".address-bar");
let activeColorProp = "#d1d8e0";
let InactiveColorProp = "#ecf0f1";



bold.addEventListener("click", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.bold = !cellProp.bold; // data change 
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // ui change 
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : InactiveColorProp; // bold visibility
})

// listener for italic.


italic.addEventListener("click", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.italic = !cellProp.italic; // data change 
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // ui change 
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : InactiveColorProp; // bold visibility
})


// for underline text.


underline.addEventListener("click", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.underline = !cellProp.underline; // data change 
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // ui change 
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : InactiveColorProp; // underline visibility
})


// listener for font size and family.


fontSize.addEventListener("change", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;

})


fontFamily.addEventListener("change", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;

})



/// listener for text color and bg color .

fontColor.addEventListener("change", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

BGcolor.addEventListener("change", (e) => {

    let address = addressBar.value;

    let [cell, cellProp] = getActiveCell(address);

    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((alignItem) => {

    alignItem.addEventListener("click", (e) => {

        let address = addressBar.value;

        let [cell, cellProp] = getActiveCell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;

        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = InactiveColorProp;
                centerAlign.style.backgroundColor = InactiveColorProp;
                break;

            case "right":

                leftAlign.style.backgroundColor = InactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = InactiveColorProp;
                break;

            case "center":

                leftAlign.style.backgroundColor = InactiveColorProp;
                rightAlign.style.backgroundColor = InactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                break;
            default:
                break;
        }
    })
})


// for applying default values in each cell initially.


let all_cells = document.querySelectorAll(".cell");

for (let i = 0; i < all_cells.length; i++) {
    
    addListenerForDefaultProperties(all_cells[i]) ;
    
}

function addListenerForDefaultProperties(cell) {
    cell.addEventListener("click",(e) =>{
        let address = addressBar.value ;
        let [rid,cid] = Decode_RID_CID_address(address);
        let cellProp = sheetDB[rid][cid] ;

        // applying default cell properties.

    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // ui change 
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // ui change 
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // ui change 
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;

    cell.style.backgroundColor = cellProp.BGcolor;

    cell.style.textAlign = cellProp.alignment;


    // now applying the default ui peroperties.
    switch (cellProp.alignment) {
        case "left":
            leftAlign.style.backgroundColor = activeColorProp;
            rightAlign.style.backgroundColor = InactiveColorProp;
            centerAlign.style.backgroundColor = InactiveColorProp;
            break;

        case "right":

            leftAlign.style.backgroundColor = InactiveColorProp;
            rightAlign.style.backgroundColor = activeColorProp;
            centerAlign.style.backgroundColor = InactiveColorProp;
            break;

        case "center":

            leftAlign.style.backgroundColor = InactiveColorProp;
            rightAlign.style.backgroundColor = InactiveColorProp;
            centerAlign.style.backgroundColor = activeColorProp;
            break;
        default:
            break;
    }

    bold.style.backgroundColor = cellProp.bold ? activeColorProp : InactiveColorProp; // bold visibility

    italic.style.backgroundColor = cellProp.italic ? activeColorProp : InactiveColorProp; // bold visibility

    underline.style.backgroundColor = cellProp.underline ? activeColorProp : InactiveColorProp; // underline visibility

    fontSize.value = cellProp.fontSize;

    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    

    // updating formula bar value ;

    let formula_bar = document.querySelector(".formula-bar");
    formula_bar.value = cellProp.formula ;
    cell.value = cellProp.value ;




    })
}


function getActiveCell(address) {
    let [rid, cid] = Decode_RID_CID_address(address);

    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];

    return [cell, cellProp];
}


function Decode_RID_CID_address(address) {

    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) - 65;

    return [rid, cid];
}