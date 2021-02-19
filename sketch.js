
   //creating the gamestate
   var gamestate = "rules";
   var GM = 55;
   var CGB = 5;
   //>rules,playLv1,end,bEnd
   var plr,goal;
   var canvas;
   var ebulletsGroup,hbl,heroBulletr;
   var healthbarsb,healthbars;
   var ehealthbarsb,ehealthbars;
   var e2healthbarsb,e2healthbars;
   var e1,e2;
   var mw1,mw2,mw3,mw4;
   var m1,m2,m3,m35,m4,m5;
   var s1,s2,s3,s4,s5,s6;
function setup() {
  createCanvas(1600,400);
  var goal = createSprite(360, 180, 30, 30);
  var canvas=createCanvas(800,800)
  
  //creating the Groups
  var ebulletsGroup = createGroup();
  var hbl = createGroup();
  var heroBulletr = createGroup();
  
  //creating the healthbars
  var healthbarsb = createSprite(300, 30, 150, 20);
  healthbarsb.shapeColor = "#FF0000";
  var healthbars = createSprite(300, 30, 150, 20);
  healthbars.shapeColor = "#2CE517";
  
  var ehealthbarsb = createSprite(30, 240, 40, 6);
  ehealthbarsb.shapeColor = "#FF0000";
  var ehealthbars = createSprite(30, 240, 40, 6);
  ehealthbars.shapeColor = "#2CE517";
  
  var e2healthbarsb = createSprite(280, 95, 40, 6);
  e2healthbarsb.shapeColor = "#FF0000";
  var e2healthbars = createSprite(280, 95, 40, 6);
  e2healthbars.shapeColor = "#2CE517";
  
  //creating the enemies
  var e1 = createSprite(30, 275, 20, 40);
  var e2 = createSprite(280, 125, 20, 40);
  //var e3 = createSsprite()
  
  //sprite for the player
  var plr = createSprite(25, 380, 20, 20);
  plr.shapeColor = "blue";
  
  
  //sprites for the maze
  //>wall
  var mw1 = createSprite(200, 400, 400, 15);
  var mw2 = createSprite(400, 200, 15, 400);
  var mw3 = createSprite(200, 0, 400, 15);
  var mw4 = createSprite(0, 200, 15, 400);
  //>maze
  var m1 = createSprite(100, 300, 400, 10);
  var m2 = createSprite(270, 220, 400, 10);
  var m3 = createSprite(250, 150, 120, 10);
  var m35 = createSprite(50, 150, 120, 10);
  var m4 = createSprite(270, 80, 400, 10);
  var m5 = createSprite(265, 190, 15, 70);
  //>subwalls
  var s1 = createSprite(365, 365, 60, 60);
  var s2 = createSprite(370, 60,10,10 );
  var s3 = createSprite(38, 220, 65, 10);
  var s4 = createSprite(308, 120, 10, 70);
  var s5 = createSprite(75, 42, 10, 70);
  var s6 = createSprite(210, 42, 10, 70);
  s6.visible = false;
  
  plr.velocityY=0;
}

