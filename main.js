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
let br= 0;
let checkarray= [];
let checknth= 0;

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

    for(y= 0; y<newarray.length; y++){
        board.innerHTML+= `<img class='` + newarray[y] + `' src='Images/blank.png'>`;
        br++;

        if(br== 5){
            board.innerHTML+= `<br>`;
            br= 0;
        };
    };

    console.log(newarray);
};

function change(e){
    if(e.target.className != board){
        e.target.src= musharray[e.target.className];
        checkarray.push(e.target.className);
            
        if(checkarray.length == require){
            check();
        };
    };
};

function check(){
    if(checknth < (require-1)){
        if(checkarray[checknth] != checkarray[checknth+1]){
            checknth= (require-1);
            reset();
        };

        checknth++;
        check();
    }else if(checknth== (require-1)){
        checkarray= [];
        checknth= 0;
    };
};

function reset(){
    let btn= document.createElement('button');
    btn.innerHTML= 'Incorrect';
    btn.onclick= function(){
        for(z= 0; z<checkarray.length; z++){
            for(zz= 0; zz<checkarray.length; zz++){
                document.getElementsByClassName(checkarray[z]).item(zz).src= `Images/blank.png`;
            };
        };
        
        checkarray= [];
        checknth= 0;
        document.body.removeChild(btn);
        board.addEventListener('click',change);
    };

    document.body.appendChild(btn);
    board.removeEventListener('click', change);
};