document.querySelector(".control-buttons span").addEventListener("click",function(){
    document.querySelector('.control-buttons').remove();

});

let duration = 1000;
let contaners = document.querySelector('.contaner');
let blocks = Array.from(contaners.children);

let orderRange = [...Array(blocks.length).keys()];
orderRange = shuffle(orderRange);

blocks.forEach((block,index)=>{
    block.style.order = orderRange[index];

    block.addEventListener('click',function(){
        flipBlock(block);
    });
});

function flipBlock (selectedBlock){
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock=> flippedBlock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2){
        stopclicking();
        
        checkMatch(allFlippedBlocks[0],allFlippedBlocks[1]);

        setTimeout(()=>{
            contaners.classList.remove('stop-click');
        },duration);

        
    }
}
function checkMatch(first,second){

    if (first.dataset.tec === second.dataset.tec) {
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');

        first.classList.add('has-match');
        second.classList.add('has-match');
        document.getElementById('success').play(); 
    } else {
        setTimeout(()=>{
            first.classList.remove('is-flipped');
            second.classList.remove('is-flipped');
        },duration);
        
        document.getElementById('fail').play();
    }
}

function shuffle(array){
    let current = array.length,
        temp , 
        random;

    while (current>0){

        random = Math.floor(Math.random()*current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp ;


    }

    return array ;
}

function stopclicking(){
    contaners.classList.add('stop-click');
}