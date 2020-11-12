
console.log("1");
dragElement(document.getElementById("slide"));

function dragElement(elmnt) {
    console.log('test');
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    

    function dragMouseDown(e) {
        console.log('test');
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        console.log(elmnt.offsetLeft - pos1)
        if (elmnt.offsetLeft - pos1 < 1){
            elmnt.style.left = "0px";
        }else if (elmnt.offsetLeft - pos1 > window.innerWidth - 50){
            elmnt.style.left = (window.innerWidth - 50) + "px";
        }
        else{
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
