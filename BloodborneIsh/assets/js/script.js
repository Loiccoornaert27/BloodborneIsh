//let button = document.getElementsByClassName("choices");
/*SETUP COMBAT*/
//window.localStorage.setItem("monsterName","Rat");
/*DATAS*/
let data;
let data2;
let data3;
let data4;
/*Creation de l'inventaire*/
if(!window.localStorage.getItem('inventory')){
    window.localStorage.setItem('inventory',"");
}
/*************Espaces de textes***************/
let firstOption = document.getElementsByClassName("one");
let secondOption = document.getElementsByClassName("two");
let thirdOption = document.getElementsByClassName("three");
let fourthOption = document.getElementsByClassName("four");
/*User*/
let h3 = document.getElementsByClassName("values");
let life = document.getElementsByClassName("life");
let stam = document.getElementsByClassName("stam");
let time = document.getElementsByClassName("time");
let echos = document.getElementsByClassName("echos");
let heal = document.getElementsByClassName("heal");
let bullets = document.getElementsByClassName("bullets");
let type = document.getElementsByClassName("type");
/*Combats*/
let buttons = document.getElementsByTagName("button");
let monsterName = document.getElementsByClassName("monster");
let monsterFrame = document.getElementsByClassName("monsterFrame");
let monsterImg = document.getElementsByClassName("monsterImg");
/*********************************************/
let icons = document.getElementsByClassName("icon");
let main = document.getElementsByClassName("text");
/****************EQUIPEMENTS******************/
let weap = document.getElementsByTagName("figcaption");
let inventory = document.getElementsByClassName("inventory");
let weapons = document.getElementsByClassName("weaponImg");
let eachWeapons = window.localStorage.getItem("inventory").split('/');
//console.log(eachWeapons);
/***********Path des options******************/
let Goto=1;
let end=false;
//console.log(p);

/*Récupération du JSON*/
function readJsonFile(file, callback) {
    let textFile = new XMLHttpRequest();
    textFile.overrideMimeType("application/json");
    textFile.open("GET", file, true);
    textFile.onreadystatechange = function() {
        if (textFile.readyState === 4 && textFile.status == "200") {
            callback(textFile.responseText);
        }
    };
    textFile.send(null);
}

