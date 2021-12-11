
for (let i = 0; i < row ; i++) {
    for (let j = 0; j < col ; j++) {
        
        let cell = document.querySelector(`.cell[rid="${i}"][cid ="${j}"]`);

        cell.addEventListener("blur",(e) => {
            let address = addressBar.value ;

            let [activeCell,activeCellProp] = getActiveCell(address);

            let newData = activeCell.innerText ;

            if(newData === activeCellProp.value) return ;





            activeCellProp.value = newData ;

            removeChildrenFromParents(activeCellProp.formula) ;
            activeCellProp.formula = "";
            updateChildrenCells(address) ;
        })
    }
}

let formula_bar = document.querySelector(".formula-bar");

formula_bar.addEventListener("keydown", (e) => {

    let formula = formula_bar.value ;

    if(e.key === "Enter" && formula){


        let address = addressBar.value ;

        let [cell , cellprop] = getActiveCell(address) ;

        if(cellprop.formula != formula ) removeChildrenFromParents(cellprop.formula) ;


        addChildToGraphComponent(formula,address) ;

        let isCyclic = isGraphCyclic(graphComponentMatrx) ;

        if(isCyclic === true){
            alert("Your Graph is Cyclic !");
            removeChildToGraphComponent(formula,address);
            return ;
        }

        let formula_value_is = get_formula_value(formula) ;

        setValue_in_cell_and_cellprops(formula, formula_value_is,address);
        addChildrenToParent(formula);

        console.log(sheetDB);

        updateChildrenCells(address);


    }
})



function addChildToGraphComponent(formula,childAddress) {
    let[crid,ccid] = Decode_RID_CID_address(childAddress) ;
    let encodeFormula = formula.split(" ");

    for (let i = 0; i < encodeFormula.length ; i++) {
        
        let asciiValue = encodeFormula[i].charCodeAt(0) ;

        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid,pcid] = Decode_RID_CID_address(encodeFormula[i]);

            graphComponentMatrx[prid][pcid].push([crid,ccid]) ;
        }
        
    }
}


function removeChildToGraphComponent(formula,childAddress) {
    let[crid,ccid] = Decode_RID_CID_address(childAddress) ;
    let encodeFormula = formula.split(" ");

    for (let i = 0; i < encodeFormula.length ; i++) {
        
        let asciiValue = encodeFormula[i].charCodeAt(0) ;

        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid,pcid] = Decode_RID_CID_address(encodeFormula[i]);

            graphComponentMatrx[prid][pcid].pop() ;
        }
        
    }
}


function updateChildrenCells(parentAddress) {
    let [ParentCell,ParentCellProp] = getActiveCell(parentAddress) ;
    let children = ParentCellProp.children ;

    for (let i = 0; i < children.length ; i++) {
        let ChildrenAddress = children[i] ;

        let [childCell , ChildCellProp] = getActiveCell(ChildrenAddress) ;

        let childFormula = ChildCellProp.formula ;

        let evaluted_value = get_formula_value(childFormula) ;

        setValue_in_cell_and_cellprops(childFormula , evaluted_value , ChildrenAddress) ;

        updateChildrenCells(ChildrenAddress) ; // changing in the children's children value.
        
    }
}


function removeChildrenFromParents(formula) {

    let ChildrenAddress = addressBar.value ;

    let evaluted_formula_arr = formula.split(" ");

    for (let i = 0; i < evaluted_formula_arr.length ; i++) {
        
        let evalueted_element_ascii = evaluted_formula_arr[i].charCodeAt(0);

        if(evalueted_element_ascii >= 65  && evalueted_element_ascii <= 90){
            let [ParentCell,ParentCellProp] = getActiveCell(evaluted_formula_arr[i]);
            
            let idx = ParentCellProp.children.indexOf(ChildrenAddress) ;
            ParentCellProp.children.splice(idx,1)   ;
        }
        
    }
    
}


function addChildrenToParent(formula) {

    let ChildrenAddress = addressBar.value ;

    let evaluted_formula_arr = formula.split(" ");

    for (let i = 0; i < evaluted_formula_arr.length ; i++) {
        
        let evalueted_element_ascii = evaluted_formula_arr[i].charCodeAt(0);

        if(evalueted_element_ascii >= 65  && evalueted_element_ascii <= 90){
            let [ParentCell,ParentCellProp] = getActiveCell(evaluted_formula_arr[i]);
            // evaluted_formula_arr[i] = cellProp.value ;
            ParentCellProp.children.push(ChildrenAddress);
        }
        
    }
}














function get_formula_value(formula) {

    let evaluted_formula_arr = formula.split(" ");

    for (let i = 0; i < evaluted_formula_arr.length ; i++) {
        
        let evalueted_element_ascii = evaluted_formula_arr[i].charCodeAt(0);

        if(evalueted_element_ascii >= 65  && evalueted_element_ascii <= 90){
            let [cell,cellProp] = getActiveCell(evaluted_formula_arr[i]);
            evaluted_formula_arr[i] = cellProp.value ;
        }
        
    }

    let decoded_formula = evaluted_formula_arr.join(" ");
    return eval(decoded_formula) ;
}

function setValue_in_cell_and_cellprops(formula,formula_value_is,address) {
    // let address = addressBar.value ;
    let [cell , cellProp] = getActiveCell(address);

    cell.innerText = formula_value_is ;
    cellProp.value = formula_value_is ;
    cellProp.formula = formula ;
}