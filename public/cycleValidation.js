let graphComponentMatrx = [] ;

for (let i = 0; i < row ; i++) {
    
    let roww = [] ;

    for (let j = 0; j < col ; j++) {
        
        roww.push([]);
    }
    graphComponentMatrx.push(roww) ;
}


// return true if cyclic else false.

function isGraphCyclic(graphComponentMatrx) {
    
    let visited = [] ;
    let dfsVisited = [] ;

    for (let i = 0; i < row ; i++) {
        let visitedRow = [] ;
        let dfsVisitedRow = [] ;

        for (let j = 0; j < col ; j++) {
           visitedRow.push(false) ;
           dfsVisitedRow.push(false) ;            
        }

        visited.push(visitedRow) ;
        dfsVisited.push(dfsVisited);
    }

    for (let i = 0; i < row ; i++) {
        for(let j = 0 ; j < col ; j++){

            if(visited[i][j] == false){
                
                let response =  dfsCycleDetection(graphComponentMatrx,i,j,visited,dfsVisited) ;

                if(response == true) return true ;
            }

        }
        
    }

    return false ;

}



/*
start -> vis[true] and dfsVisited[true]
end -> dfsVisited[false]
cyclce detection condition -> if ( visited[true] && dfsvisited[true] == cycle)
*/

function dfsCycleDetection(graphComponentMatrx,srcI,srcJ,visited,dfsVisited)  {
    
    visited[srcI][srcJ] = true ;
    dfsVisited[srcI][srcJ] = true ;


    for (let children = 0; children < graphComponentMatrx[srcI][srcJ].length ; children++) {
        // iterating over each neigbour.

        let [nbri , nbrj] = graphComponentMatrx[srcI][srcJ][children] ;

        if(visited[nbri][nbrj] == false){

            let response = dfsCycleDetection(graphComponentMatrx,nbri,nbrj,visited,dfsVisited) ;

            if(response == true) return true ; // returning true if cycle is found.
        }
        else if(visited[nbri][nbrj] == true && dfsVisited[nbri][nbrj] == true){
            return true ; // cycle detected
        }   
    }

    dfsVisited[srcI][srcJ] = false ;
    return false ;
}