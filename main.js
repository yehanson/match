const dpsel= document.querySelector('.dp');
const rmsel= document.querySelector('.rm');
const subbtn= document.querySelector('.subbtn');
const board= document.querySelector('.board');
subbtn.addEventListener('click',size);
board.addEventListener('click',change);
const musharray=[
    `Images/0.png`,
    `Images/1.png`,
    `Images/2.png`,
    `Images/3.png`,
    `Images/4.png`
];
let array= [];
let newarray= [];
let pair;
let require;
let order= 1;
let br= 0;
let first;
let second;
let third;

function size(){
    pair= dpsel.value;
    require= rmsel.value;
    board.innerHTML= '';
    newarray= [];
    print();
};

function print(){
    for(i= 0; i<pair; i++){
        for(r= 0; r<require; r++){
            array.push(i);
        };
    };

    for(x= 0; x<(pair*require); x++){
        let randomize= (Math.floor((Math.random() * array.length)));
        newarray.push(JSON.parse(array.splice(randomize, 1)));
    };

    console.log(newarray);

    for(y= 0; y<newarray.length; y++){
        board.innerHTML+= `<img class='` + newarray[y] + `' src='Images/blank.png'>`;
        br++;

        if(br== 5){
            board.innerHTML+= `<br>`;
            br= 0;
        };
    };
};

function change(e){
    if(e.target.className != board){
        switch(order){
            case 1:
                e.target.src= musharray[e.target.className];
                first= e.target.className;
                order= 2;
                break;
            case 2:
                e.target.src= musharray[e.target.className];
                second= e.target.className;
                if(require== 2){
                    order= 1;
                    check();
                }else if(require == 3){
                    order= 3;
                };
                break;
            case 3:
                e.target.src= musharray[e.target.className];
                third= e.target.className;
                order= 1;
                check();
        };
    };
};

function check(){
    if(require== 2){
        if(first != second){
            reset();
        };
    }else if(require== 3){
        if(first != second || second != third){
            reset();
        };
    };
};

function reset(){
    let btn= document.createElement('button');
    btn.innerHTML= 'Incorrect';
    btn.onclick= function(){
        for(f= 0; f<document.getElementsByClassName(first).length; f++){
            document.getElementsByClassName(first).item(f).src= 'Images/blank.png';
        };

        for(s= 0; s<document.getElementsByClassName(second).length; s++){
            document.getElementsByClassName(second).item(s).src= 'Images/blank.png';
        };

        for(t= 0; t<document.getElementsByClassName(third).length; t++){
            document.getElementsByClassName(third).item(t).src= 'Images/blank.png';
        };

        document.body.removeChild(btn);
        board.addEventListener('click',change);
    };

    document.body.appendChild(btn);
    board.removeEventListener('click', change);
};