function option(num){
    readJsonFile("assets/txt/intro.json", function(text) {
    let data = JSON.parse(text);
    console.log(num.target.classList[0]);
    if(num.target.classList[0] == "one"){
        firstOption[0].innerHTML = data.story[data.story[Goto].NextId[0]].text;
        Goto=data.story[data.story[Goto].NextId[0]].NextId;
        main[0].innerHTML = data.story[Goto].text;
    }
    else if(num.target.classList[0] == "two"){
        secondOption[0].innerHTML =  data.story[data.story[Goto].NextId[1]].text;
        Goto=data.story[data.story[Goto].NextId[1]].NextId;
        main[0].innerHTML = data.story[Goto].text;
    }
    else if(num.target.classList[0] == "three"){
        thirdOption[0].innerHTML =  data.story[data.story[Goto].NextId[2]].text;
        Goto=data.story[data.story[Goto].NextId[2]].NextId;
        main[0].innerHTML = data.story[Goto].text;
    }
    });
}
/*Changer d'arme*/
function changeWeapon(){
    for(let i = 0;i<weapons.length;i++){
        weapons[i].classList.remove("active");
    }
    this.classList.add("active");
}
function addWeapon(){
    console.log("ok");
    let weaponName="";
    let weaponDamage="";
    inventory[0].innerHTML+=`<figure class="weapon">
                                <img class="weaponImg" src="./assets/img/weapons/threaded_cane.jpg"></img>
                                <figcaption></figcaption>
                            </figure>"`;                
}
/*****************COMBAT*FUNCTIONS******************/
/*Récupère les infos de combat du JSON*/
function atk(){
    let splited = JSON.stringify(data4);
    splited = splited.split(",");
    //console.log("Les armes:"+splited[1]);
    /*variables combat*/
    let actualHealth=0;
    let playerDamage=5;
    let monsterDamage=0;
    let monsterHealth=0;
    /*Chercher le nom de l'arme equipée*/
    for(let i = 0;i<weapons.length;i++){
        if(weapons[i].classList.contains("active")){
            let found = weap[i+5].textContent;
            //console.log(found);
            for(let j=0;j<splited.length;j++){
                //console.log(splited[j].includes(found));
                if(splited[j].includes(found)){
                    splited = splited[j+1].split(":");
                    playerDamage = splited[1];
                    console.log(playerDamage);
                }
            }
        }
    }
    actualHealth = window.localStorage.getItem("life");
    monsterHealth = window.localStorage.getItem("monsterHealth");
    monsterDamage = data3.monstres.Rat.atk;
    //Si le monstre a + de vie que le joueur a de dégats:
    console.log("vie du monstre:"+typeof monsterHealth);
    console.log("Atk du joueur:"+typeof playerDamage);
    if(monsterHealth>playerDamage){
        //Calcul les dégats du joueur
        monsterHealth = monsterHealth-playerDamage;
        window.localStorage.setItem("monsterHealth",monsterHealth);
        monsterName[0].innerHTML = window.localStorage.getItem("monsterName")+" vie: "+window.localStorage.getItem("monsterHealth");
        //Si la vie du joueur est supérieur aux dégats du monstre
        if(actualHealth>monsterDamage){
            //Calcul les dégats du monstre
            actualHealth = actualHealth-monsterDamage;
            window.localStorage.setItem("life",actualHealth);
            life[0].setAttribute("value",window.localStorage.getItem("life"));
            h3[0].innerHTML = window.localStorage.getItem("life")+"/"+(data2.player.vie).split('/')[1];
        }
        else{
            //Définit la vie du joueur a zéro si il meurt
            window.localStorage.setItem("life",0);
            life[0].setAttribute("value",0);
            h3[0].innerHTML = "0"+"/"+(data2.player.vie).split('/')[1];
        }
    }
    else{
        /*Supprimer le monstre*/
        monsterName[0].innerHTML = window.localStorage.getItem("monsterName")+" vie: 0";
        window.localStorage.setItem("monsterName","");
        monsterFrame[0].classList.add("empty");
        console.log("lédédax")
    }
}
//console.log(window.localStorage.getItem("fioles"))
function useHeal(){
    let fioles = window.localStorage.getItem("fioles");
    let actualHealth = window.localStorage.getItem("life");
    if(fioles!=0){
        /*Si il manque 50PV ou moins au joueur, lui rend tous ses PV*/
        if(window.localStorage.getItem("life")>=((data2.player.vie).split('/')[1])-50){
            window.localStorage.setItem("life",((data2.player.vie).split('/')[1]));
        }
        /*Sinon, le soigne de 50*/
        else{
            actualHealth = parseInt(actualHealth);
            window.localStorage.setItem("life",(actualHealth+50));
            //console.log(actualHealth);
        }
        life[0].setAttribute("value",window.localStorage.getItem("life"));
        h3[0].innerHTML = window.localStorage.getItem("life")+"/"+(data2.player.vie).split('/')[1];
    }
}

function missed(){
    
}
/**************************************************/
/*Lecture du JSON*/
    /*Initialisation de l'intro*/
