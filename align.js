
// UNSCREEN :-
// for removing video / gif background we have used unscreen





// INTIALIZING VARIABLES :-
console.log("welcome to Tic Tac Toe");

let audio_turn = new Audio("pick_sound.mp3");
let gameover = new Audio("perfect_over_sound.mp3");
let win = new Audio("won_sound.mp3");

let turn = "X";
let isgameover = false;





// FUNCTION TO CHANGE THE TURN :-
const changeTurn = () => {
    // if turn is X then return 0 otherwise return X
    return turn === "X"? "0":"X"
}





// FUNCTION TO CHECK FOR A WIN :-
// help for diagonals line animating taken from gpt
let wins = [
    [0,1,2, 0, 8, 0],
    [3,4,5, 0, 22, 0],
    [6,7,8, 0, 36, 0],
    [0,3,6, -12.8, 22, 90],
    [1,4,7, 0, 22, 90],
    [2,5,8, 12.9, 22, 90],
    [0,4,8, 0, 22, 47.3],
    [2,4,6, 0, 22, -47.3]
]
let win_once = false;
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');

    wins.forEach(e => {
        // CHECK IF ALL THREE BOXES ARE EQUAL AND NOT EMPTY
        if ((!win_once) && (boxtext[e[0]].innerText !== "") && (boxtext[e[0]].innerText === boxtext[e[1]].innerText)  &&  (boxtext[e[1]].innerText === boxtext[e[2]].innerText) ){
            document.getElementsByClassName("info")[0].innerText = boxtext[e[0]].innerText + " Wins The Game !";
            isgameover = true;
            win.play();

            // EK BAAR JEETA TO VAHI JEETA
            win_once = true;

            // PIKACHU 
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "250px";

            // LINE ANIMATION
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "100%"
        }
    })
}






// GRID LAYOUT :-
// 0  1  2
// 3  4  5
// 6  7  8 
// X wins if 012 are X, 345 are X and so on.....





// GAME LOGIC 
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {

    // SELECT THE BOXTEXT SPECIFIC TO THIS BOX
    let boxtext = element.querySelector(".boxtext");

    element.addEventListener("click", () => {
        if (boxtext.innerText === "") {
            boxtext.innerText = turn;

            // CHANGE THE TURN
            turn = changeTurn();
            audio_turn.play();
            checkWin(); 

            // UPDATE DISPLAY AND TIE CONDITION
            if (!isgameover) {

                // UPDATING DISPLAY FOR NEXT TURN
                info = document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

                // CHECK FOR TIE
                let allFilled = true;
                Array.from(document.getElementsByClassName("boxtext")).forEach(box => {
                    if (box.innerText === ""){
                        allFilled = false;
                    }
                })

                if (allFilled && !isgameover) {
                    document.getElementsByClassName("info")[0].innerText = "Its A Tie";
                    isgameover = true;
                    gameover.play();
                }
            }
        }
    });
});





// ADD ONCLICK LISTENER TO RESET BUTTON 
let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {

    // // Select all elements with class 'boxtext' globally
    // let boxtexts = document.getElementsByClassName('boxtext');

    // // Loop through each element and clear its text
    // Array.from(boxtexts).forEach(element => {
    //     element.innerText = "";
    // });

    // info = document.getElementsByClassName("info")[0].innerText = "Turn for X";
    // document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0vw";
    // isgameover = false;

    location.reload();
    
});




// WHY USE [0] EVEN WITH ONE ELEMENT? :-

// 1. Even if there’s only one element:
// getElementsByClassName Always Returns a Collection

// 2. This is just how getElementsByClassName works—it always gives back an 
// HTMLCollection (like an array), even if there’s only one element in it.
// So, you still need [0] to access the first element of the collection.
// No Direct Access

// 3. document.getElementsByClassName("info") doesn't return the element 
// itself—it returns a collection.
// JavaScript requires you to specify the exact element within the collection 
// by using [0].

// 4. USING QUERY SELECTOR INSTEAD
// Yes, absolutely! If you use querySelector instead of getElementsByClassName, 
// it will work perfectly without needing [0]. Here's why:
// querySelector directly selects the first matching element. So there's 
// no need to specify an index like [0].

// 5. WHY NOT USE [0] IN BOXES?
// If you use [0] here:
// let boxes = document.getElementsByClassName("box")[0];
// You would only get the first box element from the collection, 
// and you wouldn’t have access to the other boxes.
// This would prevent you from looping through all the boxes, 
// which is crucial for your Tic Tac Toe logic.





// UNDERSTAND THE WINNING LOGIC :-

// win = e or e or e...
// e = [0,1,2] or [3,4,5]...
// 
// now for the first iteration, e = [0,1,2] then  
// e[0] = 0     
// 
// then boxtext = .boxtext or .boxtext...
// now for this iteration its boxtext[0]
// 
// first iteration :-
// then boxtext[e[0]] = boxtext[0]
// then boxtext[e[1]] = boxtext[1]
// then boxtext[e[2]] = boxtext[2]

// second iterration :-
// e = [3,4,5]
// then boxtext[e[0]] = boxtext[3]
// then boxtext[e[1]] = boxtext[4]
// then boxtext[e[2]] = boxtext[5]
// 
// We did this to reduce the code length.