function draw() {
  background(10,25,10)  
  background("black");
  text("MouseX : " + mouseX,50,50);
  text("MouseY : " + mouseY,50,70);
  if(gamestate==="rules"){
      background("black");
      fill("white");
      textSize(20);
      text("hi,", 50, 75);
      text("right arrow to move right", 70, 100);
      text(" left arrow to move left",80,130);
      text("up to jump",90,160);
      text("a to shoot left", 100, 190);
      text("s to shoot right", 110, 220);
      text("now press space to continue", 120, 250);
      if(keyDown("space")){
        gamestate="playLv1";
      }
    }
    if(gamestate==="playLv1"){
    background("white");
    //add Gravity
    plr.velocityY = plr.velocityY+0.15;
    //plr collide the walls
    plr.collide(e1);
    plr.collide(mw1);
    plr.collide(mw2);
    plr.collide(mw3);
    plr.collide(mw4);
    plr.collide(m1);
    plr.collide(m2);
    plr.collide(m3);
    plr.collide(m4);
    plr.collide(s1);
    plr.collide(m5);
    plr.collide(m35);
    plr.collide(e2);
    plr.collide(s3);
    plr.collide(s4);
    text("press 1 to know the rules", 10, 25);
    if(keyDown("1")){
      fill("red");
      gamestate="rules";
    }
    //movement
    //>right
    if (keyDown("right")) {
      plr.x = plr.x+3;
    }
    //>left
    if (keyDown("left")) {
      plr.x = plr.x-3;
    }
    //>jump
    if (keyDown("up")) {
        plr.y = plr.y-5;
    }
    
    //healthbars
    if (healthbars.width===0) {
      healthbars.destroy();
      healthbarsb.destroy();
      plr.destroy();
      plr.x = -33333;
      plr.y = -2234422;
      heroBulletr.setLifetimeEach(0);
      hbl.setLifetimeEach(0);
    }
    if (ebulletsGroup.overlap(plr)) {
      healthbars.width = healthbars.width - 1;
    }
    
    
    if (ehealthbars.width>0) {
      eBullets(e1);
      ebulletsGroup.setVelocityXEach(8);
    }
    if (hbl.overlap(e1)) {
       ehealthbars.width = ehealthbars.width - 1;
    }
    if (ehealthbars.width===0) {
    ehealthbars.destroy();
    s3.destroy();
    ehealthbarsb.destroy();
    e1.x = -999999999999;
    e1.y = -999999999999;
    }
    
    //decreaseing the healthbars on hit
    
    if (e2healthbars.width>0&&ehealthbars.width === 0) {
      eBullets(e2);
      ebulletsGroup.setVelocityXEach(-8);
    }
    if (hbl.overlap(e2)||(heroBulletr.overlap(e2))) {
       e2healthbars.width = e2healthbars.width - 1;
    }
    if (e2healthbars.width===0) {
    e2healthbars.destroy();
    e2healthbarsb.destroy();
    s5.destroy();
    e2.x = -999999999999;
    e2.y = -999999999999;
    }
    
    //decreaseing the healthbars on hit
    if (s6.visible===true) {
      s2.setAnimation("hammer_iron_1_copy_1");
      plr.collide(s6);
    }
    
    if (plr.isTouching(s2)) {
      s6.visible = true;
      s4.visible = false;
      s4.destroy();
      plr.x = 100;
      plr.y = 60;
    }
    
    
    textSize(20);
    drawSprites();
    //display the healthbars score
    if (healthbars.width > 0) {
      text(healthbars.width +"/150", 270, 37);
    }
    if (GM > 0) {
      textSize(15);
      fill("red");
      text("Gun bullet -" + CGB, 253, 18);
      text("/" + GM, 340, 18);
      if (keyWentDown("s")) {
        var bulletr = createSprite(plr.x, plr.y, 30, 5);
        bulletr.velocityX = 10;
        bulletr.lifetime = 50;
        CGB = CGB-1;
        heroBulletr.add(bulletr);
      }
      if (keyWentDown("a")) {
        var bulletl = createSprite(plr.x, plr.y, 30, 5);
        bulletl.velocityX = -10;
        bulletl.lifetime = 50;
        CGB = CGB-1;
        hbl.add(bulletl);
      }
    }
    if (CGB===0) {
      CGB = 5;
      GM = GM-5;
    }
    if (GM<=0&&e1.x===30&&e2.x===280) {
      gamestate = "bEnd";
    }
    if (plr.isTouching(goal)) {
      plr.destroy();
      gamestate = "end";
      
    }
    }
    if (gamestate == "end") {
      background("black");
      textSize(30);
      text("Booyah!", 100, 100);
      textSize(25);
      text("You have achieved rank 1", 50, 160);
      
    }
    if (gamestate==="bEnd") {
      background("green");
      fill("red");
      stroke("black");
      strokeWeight(5);
      textSize(30);
      text("You finished the gun bullets ", 20, 120);
      text("You lost", 193, 160);
    }
}

function eBullets(n) {
  if (World.frameCount%30===0) {
    var eBullet = createSprite(n.x, n.y, 30, 5);
    eBullet.velocityX = 8;
    eBullet.lifetime = 50;
    ebulletsGroup.add(eBullet);
  }
}