readJsonFile("assets/txt/intro.json", function(text) {
    data = JSON.parse(text);

    console.log(data);
    
    /*Initialisation de l'intro*/
    main[0].innerHTML = data.story[Goto].text;
    if(data.story[Goto].NextId[0]){
        firstOption[0].classList.remove("empty");
        firstOption[0].innerHTML = data.story[data.story[Goto].NextId[0]].text;
    }
    else{
        firstOption[0].classList.add("empty");
    }
    if(data.story[Goto].NextId[1]){
        secondOption[0].classList.remove("empty");
        secondOption[0].innerHTML = data.story[data.story[Goto].NextId[1]].text;
    }
    else{
        secondOption[0].classList.add("empty");
    }
    if(data.story[Goto].NextId[2]){
        thirdOption[0].classList.remove("empty");
        thirdOption[0].innerHTML = data.story[data.story[Goto].NextId[2]].text;
    }
    else{
        thirdOption[0].classList.add("empty");
    }
    if(data.story[Goto].NextId[3]){
        fourthOption[0].classList.remove("empty");
        fourthOption[0].innerHTML = data.story[data.story[Goto].NextId[3]].text;
    }
    else{
        fourthOption[0].classList.add("empty");
    }
    /*Initialisation du User*/
readJsonFile("assets/txt/player.json", function(text2) {
    data2 = JSON.parse(text2);
    console.log(data2);
        
    /*Vie et Mana*/
    h3[0].innerHTML = data2.player.vie;
    h3[1].innerHTML = data2.player.endu;
    life[0].setAttribute("value",(data2.player.vie).split('/')[0]);
    stam[0].setAttribute("value",(data2.player.endu).split('/')[0]);
    life[0].setAttribute("max",(data2.player.vie).split('/')[1]);
    stam[0].setAttribute("max",(data2.player.endu).split('/')[1]);
    if(!window.localStorage.getItem("life")){
        window.localStorage.setItem("life",(data2.player.vie).split('/')[0]);
    }
    if(!window.localStorage.getItem("stam")){
        window.localStorage.setItem("stam",(data2.player.endu).split('/')[0]);
    }
    if(!window.localStorage.getItem("time")){
        window.localStorage.setItem("time",data2.player.time);
    }
    if(!window.localStorage.getItem("echos")){
        window.localStorage.setItem("echos",data2.player.echos);
    }
    if(!window.localStorage.getItem("fioles")){
        window.localStorage.setItem("fioles",data2.player.fioles);
    }
    if(!window.localStorage.getItem("balles")){
        window.localStorage.setItem("balles",data2.player.balles);
    }
    if(!window.localStorage.getItem("weapon")){
        window.localStorage.setItem("weapon","hunter_axe");
    }
    
    if(data2.player.damageType == 1){
        type[0].innerHTML = "Tranchant";
        icons[4].setAttribute("src","./assets/img/Tranch.png");
    }
    else if(data2.player.damageType == 2){
        type[0].innerHTML = "Contandant";
        icons[4].setAttribute("src","./assets/img/Cont.png");
    }
    else{
        type[0].innerHTML = "Zéro";
        icons[4].setAttribute("src","./assets/img/Ammo.png");
    }
});
    readJsonFile("assets/txt/monstre.json", function(text3) {
        data3 = JSON.parse(text3);
    });
    readJsonFile("assets/txt/weapons.json", function(text4) {
        data4 = JSON.parse(text4);
    });
    //console.log(data2);
    /*Autres*/
    time[0].innerHTML ="temps: "+window.localStorage.getItem("time");
    echos[0].innerHTML= "echos: "+window.localStorage.getItem("echos");
    heal[0].innerHTML= "fioles: "+window.localStorage.getItem("fioles");
    bullets[0].innerHTML= "balles: "+window.localStorage.getItem("balles");
    if(window.localStorage.getItem("weapon")){
        
    }
    //Si le joueur est en combat
    if(window.localStorage.getItem("monsterName")){
        let monster = 0;
        monsterFrame[0].classList.remove("empty");
        monsterName[0].innerHTML = window.localStorage.getItem("monsterName")+" vie: "+window.localStorage.getItem("monsterHealth");
        monsterImg[0].setAttribute("src","./assets/img/monstres/"+window.localStorage.getItem("monsterName")+".png");
    }
    else{
        monsterFrame[0].classList.add("empty");
    }
});
/*Au chargement de la page*/
document.addEventListener('DOMContentLoaded', function()
{
    /*EventsListeners Options*/
    firstOption[0].addEventListener("click", option);
    firstOption.value = 1;
    secondOption[0].addEventListener("click", option);
    secondOption.value = 2;
    thirdOption[0].addEventListener("click", option);
    thirdOption.value = 3;
    /*EventListeners Buttons*/
    buttons[0].addEventListener("click", atk);
    buttons[1].addEventListener("click", useHeal);
    buttons[2].addEventListener("click", missed);
    /*Equipement*/
    if(window.localStorage.getItem('inventory')){
        for(let j = 0;j<eachWeapons.length;j++){
            //console.log(eachWeapons[j]);
            let weaponName=window.localStorage.getItem("inventory").split("/");
            weaponName[j]=weaponName[j].split("-");
            weaponName = weaponName[j][0];
            let weaponDamage="";
            inventory[0].innerHTML+=`<figure class="weapon">
                                        <img class="weaponImg" src="./assets/img/weapons/${weaponName}.jpg"></img>
                                        <figcaption>${weaponName}</figcaption>
                                    </figure>"`;
        };
    };
    
    for(let i = 0;i<weapons.length;i++){
        weapons[i].addEventListener("click", changeWeapon);
    };
});