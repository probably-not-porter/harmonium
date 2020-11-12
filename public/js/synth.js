document.documentElement.ondragstart = function(){return(false)}
var mouse_IsDown = false
document.documentElement.addEventListener("mousedown", function(){mouse_IsDown = true })
document.documentElement.addEventListener("mouseup",   function(){mouse_IsDown = false})

// Initialize Tone.js Synthesizer
const synth = new Tone.PolySynth({voice: Tone.Synth}).toMaster()
let notes = [];
let prev_note;
let root;

// Update Key Colors for Pressed/Released States
function update_KeyColor(key, keyState){
    let key_obj;
    for(let k of keyboard.children){
        if (k.dataset.note == key){
            key_obj = k;
            break;
        }
    }
    if (key_obj){
        keyColor = key_obj.matches(".white") ? "white" : "black"
        if     (keyColor=="white" && keyState=="up"  ){key_obj.style.backgroundColor = "#CBCBCB"}
        else if(keyColor=="white" && keyState=="down"){key_obj.style.backgroundColor = "#BBBBDD"}
        else if(keyColor=="white" && keyState=="harm"){key_obj.style.backgroundColor = "#BBDDBB"}
        else if(keyColor=="black" && keyState=="up"  ){key_obj.style.backgroundColor = "#222222"}
        else if(keyColor=="black" && keyState=="down"){key_obj.style.backgroundColor = "#666699"}
        else if(keyColor=="black" && keyState=="harm"){key_obj.style.backgroundColor = "#669966"}
    }
} 

function create_harmony(r,n){
    let root_val = conversion.indexOf(r);
    let _h = harmonies[n];

    let h_1 = conversion[root_val + _h[0]];
    let h_2 = conversion[root_val + _h[1]];
    let h_3 = conversion[root_val + _h[2]];
    return [r, h_1, h_2, h_3];
}

// Key Pressed/Released Callbacks
function change_harm(n){
    synth.triggerRelease(notes, undefined)
    update_KeyColor(notes[0], "up");
    update_KeyColor(notes[1], "up");
    update_KeyColor(notes[2], "up");
    update_KeyColor(notes[3], "up");
    notes = create_harmony(root, n);
    update_KeyColor(notes[0], "down");
    update_KeyColor(notes[1], "harm");
    update_KeyColor(notes[2], "harm");
    update_KeyColor(notes[3], "harm");
    synth.triggerAttack(notes, undefined, 1)
}
function play_Note(key){
    if (prev_note){
        release_Note(prev_note);
    }
    prev_note = key;
    root = key.dataset.note
    notes = create_harmony(root, 0);
    document.getElementById('notes').innerHTML = notes;
    synth.triggerAttack(notes, undefined, 1)
    update_KeyColor(key.dataset.note, "down");
    update_KeyColor(notes[1], "harm");
    update_KeyColor(notes[2], "harm");
    update_KeyColor(notes[3], "harm");
}
function release_Note(key){
    synth.triggerRelease(notes, undefined)
    document.getElementById('notes').innerHTML = "";
    
    update_KeyColor(key.dataset.note, "up");
    update_KeyColor(notes[1], "up");
    update_KeyColor(notes[2], "up");
    update_KeyColor(notes[3], "up");
    notes = [];
}
                                    
// Hook Key Callbacks to Mouse/Touch Events
var keyboard = document.getElementById("keyboard")
for(let key of keyboard.children){
    key.addEventListener("mousedown",  function(){play_Note(key)                 })
    key.addEventListener("touchstart", function(){play_Note(key)                 })
    key.addEventListener("touchend",   function(){release_Note(key)              })
}
