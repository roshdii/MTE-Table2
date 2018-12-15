// JavaScript source code


/// Basic functions 
window.onload = function () {
    if ((/Mobi/.test(navigator.userAgent))) {

        document.getElementById('Base').style.color = 'red';
        document.getElementById('Base').style.textAlign = 'center';
        document.getElementById('Base').style.fontSize = '40px';

        var x = 0;
        er = setInterval(
      function () {
          'use strict';
          document.getElementById('Base').innerHTML = "<b> </br> </br> </br> </br> </br>  Loading </br>  </br>  " + x + " </br> </br> </br> You Use Smart Phone , This Version of App/site have limits . </br> </br> Please use Desktop or Laptop   !!  </b> " + " </br> </br> <button style='width:200px;height:100px;font-size:30px; ' onclick='clearInterval(er); BASE();' > Continue </button>";
          // console.log(x);
          x++;

          if (x == 100) { clearInterval(er); BASE();}
      }, 200);
    }
   else 
        BASE(); //the START //    
}

function BASE(){
    document.getElementById('Base').innerHTML = "";
    
    document.getElementById('music').style.visibility = 'visible';
    document.getElementById('saveInfo').style.visibility = 'visible';
    document.getElementById('help').style.visibility = 'visible';
    document.getElementById('input').style.visibility = 'visible';
    document.getElementById('lang').style.visibility = 'visible';

    //console.log("num of max Terms = " + maxINPUTTemrs);

    termDraw(maxINPUTTemrs); //have the default N semister 
    coreDraw();    //have the base N subjects element 
    termSUB(0);  //put subjects in init terms 
    infoDesign();  //design information zone 
    
    EVENTS();
} 

function EVENTS(){
 
    //1-change languge 
    document.getElementById('lang').onclick = function () { if(lan=='en') lan='ar'; else lan='en'; LanSelect(); };
    //2-help 
    document.getElementById('help').onclick = helping;
    //3-save
    document.getElementById('saveInfo').onclick = function () { Saving(); };
    //4-upload 
    document.getElementById('input').onchange = Uploading; 
    //5- showing root 
    for (var i = 0; i < Buttons.length ; i++) {
        if (!(/Mobi/.test(navigator.userAgent))) {
            Buttons[i].onmouseover = showRoot; //show the roots of the course 

            Buttons[i].ondragend = DragX; //edit course position 

            Buttons[i].onclick = showInfo; //show information of course 

            Buttons[i].oncontextmenu = editGPA; //click right to edit degree and GPA 
        }
        
        else if ((/Mobi/.test(navigator.userAgent))) {
            Buttons[i].addEventListener('click', showRoot);
            //  Buttons[i].addEventListener('touchstart', TOUCH);
            //  Buttons[i].addEventListener('touchend', DragX);
            Buttons[i].addEventListener('contextmenu', editGPA);
        }
    }


    document.getElementById('Back').onmousedown = outFocus;    //Out focus information zone 

    for (var d = 0 ; d < infoButtons.length; d++) infoButtons[d].onclick = goDetails; //details of info (books,videos,...)

    //add semsister double click on base canvas 
    document.getElementById('Base').ondblclick = newTerm;
    document.getElementById('Base').onmousemove = newTermPopUp;
    document.getElementById('Base').onmouseenter = cleanShow; 
    document.getElementById('Base').style.pointerEvents = 'fill';
    //if ((/Mobi/.test(navigator.userAgent))) {document.getElementById('Base').onclick = newTerm; }

    //delete semisters double click on term canvas 
    for (var t = 0 ; t < sss.length ; t++) {
        sss[t].ondblclick = newTerm;
        sss[t].onmousemove = newTermPopUp; 
       // if ((/Mobi/.test(navigator.userAgent))) { sss[t].oncontextmenu = newTerm;}

        sss[t].onmouseenter = cleanShow;
    }

    
    totalGPA();
    LanSelect();
}
//..............................................


/////////1- upload / save funcs ////////////////
function Uploading(){
   
    RESULT= 0;

    if (this.files && this.files[0]) {
        var myFile = this.files[0];
        var reader = new FileReader();

        reader.readAsText(myFile);

        reader.addEventListener('load', function (e) {
            //catch all the file data 
            RESULT = e.target.result ;
            //console.log(RESULT);
       //spilt data (pre-defined with comma ) into array x 
            var x = RESULT.split(","); 
            //console.log(x);

            var s = 0;
            for (var i = 1 ; i < x.length - 1 ; i += 3) {
                s++;
                // s is the counter of subjects .. 1 2 3 .. , intially given by the developer as input of subjec data set .. 
                // saved file contain this counts , if one missed its counter it will not shown ,,, or may have problem in future function ... the subj pose wont change 
                // starting from S = 1 ... 'cuz the first element is the number of semster saved infile .
                // increaing counter ... with increasing the input data table X +3 
                //As x[i] == counter , x[i+1] = semster no. , x[i+2= = degree taked 
                if (x[i] == s) {

                    eval("SUB" + (s)).sem = x[i + 1];
                    eval("SUB" + (s)).degree = x[i + 2];
                  //  console.log(eval("SUB" + s).fullname + "  " + eval("SUB" + (s)).sem + "  " + eval("SUB" + (s)).degree);
                }
                else {
                    { alert("error loading file !!"); return 0; }

                }
            }

            NTerms = Number(x[0]);
            //console.log(NTerms);
            document.getElementById('Base').innerHTML = "";
            termDraw(NTerms);
            coreDraw();

            //termSUB(0);
            allTerms = new Array(NTerms); //declear new array .. 
            // for more error-less .. clear all data inside it . 
            for (var i = 0 ; i < NTerms ; i++) {
                allTerms[i] = [];
            }
            //filling allTerms with Subjects from the data set allSubs that have all subjx with updated 
            for (var s = 1 ; s <= allSUBs.length ; s++) {
                var i = parseInt(eval("SUB" + s).sem);//subject new term
               // console.log("sem" + i);
                allTerms[i - 1].push(eval("SUB" + s));

                //push id and sem 
                PushItems(("Sub" + s), i);
            }
            EVENTS();
            //totalGPA();

                       

        });

    }
    else alert("File loading error !");   
}
function Saving() {
    //console.log("SAVING");
    var dep = "MTE";
    dataInfo = [];
    dataInfo.push(allTerms.length);
     // console.log(eval("SUB" + (33)).root.toString().replace(',',';'));
    for (var s = 0 ; s < allSUBs.length ; s++)
    {
        var Sname = eval("SUB" + (s + 1)).name;
        var SSem = eval("SUB" + (s + 1)).sem ; 
        var Sdegree= eval("SUB" + (s + 1)).degree ; 
        
        //save degrees 
        dataInfo.push(s+1); //no.of.subj
        dataInfo.push(SSem);//sem.of.subj
        dataInfo.push(Sdegree);//deg.of.subj
        
        //save courses info 
        // dataInfo.push( eval("SUB" + (s + 1)).name);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).root.toString().replace(',',';'));//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).sem);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).degree);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).hours);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).type);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).fullname);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).Arname);//sem.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).description);//deg.of.subj
        // dataInfo.push( eval("SUB" + (s + 1)).Ardescription);//deg.of.subj
        // dataInfo.push('\n');
    }
   // console.log(dataInfo);
    var filename = prompt("Save file name ? (example:Eslam Roshdi)", "ROSHDII MTE");
    if (filename != false && filename != null) {
        var file = new File([dataInfo], filename, { type: "text/plain;charset=utf-8" });
        saveAs(file);
    }
    else alert("Can't Save for No Name ");
}


/////////2- language selection and help text edit////////////////////
function LanSelect(){
    
    if (lan == 'en') {
        document.getElementById('lang').innerHTML = "عربي";
        globalName = "fullname";
        showNames();
        
        document.getElementById('infoHelp').style.textAlign = 'left';
        document.getElementById('infoHelp').style.color = 'white';
        document.getElementById('infoHelp').innerHTML =
           "<pre> " +
          " <b> Help you use this App : -> It's prefered to use with Desktop or Labtop <- </b> " +
          " <br> 1- <b> Show Root</b> : just use mouse to over the course (Mobile:just touch on it)" +
          " <br> 2- <b> Show Info</b> : one left Click on any course you show more info about it (Mobile:touch again when it became Red) " +
          " <br> 3- <b> Add Semester</b> : double click in area between any two Semesters (Mobile: touch the area between any two Semesters)" +
          " <br> 4- <b> Remove Seme</b> : double click on the Semester (Mobile:long touch on the semester )" +
          " <br> 5- <b> Move Course</b> : easily drag and drop in the area of semester" +
          " <br> 6- <b> Calculate GPA </b> : one right click on any subject so you can input the degree of 100 and automaticly calc. GPA " +
          " <br> 7- <b> Completed Courses </b> : when you pass in subject(degree>60) subject name has <u>Underline</u> and you can edit many times" +
          " <br> 8- <b> Semster GPA </b> : see the total courses hours in each semester and GPA of passed courses in the bottom of each one" +
          " <br> 9- <b> Total GPA </b> : see total GPA , courses , hours , points you had taked in the top bar " +
          " <br> 10-<b> Save Formation </b> : save this formation and GPAs in your device(As Text) to you can use it later " +
          " <br> 11-<b> Upload Formation </b> : upload saved formations and GPAs from your device so you can edit it agian " +
          " <br> 12-<b> Play Music </b> : you can listen to music while doing this" +
          " <br> 13-<b> Language </b> : change Language by clicking on language button above " +
          " <br> 14-<b> Help </b> : click again to help button so you can close it" +
          " <br> 15-<b> This App/Site DO NOT COLLECT ANY OF YOUR INFORMATION <b>  Thanks for reading.   ENDED : 21Sep2017   <b> By Eslam Roshdii </b> " + "</pre> ";
        
    }
    else if (lan == 'ar') {
        document.getElementById('lang').innerHTML = "enslish";
        globalName = "Arname";
        showNames();
        
        document.getElementById('infoHelp').style.textAlign = 'right';
        document.getElementById('infoHelp').style.color = 'smokewhite';
        document.getElementById('infoHelp').innerHTML =
           "<pre> " +
          " <b>   : >> كيف تستخدم هذا التطبيق >> يفضل استخدامه عن طريق متصفح اللابتوب او الديسكتوب   </b> " +
          " <br> متطلبات الماده : بمجرد الوقوف علي الماده (للهاتف :المس الماده فقط--" +
          " <br>  تفاصيل الماده : بمجرد الضغط علي الماده تظهر تفاصيل اكتر (للهاتف :المس الماده مره اخري -- " +
          " <br>  اضافه ترم : بمجرد الضغط مرتين علي المساحه بين اي ترمين يتم اضافته بينهم (للهاتف :المس  المساحه بين اى ترمين-- " +
          " <br>  حذف ترم : بمجرد الضغط مرتين علي الترم (للهاتف : لمس مطولا علي الترم-- " +
          " <br>   حساب المعدل التراكمي : ضغط الماوس الايمن فيمكن وضع الدرجه وتعديلها (للهاتف :اضغط مطولا علي الماده -- " +
          " <br>  المواد المنتهيه : كل ماده انهيتها (درجتها>60) يوضع تحتها خط ، ويمكن تعديلها --" +
          " <br>  اسفل كل ترم ستري عدد الساعات الكلي للمواد والمعدل التراكمي  للمواد المدخله في الترم --" +
          " <br>  يمكن معرفه عدد الساعات الكليه المكتسبه حتي الان والتقدير العام وعدد المواد المنتهيه في اعلي  الشاشه -- " +
          " <br>   حفظ التشكيل : يمكن حفظ هذا التشكيل للمواد والدرجات عن طريق ضغط زر (حفظ) اعلي الشاشه واختيار الاسم-- " +
          " <br>  تحميل التشكيل : يمكنك تحميل التشكيلات ودرجات المواد المحفظه مسبقا عن طريق زر upload -- " +
          " <br>  استمع الي الموسيقي : بالضغط علي زر تشغيل الموسيقي اعلي الشاشه  -- " +
          " <br>  تغير اللغه : يمكن تغير اللغه بالضغط علي زر اللغه اعلي الشاشه -- " +
          " <br>   اخيرا اضغط مره اخري علي زر المساعده لغلق شاشه المساعده  -- " +
          " <br>  <b> التطبيق لا يستخدم اي معلومات  مدخله من المستخدم -- <b> " +
          " <br>   <b> By Eslam Roshdii </b>  21Sep 2017                 شكراَ للقراءه ، اتمني لكم التوفيق        " + "</pre> ";
       
    }
}


/////////3- help showing and edit ////////////////
function helping(){   
    LanSelect();
    // inverting the current state of help 
    if (document.getElementById('infoHelp').style.visibility == 'visible')
     {
        document.getElementById('infoHelp').style.visibility = 'hidden';
        document.getElementById('infoHelp').style.opacity = 0;
        document.getElementById('infoHelp').style.height = "0px"; // parseInt(document.getElementById('Base').style.height) + parseInt(document.getElementById('Base').style.top) + 30 + "px";
        document.getElementById('copyright').style.top = parseInt(document.getElementById('Base').style.height) + parseInt(document.getElementById('Base').style.top) + 50 + "px";
       // location.href = '#HEADER';
    }
    else {
        document.getElementById('infoHelp').style.visibility = 'visible';
        document.getElementById('infoHelp').style.height = 700 + 'px'; 
        document.getElementById('infoHelp').style.top = parseInt(document.getElementById('Base').style.height) + parseInt(document.getElementById('Base').style.top) + 30 + "px";
        document.getElementById('copyright').style.top = parseInt(document.getElementById('Base').style.height) + parseInt(document.getElementById('Base').style.top) + parseInt(document.getElementById('infoHelp').style.height) +  50 + "px";

        location.href = '#infoHelp';
        //fade in 
        var o = 0; 
        er = setInterval(
            function () {
                'use strict';
                //console.log(o / 100);
                document.getElementById('infoHelp').style.opacity = o / 100;
                o++;
                if (o == maxOPacity) clearInterval(er);
            }, 5);
    }
}
//..............................................


/////////4- GPA calculation///////////////////////
// this func to calc points to given degree 
function degree2Points(deg){
    
    if (deg >= 93 && deg <= 100) return 4;
    else if (deg >= 89 && deg <= 92) return 3.7;
    else if (deg >= 84 && deg <= 88) return 3.3;
    else if (deg >= 80 && deg <= 83) return 3;
    else if (deg >= 76 && deg <= 79) return 2.7;
    else if (deg >= 73 && deg <= 75) return 2.3;
    else if (deg >= 70 && deg <= 72) return 2;
    else if (deg >= 67 && deg <= 69) return 1.7;
    else if (deg >= 64 && deg <= 66) return 1.3;
    else if (deg >= 60 && deg <= 63) return 1;
    else if (deg < 60) return 0;
    else return 0; 
}
//this func calculate semster GPA and total GPA for every subject 
function totalGPA() {
    // pass through every term .. for each subj. (calc points , hour , hour*points) , cal total hours , calc termsGPA = sum(hour*points)/totalhours   
    var TotalGPA = 0.00, totalPoints = 0, totalHours = 0, totalCourses = 0, totalearnedHour = 0;
    var totaldegress = 0 , degree_perc  = 0 ,GPA =0 ; 
    for(var i = 0 ; i <allTerms.length;i++) //pass thru each semister 
    {
        document.getElementById("infoSem" + (i + 1)).innerHTML = ""; //clear lower info for sem
        var termPoints = 0, degree = 0 , pnt = 0 , termHours = 0 , hour =0 ,termGPA = 0.00 ;
        for(var s = 0 ; s <allTerms[i].length;s++)
        {
           // degree of sub s at term i 
            degree = allTerms[i][s].degree;
            pnt = degree2Points(degree);
            termPoints += pnt;
            // hours of sub s at term i 
            hour = allTerms[i][s].hours;
            termHours += hour;
        
            termGPA += (hour * pnt);
            
            if (pnt > 0) {
                totalCourses++; totalearnedHour += hour; totaldegress += Number(degree)*hour ;          
                 //console.log( allTerms[i][s].fullname + "totH=" + hour + "pnt" + pnt);
                // console.log(TotalGPA/totalearnedHour)
            }
        }
        // //Total GPA calc ... = sum(termGPA)/hours
        totalHours += termHours;
        totalPoints += termPoints;
        TotalGPA += termGPA;

        termGPA = termGPA / termHours; if (isNaN(termGPA)) termGPA = 0;
        degree_perc = totaldegress / totalearnedHour ; if (totalearnedHour == 0 ) degree_perc = 0 ; 
        GPA = TotalGPA / totalearnedHour ; if (totalearnedHour == 0) GPA = 0 ;
        
        //graphic show GPA 
        document.getElementById("infoSem" + (i + 1)).innerHTML = "GPA : " + termGPA.toFixed(2) + "</br> Hours : " + termHours;
        if (termHours > maxHours) { document.getElementById("infoSem" + (i + 1)).style.borderColor = "yellow"; /*alert("Semister" + (i + 1) + " hours = " + termHours + " maxHours :" + maxHours);*/} else document.getElementById("infoSem" + (i + 1)).style.borderColor = "white";
        document.getElementById('GPA').innerHTML = "Total GPA : " + GPA.toFixed(2)+ "/4     ,       Completed Hours : " + totalearnedHour + " / " + totalHours + "       ,       Total Points : " + totalPoints.toFixed(2) + "     ,    Percentage Degree :  " + degree_perc.toFixed(2)+" %      ,       Completed Coureses : " + totalCourses + " / " + allSUBs.length;
                   
        
    }

    showNames();
}
//this func used to input values of degrees by user ans pass to subject object degree properties 
function editGPA(){
    //alert("GPA ZONE " + eval(this.id.replace("Sub", "SUB")).description);
    //prompt("STRING",passed_field,intial value) 
    var degree = prompt(eval(this.id.replace("Sub", "SUB"))[globalName] + " Degree = (example: 75 ) from 100 ", eval(this.id.replace("Sub", "SUB")).degree);
    //console.log(degree);
    eval(this.id.replace("Sub", "SUB")).degree = degree;
    totalGPA(); //every assign ... re calc GPA 
    return false; 
}
//..............................................


/////////5- Add/Remove Semsters //////////////////
function newTermPopUp(event) {
    var mouseX, mouseY;

    var rect = document.getElementById('BODY').getBoundingClientRect(); //to decleare where the canvas to take pos from
    var scrollX = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
    mouseX = event.clientX + scrollX  ;
    var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    mouseY = event.clientY + scrollY ;


    //a mobile
    if ((/Mobi/.test(navigator.userAgent))) {
        function X(event) {
            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                mouseX = touch.pageX + scrollX;
                mouseY = touch.pageY + scrollY;// document.getElementById('BODY').style.zoom;
                console.log(scrollX);
                console.log(screenX);
            }
        };

    }


    mouseX /= document.getElementById('BODY').style.zoom;
    mouseY /= document.getElementById('BODY').style.zoom;


   // the same as newTerm but change here we change termPopup (inbetween) canvas 
    var iSide = 1;
    var sidediv = 0;
    var d = 1;
    var CONFIRMATION;

    if (this.id == "Base") { state = 1; } else { state = -1; /*console.log(i = this.id.replace("Sem", ""));*/ }

    for (var i = 1 ; i <= NTerms; i++) {

        if (state == -1) { //delete term
            d = 0; iSide = 0; sidediv = TermWidths;

        }
        else if (state == 1) {//add term
            d = 1;
            if (i < NTerms) { iSide = 1; sidediv = 0; }
            else { iSide = 0; sidediv = TermWidths + Hoffset * 2; }
        }

        if (parseInt(mouseX) >= parseInt(document.getElementById("Sem" + i).style.left) + (d) * TermWidths && parseInt(mouseX) <= parseInt(document.getElementById("Sem" + (i + iSide)).style.left) + sidediv) {
            // console.log("TERM>" + i);

            //draw rect area 
            document.getElementById('TermPopUp').style.borderColor = TermPopUp_color ; 
            document.getElementById('TermPopUp').style.visibility = 'visible';
            document.getElementById('TermPopUp').style.top = 10 + parseInt(document.getElementById('Base').style.top) + parseInt(document.getElementById('Sem1').style.top) + 'px';
            document.getElementById('TermPopUp').style.left = 10 + parseInt(document.getElementById('Base').style.left) + parseInt(document.getElementById("Sem" + i).style.left) + (d) * TermWidths + 'px';
            document.getElementById('TermPopUp').style.width = (parseInt(document.getElementById("Sem" + (i + iSide)).style.left) + sidediv) - (parseInt(document.getElementById("Sem" + i).style.left) + (d) * TermWidths) + 'px';
            document.getElementById('TermPopUp').style.height = 1000 + 'px';
        }
    }
}
function newTerm (event){
        var mouseX, mouseY;
        
            var rect = document.getElementById('BODY').getBoundingClientRect(); //to decleare where the canvas to take pos from
            var scrollX = Math.max(document.body.scrollLeft,document.documentElement.scrollLeft); 
            mouseX = event.clientX + scrollX;
            var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            mouseY = event.clientY + scrollY;
        
   
        //a mobile
            if ((/Mobi/.test(navigator.userAgent))) 
            { function X (event) { 
                if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                mouseX = touch.pageX + scrollX;
                mouseY = touch.pageY + scrollY;// document.getElementById('BODY').style.zoom;
              }
            };
                
            }
 
         //re scalling 
          mouseX /= document.getElementById('BODY').style.zoom;
          mouseY /= document.getElementById('BODY').style.zoom;

          
          
          var iSide = 1;
          var sidediv = 0; 
          var d = 1; //local var for delete = 0 , add = 1 
          var CONFIRMATION;
         
          if (this.id == "Base") { state = 1; } // add  
          else { state = -1; /*console.log(i = this.id.replace("Sem", ""));*/ }

          for (var i = 1 ; i <= NTerms; i++) {

              if (state == -1) { //delete term
                  d = 0; iSide = 0; sidediv = TermWidths;
                  
              }
              else if (state == 1) {//add term
                  d = 1;
                  if (i < NTerms) { iSide = 1; sidediv = 0;}
                  else { iSide = 0; sidediv = TermWidths + Hoffset *2 ; }
              }
             
              //REMOVE must Localize mouse in between Semster canvas [left::left+width] ,, 
              //ADD must localize after semster and before the next semster [currentleft+width :: nextleft]
              if (parseInt(mouseX) >= parseInt(document.getElementById("Sem" + i).style.left) + (d) * TermWidths && parseInt(mouseX) <= parseInt(document.getElementById("Sem" + (i + iSide)).style.left) + sidediv)
              {
                 // console.log("TERM>" + i);

                 
                  if (state == -1) {
                      CONFIRMATION = "You want to delete  " + i + " Semsster !?";
                      Stat("Deleting  Semester " + i);
                      }
                  else if (state == 1) {
                      CONFIRMATION = "You want to add new  " + (i + 1) + " Semester !?";
                      Stat("Adding Semeister " + (i + 1));
                  }

                  
                  //confirm of doing this task 
                  //console.log(NTerms);
                  if (confirm(CONFIRMATION))
                  {
                      if (state == -1) {
                          //restriction of deleting 
                          if (i == NTerms) { alert("can not delete last semester"); return 0; }
                          if (allTerms[i - 1].length + allTerms[i].length > maxTermSubs) { alert("can not delete semester " + i + " , has this number of courses try move course"); return 0; }
                      }
                      // console.log("TERM" + i);
                      //confusion
                      //confilict when semster delete 
                      //subject at this semster is the root of subject at the last semster 
                      if (state == -1) {
                          for (var SubofThis = 0 ; SubofThis < allTerms[i - 1].length; SubofThis++) {
                              //console.log("THIS  "+allTerms[i - 1][SubofThis].name);
                              for (var SubofThat = 0 ; SubofThat < allTerms[i].length; SubofThat++) {
                                  //.log("THAT  " + allTerms[i][SubofThat].root);
                                  for (var rootofSubThat = 0 ; rootofSubThat < allTerms[i][SubofThat].root.length ; rootofSubThat++) {
                                      //console.log("root THAT  " + eval("SUB" + allTerms[i][SubofThat].root[rootofSubThat]).name);
                                      if (eval("SUB" + allTerms[i][SubofThat].root[rootofSubThat])[globalName] == allTerms[i - 1][SubofThis][globalName]) {
                                          alert(allTerms[i][SubofThat][globalName] + " is depend on " + allTerms[i - 1][SubofThis][globalName] + "\n (-> move any of them to solve confusion <-)");

                                          return false;
                                      }
                                  }
                              }
                          }
                      }

                      NTerms = NTerms + state;
                      if (NTerms < minNTerms) { NTerms = minNTerms; alert("minNumber of Terms : " + minNTerms); return false; }
                      else if (NTerms > maxNTerms) { NTerms = maxNTerms; alert("maxNumber of Terms : " + maxNTerms); return false; }


                      document.getElementById('Base').innerHTML = "";
                      termDraw(NTerms); // re draw new number of terms 
                      coreDraw();  // re draw buttons 
                      termSUB(i); //shfiting subjects at term i ... depending on (state) {+1,-1} 
                      //showNames();
                      EVENTS(); // re calling events after re draw 
                      //totalGPA();
                     
                  }
                  return false; //for if confirmed or not 
              }
             
          }
}
//..............................................


/////////6- information zone/////////////////////
//this func to achive direct [URL] of information .. this is called when click on infoZone buttons 
function goDetails() {
    //details buttons 
        var s = this.id.valueOf() ;  //the id of button [Video,Notes ,....] 
        //console.log(eval("SUB" + openedSubject)[s]);
        var go = eval("SUB" + openedSubject)[s]; //the valuse of object 
    if(go != "")
        open(go, '_blank'); //if there a link .. go in new tab 
    else 
        alert( eval("SUB" + openedSubject)[globalName] + " ' " + s + ": \n there's nothing here yet !! Contact US FOR HELP !")
}

//this function to graphically assinging  values of info
function showInfo() {
    document.getElementById('TermPopUp').style.visibility = 'hidden';

    //dark background 
    document.getElementById('Back').style.visibility = 'visible';
    document.getElementById('Back').style.height = document.getElementById('Base').style.height;
    document.getElementById('Back').style.width = document.getElementById('Base').style.width;
    document.getElementById('Back').style.left = parseInt(document.getElementById('Base').style.left)+10 +'px';
    document.getElementById('Back').style.top = document.getElementById('Base').style.top ;
    document.getElementById('Back').style.backgroundColor = backcanvas_background;
    

    // fade in 
    var o=0; 
    infoCanvas.style.visibility = 'visible'
       er =  setInterval(
        function () {
            'use strict';
            //console.log(o / 100);
            infoCanvas.style.opacity = o / 100;
            document.getElementById('Back').style.opacity = o/160;
            o++;
            if (o == maxOPacity) clearInterval(er);
        }, fadingspeed);
      

        
    // }
    //get the properties from subject object 
    openedSubject = eval(this.id.replace("Sub", "")); //get num 
    infoDesc = eval(this.id.replace("Sub", "SUB")).description;
    infoHours = eval(this.id.replace("Sub", "SUB")).hours;
    infoSubject = eval(this.id.replace("Sub", "SUB")).name ;  //fullname;
    infoLecturers = eval(this.id.replace("Sub", "SUB")).drs;
    infoTopics = eval(this.id.replace("Sub", "SUB")).topics;
    infoType = eval(this.id.replace("Sub", "SUB")).type;
    infoScore = eval(this.id.replace("Sub", "SUB")).degree + "/100" + "<br>" + degree2Points(eval(this.id.replace("Sub", "SUB")).degree) + "/4";

    //pose of infoCanvas ... depend on button  postion 
    //left
    if (parseInt(this.style.left) > parseInt(document.getElementById('Base').style.width) *0.5)
        infoCanvas.style.left = parseInt(this.style.left) - parseInt(infoCanvas.style.width) + Widths / 3 + "px";
    else
        infoCanvas.style.left = parseInt(this.style.left) + Widths / 3 + "px";

    //top
    if (parseInt(this.style.top) > parseInt(document.getElementById('Base').style.height) * 0.5)
        //infoCanvas.style.top = parseInt(this.style.top) - parseInt(infoCanvas.style.height) - parseInt(document.getElementById('Base').style.height) + parseInt(this.style.top) + Heights / 3 + "px";
        infoCanvas.style.top = parseInt(this.style.top) - parseInt(infoCanvas.style.height) * 0.5 + Heights / 3 + "px";
    else
        infoCanvas.style.top = parseInt(this.style.top) + Heights / 3 + "px";

    //change graphically 
    document.getElementById('infoDesc').innerHTML = infoDesc;
    document.getElementById('infoSub').innerHTML = infoSubject;
    document.getElementById('infoHour').innerHTML = infoHours;
    document.getElementById('infoType').innerHTML = infoType;
    document.getElementById('infoscore').innerHTML = infoScore; 
    document.getElementById('infoDrss').innerHTML = "";
    
    console.log("infog lec"+infoSubject+" : "+infoLecturers.length);

    for (var d = 0 ; d < infoLecturers.length ;d++)
         document.getElementById('infoDrss').innerHTML += "<option>" + infoLecturers[d] ;

    document.getElementById('infoTopics').innerHTML = "";
    for (var d = 0 ; d < infoTopics.length ; d++)
        document.getElementById('infoTopics').innerHTML += "<option>" + infoTopics[d];

    location.href = "#info";

    //one click show root and addevent to wait click but for show info 
    //another click show info and addevent to wait for click but for show root 
    if ((/Mobi/.test(navigator.userAgent))) {
        this.removeEventListener('click', showInfo );
        this.addEventListener('click', showRoot);
    }
}

//Information Zone Desing canvas [HTML] 
function infoDesign() {

    //maybe vars is unused 
    //Description draw 
    infoCanvas.style.opacity = 0;
    infoCanvas.innerHTML = "Information ZONE" + "</br>";
    infoCanvas.style.height = infoHeight + "px";
    infoCanvas.style.width = infoWidth + "px";
    infoCanvas.style.backgroundColor = "black";
    infoCanvas.style.border = 'dashed';
    infoCanvas.style.borderColor = "white";
    infoCanvas.style.position = "absolute";
    infoCanvas.style.textAlign = "center";
    infoCanvas.style.color = "white";
    infoCanvas.style.fontSize = 27 + "px";

    infoCanvas.innerHTML += "<button id='Books'  style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative ; left: " + 0 + "px; top: " + 0 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Books" + "</button>";
    infoCanvas.innerHTML += "<button id='Videos'  style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 0 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Videos" + "</button>";
    infoCanvas.innerHTML += "<button id='Notes' style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 0 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Notes" + "</button>";
    infoCanvas.innerHTML += "<button id='Exams' style='opacity:1;height:" + 50 + "px; width:" + 80 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 10 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Exams" + "</button>";
    infoCanvas.innerHTML += "<button id='Lectures' style='opacity:1;height:" + 50 + "px; width:" + 90 + "px; background-color:green; position:relative; left: " + 0 + "px; top: " + 10 + " px; text-align-last:center;color:white;font-size:20px;'>" + "Lectures" + "</button> </br> </br>";


    //Descriotion
    infoCanvas.innerHTML += "<div id='infoSub' style='opacity:1;height:" + 50 + "px;" + 160 + "px;width:" + infoWidth * (0.75) + "px; background-color:white; position:absolute; left:10px; top:90px;text-align:left;color:black;font-size:45px;'>" + infoSubject + " : </br>" + "</div>";
    infoCanvas.innerHTML += "<div id='infoDesc' style='opacity:1;height:" + 160 + "px;width:" + infoWidth * (0.75) + "px; background-color:white; position:absolute; left:10px;top:145px;text-align:left;color:red;font-size:40px;'>" + infoDesc + "</div> ";

    //HoursinfoType
    infoCanvas.innerHTML += "<div id='infoType' style='color:red;opacity:1;height:" + 50 + "px; width:" + infoWidth * (0.2) + "px; background-color:white; position:absolute ; left:" + (parseInt(document.getElementById('infoSub').style.width) + 15) + "px;top:90px;font-size:50px;'>" + infoType + "</div>"; // style='top:25px; color:red;font-size:80px;'>" + + "H </br> </div>"; // + "<div style='position:relative;top:5px; color:red;font-size:30px;'>" + "hours" + "</div>" + "</canvas>";
    infoCanvas.innerHTML += "<div id='infoHour' style='color:red;opacity:1;height:" + 160 + "px; width:" + infoWidth * (0.2) + "px; background-color:white; position:absolute ; left:" + (parseInt(document.getElementById('infoSub').style.width) + 15) + "px;top:145px;font-size:150px;'>" + infoHours + "</div>"; // style='top:25px; color:red;font-size:80px;'>" + + "H </br> </div>"; // + "<div style='position:relative;top:5px; color:red;font-size:30px;'>" + "hours" + "</div>" + "</canvas>";

    //Letureers
    infoCanvas.innerHTML += "<div id='infoDr' style='opacity:1; width:" + infoWidth * (0.2) + "px;background-color:red; position:absolute; left:350px;top:" + 310 + "px;text-align:left;color:white;font-size:40px;'> Lecturers : </div>";
    infoCanvas.innerHTML += "<select id='infoDrss' style='width:" + infoWidth * (0.7) + "px;position:absolute;left:10px;top:353px;font-size:30px;' size='3'> </select>";

    //Topics
    infoCanvas.innerHTML += "<div id='infoTopic' style='opacity:1; width:" + infoWidth * (0.2) + "px; background-color:red; position:absolute; left:350px;top:" + 470 + "px;text-align:left;color:white;font-size:40px;'> Topics : </div>";
    infoCanvas.innerHTML += "<select id='infoTopics' style='width:" + infoWidth * (0.7) + "px;position:absolute;left:10px;top:515px;font-size:30px;' size='3'> </select>";

    //score
    infoCanvas.innerHTML += "<p id='score'     style='position:relative;left:" + (275) + "px;top:180px;font-size:40px;color:gold;text-align:center;'> Your Score : </p>";
    infoCanvas.innerHTML += "<p id='infoscore' style='position:relative;left:" + (275) + "px;top:170px;font-size:60px;color:gold;text-align:center;margin-top:0px;'></p>";
}
//..............................................


/////////7- Drag/edit Subjects Poses/////////////
// this func is doing graphic function 
// input the subject (button) id and the term in which 
function PushItems(subjectid, term) {

    var btnid;
    if (term > 0 && term <= NTerms) {
        try {
            //console.log("sub_id ="+subjectid+" term="+term);

            btnid = subjectid; //came with "Sub"
            document.getElementById(btnid).style.left = parseInt(document.getElementById("Sem" + term).style.left) + Hoffset + "px";
            document.getElementById(btnid).style.top = allTerms[term - 1].length * SubShiftTop + "px";


        }
        catch (err) { alert("Undefiend Subject Pose ! " + eval(subjectid.replace("Sub", "SUB"))[globalName]); }

    }
}

//this func [TOUCH FUNC]  .. [DEVELOPING...] 
function TOUCH() {
    document.getElementById('TermPopUp').style.visibility = 'hidden';
    if ((/Mobi/.test(navigator.userAgent))) {//a mobile

        THISx = this.style.left;//public var to save current pose of button 
        THISy = this.style.top;

        var scrollX = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
        var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        var offX = touch.pageX - parseInt(this.style.left);
        var lastX = 0, delX = 0;

        this.addEventListener('touchmove',
            function (event) {
                var whichArt = event.target;
                event.preventDefault();
                if (event.targetTouches.length == 1) {
                    var touch = event.targetTouches[0];
                    // Place element where the finger is
                    // console.log(touch);


                    this.style.left = (offX + delX) + 'px';
                    //  this.style.top =  (touch.pageY + 180 )+ 'px';
                    // console.log("off= " +offX);
                    //  console.log("del= " + delX);
                    delX = touch.pageX - lastX;
                    lastX = touch.pageX;

                }


            });
    }
}

//this func is to drag button (THIS) to any where semster 
function DragX(event) {
    //var xName = eval(this.id.replace("Sub", "SUB")).name;
    // Stat(xName + " is Dragging ");

    document.getElementById('TermPopUp').style.visibility = 'hidden';

    var mouseX, mouseY;

    var rect = document.getElementById('BODY').getBoundingClientRect(); //to decleare where the canvas to take pos from
    var scrollX = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft); //to take the scroll done by body or document 
    mouseX = event.clientX + scrollX;
    var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    mouseY = event.clientY + scrollY;


    if ((/Mobi/.test(navigator.userAgent))) // to use with Mobile phone [Developing...] 
    {
        mouseX = parseInt(this.style.left);
        mouseY = parseInt(this.style.top);
        // console.log("scrX= " + scrollX);
        //console.log("init X= " + mouseX);
    }
    else {
        //  THISx = parseInt(this.style.left) + Widths / 2;
        //  THISy = parseInt(this.style.top) + Heights / 2;

    }
    // the poseition re-scall 
    mouseX /= document.getElementById('BODY').style.zoom;
    mouseY /= document.getElementById('BODY').style.zoom;

    // console.log("X= "+mouseX );
    for (var i = 1 ; i <= NTerms; i++) {
        //   console.log( parseInt(document.getElementById("Sem" + i).style.left) - 30)
        //every term has [left_edge = left-some_offset , right_edg = left+width+some_offset] 
        if (mouseX >= parseInt(document.getElementById("Sem" + i).style.left) - Hoffset * 3 && mouseX <= parseInt(document.getElementById("Sem" + i).style.left) + TermWidths + Hoffset * 3) {
            //    console.log(i);
            if (!(allTerms[i - 1].indexOf(eval(this.id.replace("Sub", "SUB"))) != -1)) {//term has not this subject 
                if (allTerms[i - 1].length < maxTermSubs) {//term has n number of subject 
                    //restrict push forward :: subject won't over the subjects which it is a root for 
                    //test for what if this subject is root for aone ,,, then prevent to over its positon 
                    //restrict forward
                    for (var s = 1 ; s <= maxNSub; s++) {
                        var xRoots = eval("SUB" + s).root;
                        for (var o = 0 ; o < xRoots.length ; o++) {
                            if (xRoots[o] == this.id.replace("Sub", "")) {
                                //if subj is root for any subj
                                if (parseInt(mouseX) >= parseInt(document.getElementById("Sub" + s).style.left) - Hoffset * 3) {
                                    //if subj get obver the root left side 
                                    alert("You may take " + eval(this.id.replace("Sub", "SUB"))[globalName] + " before " + eval("SUB" + s)[globalName]);
                                    //back postion to last Touched one // 
                                    if ((/Mobi/.test(navigator.userAgent))) {
                                        this.style.left = THISx;
                                        this.style.top = THISy;
                                        THISx = 0; THISy = 0;

                                    } return 0;
                                }

                            }

                        }
                    }
                    //restrict pull back :: the roots of subject won't over the subjec
                    //restrict backward
                    var fRoots = eval(this.id.replace("Sub", "SUB")).root;

                    if (fRoots[0] != null && fRoots[0] != [0]) // to be sure have a root to be restricted
                    {                        
                        for (var s = 0 ; s < fRoots.length; s++) {
                            if (parseInt(mouseX) <= parseInt(document.getElementById("Sub" + fRoots[s]).style.left) + parseInt(document.getElementById("Sub" + fRoots[s]).style.width) + Hoffset * 3) {
                                alert("You may take " + eval(this.id.replace("Sub", "SUB"))[globalName] + " after " + eval("SUB" + fRoots[s])[globalName]);
                                if ((/Mobi/.test(navigator.userAgent))) {
                                    this.style.left = THISx;
                                    this.style.top = THISy;
                                    THISx = 0; THISy = 0;

                                } return 0;
                            }
                        }
                    }
                    eval(this.id.replace("Sub", "SUB")).sem = i; //change properties of subject object 
                    allTerms[i - 1].push(eval(this.id.replace("Sub", "SUB"))); //push new object to public array  

                    //PushItems(this.id, i); //psuh id and term to GUI

                    termSUB(0); //redefine subs in terms Array

                    Stat(eval(this.id.replace("Sub", "SUB"))[globalName] + "Added In Term " + i);
                    totalGPA(); //re calc GPA 
                    LanSelect();  //

                }
                else {
                    alert("term " + i + " has " + allTerms[i - 1].length + " courses \n It is reached maximum courses Term: " + maxTermSubs);
                    if ((/Mobi/.test(navigator.userAgent))) {
                        this.style.left = THISx;
                        this.style.top = THISy;
                        THISx = 0; THISy = 0;

                    } return 0;
                }

            }
            else {
                //alert(eval(this.id.replace("Sub", "SUB")).Arname + " is already in Term " + i + "\n or maybe twice dataSet");
                if ((/Mobi/.test(navigator.userAgent))) {
                    this.style.left = THISx;
                    this.style.top = THISy;
                    THISx = 0; THISy = 0;

                } return 0;
            }

        }


    }
}
// this func is to define & redefine subjects in every semster and put in public array allTerms have courses as objects 
//xShift inputs ... is to shift the subjects (which after the xShift postion) {+1,-1}
function termSUB(xShift) {

    //starting with clear past array and redefine 
    allTerms = new Array(NTerms);
    for (var i = 0 ; i < NTerms ; i++) {
        allTerms[i] = [];
    }

    // until here every subject object has define its semster 

    // for (var i = 1 ; i <= maxNTerm ; i++) {
    for (var s = 1 ; s <= maxNSub; s++) {
        //state 1 .. add new term .. so shift the courses (which after the shfit postion) to next semster .. adding start after term 0
        if (state == 1 && eval("SUB" + s).sem > xShift && xShift != 0)
            eval("SUB" + s).sem = Number(eval("SUB" + s).sem) + 1;
            //state -1 .. remove term ... so shift the course(which after the shfit postion) to last semster ... remove start from term > 1 .. not delete term 1 
        else if (state == -1 && eval("SUB" + s).sem > xShift && xShift > 1)
            eval("SUB" + s).sem = Number(eval("SUB" + s).sem) - 1;



        // console.log(allTerms[i-1]);
        if ((allTerms[i - 1].indexOf(eval("SUB" + s)) == -1)) {//if it added to term data set 
            if (allTerms[i - 1].length <= maxTermSubs) { //if this term has space  

                var i = parseInt(eval("SUB" + s).sem);//subject new term
                // console.log(allTerms[i-1].length);
                allTerms[i - 1].push(eval("SUB" + s));//add to the public term courses array 
                PushItems(("Sub" + s), i);  //push id and sem (graphically)

            }
            else { alert("Init.: term " + i + " has " + allTerms[i - 1].length + " courses \n is reached maxTermSubs: " + maxTermSubs); }
        }

        else { alert("Init.:" + eval("SUB" + s)[globalName] + " is already in Term " + i); }

    }
    //console.log(allTerms.length);
    state = 0; //redefault state as nothing 
    // totalGPA(); 
    // }
}
//..............................................


/////////// GUI / showing / drawing / ==style-editing 
function outFocus() {//this is called when click outside info-zone 
    location.href = "#Base";
    //infocanvas is the canvas contain the info-zone details 
    infoCanvas.style.visibility = 'hidden';
    infoCanvas.style.opacity = 0;
    //back is black canvas to make focus on infozone 
    document.getElementById('Back').style.visibility = 'hidden';
    document.getElementById('Back').style.opacity = 0;
}
//this func to reDefault buttons       
function cleanShow() {
    for (var i = 1; i <= Buttons.length ; i++) {
        Buttons[i - 1].style.backgroundColor = butt_default_background;
        Buttons[i - 1].style.color = butt_default_font_color;
        Buttons[i - 1].style.borderColor = butt_default_border_color;
        Buttons[i - 1].style.opacity = 1;
    }

    //document.getElementById('BOTTOM').innerHTML = "Statues :"
}
//this function to show roots & children of courses 
function showRoot() {
    //show this subject as red 
    //cleanShow();
    for (var i = 1; i <= Buttons.length ; i++) {
        Buttons[i - 1].style.backgroundColor = butt_default_background;
        Buttons[i - 1].style.color = butt_default_font_color;
        Buttons[i - 1].style.borderColor = butt_default_border_color;
        Buttons[i - 1].style.opacity = 1;
    }

    document.getElementById('TermPopUp').style.visibility = 'hidden'; //hide the inbetween areas while move_on button 
    //button choose styple 
    this.style.backgroundColor = butt_choosen_background;
    this.style.color = butt_choosen_font_color;
    this.style.borderColor = butt_choosen_border_color;
    this.style.opacity = 1;

    //var idString = this.id;
    //idString = idString.replace("Sub",""); //slice(3, 5); 
    //console.log(idString);
    //idString = "SUB" + idString;
    //convert from button Sub to Object SUB

    // root of subj
    var xRoot =  eval(this.id.replace("Sub", "SUB")).root;
    // console.log(xRoot);
    for (var i = 0 ; i < xRoot.length; i++) {//convert form object SUB to bt Sub 
        if (xRoot[i] > 0 && xRoot[i] <= maxNSub) {
            document.getElementById("Sub" + xRoot[i]).style.backgroundColor = butt_root_background;
            document.getElementById("Sub" + xRoot[i]).style.color = butt_root_font_color;
            document.getElementById("Sub" + xRoot[i]).style.opacity = 1;
            //roots of root
            var xxRoot = eval("SUB" + xRoot[i]).root;
            for (var j = 0 ; j < xxRoot.length ; j++) {
                if (xxRoot[j] > 0 && xxRoot[j] <= maxNSub) {
                    if (xxRoot[j] == xRoot[i])
                        document.getElementById("Sub" + xxRoot[j]).style.backgroundColor = butt_root_background;
                        //if the course is root and root of root .. show it as root
                    else {
                        document.getElementById("Sub" + xxRoot[j]).style.backgroundColor = butt_root_of_root_background;
                        document.getElementById("Sub" + xxRoot[j]).style.color = butt_root_of_root_font_color;
                        document.getElementById("Sub" + xxRoot[j]).style.opacity = 1;
                    }
                }
            }

        }
    }
    //show POST .. children 
    for (var s = 0 ; s < allSUBs.length ; s++) {
        var Sroot = eval("SUB" + (s + 1)).root;
        for (var iSroot = 0 ; iSroot < Sroot.length ; iSroot++) {
            if (Sroot[iSroot] == this.id.replace('Sub', '')) {


                for (var xs = 0 ; xs < allSUBs.length ; xs++) {
                    var xSroot = eval("SUB" + (xs + 1)).root;
                    for (var xiSroot = 0 ; xiSroot < xSroot.length ; xiSroot++) {
                        if (xSroot[xiSroot] == (s + 1)) {
                            //post of posted 
                            document.getElementById("Sub" + (xs + 1)).style.backgroundColor = butt_child_of_child_background;
                            document.getElementById("Sub" + (xs + 1)).style.color = butt_child_of_child_font_color;
                            document.getElementById("Sub" + (xs + 1)).style.opacity = 1;
                        }
                    }
                }
                document.getElementById("Sub" + (s + 1)).style.backgroundColor = butt_child_background;
                document.getElementById("Sub" + (s + 1)).style.color = butt_child_font_color;
                document.getElementById("Sub" + (s + 1)).style.opacity = 1;
            }
        }
    }
    
    //one click show root and addevent to wait click but for show info 
    //another click show info and addevent to wait for click but for show root 
    if ((/Mobi/.test(navigator.userAgent))) {
        //if it clicked again show its info 
        this.removeEventListener('click', showRoot);
        this.addEventListener('click', showInfo);
    }
}
//this function isto show names of courses + Underline Finishe courses  
function showNames() {
    // work is done on buttons 
    //by refering to their objects attributes 
    //lan is global var ... changed by function LanSelect 
    if (lan == 'en') { globalName = "fullname"; } else if (lan == 'ar') { globalName = "Arname"; }
    for (var i = 1 ; i <= maxNSub; i++) {//edit button HTML  
        if (eval("SUB" + i).degree >= LowPassDegree && eval("SUB" + i).degree <= HighestDegree) {
            document.getElementById("Sub" + i).innerHTML = "<b> <u>" + eval("SUB" + i)[globalName] + "</u> </b>";
        }
        else
            try {
            document.getElementById("Sub" + i).innerHTML = eval("SUB" + i)[globalName];
            }
            catch (error) {console.log("Sub"+i);}
    }
}
//draw subject (buttons) from entered subjects only at allSubs data set 
function coreDraw() {

    var s = 0; //current num of sub
    while (allSUBs.length > 0) {
        allSUBs.pop();
    }
    for (var i = 1; i <= numofuploadSubs; i++) {

        try {
            allSUBs.push(eval("SUB" + i));
            s++; //sum true subjects
        }
        catch (error) {
            console.log("error");
            //num of error subs 
        }

    }
    maxNSub = s;
    //console.log(maxNSub);
    if(!new_coreDraw){
    s = 0;
    //Lefts = 50;
    // xLefts , xTops is local changable variables of lefts and tops  
    var xLefts = Lefts;
    for (var i = 1 ; i <= NTerms  ; i++) {
        var xTops = Tops;
        for (j = 1 ; j <= intiNumSubsPerTerm ; j++) {
        //for (j = 1 ; j <= maxNSub ; j++) {if (eval("SUB"+j).sem == i ) {

            
            //console.log("iTerm="+ i + " jSub="+ j + " sCounted="+s );
            if (s >= maxNSub) return 0; //limit of gui

            document.getElementById('Base').innerHTML += "<button id='w' draggable='true' style='cursor:pointer;border:5px solid;border-radius:23px;border-color:white;width:" + Widths + "px;height:" + Heights + "px;position:absolute;left:" + xLefts + "px;top:" + xTops + "px;background-color:whitesmoke;font-size:" + btnfontSize + "px;'>" + "Sub_" + (j + (i - 1) * 6) + "</button>";

            //ReDefine Ids from 'w' to 1,2,3,.....,maxNSub
            
            document.getElementById('Base').getElementsByTagName('button')[j + (i - 1) * intiNumSubsPerTerm - 1].id = "Sub" + (j + (i - 1) * intiNumSubsPerTerm);
            //document.getElementById('Base').getElementsByTagName('button')[s].id = "Sub" + (j + (i - 1) * intiNumSubsPerTerm);

            //Init. Position 
            // document.getElementById('Sub' + (j + (i - 1) * 6)).style.top = Tops + "px" ;
            // document.getElementById('Sub' + (j + (i - 1) * 6)).style.left = Lefts + "px";
            xTops += SubShiftTop; //absolute value from the refrence >> the innerHTML 
            s++;
        //}
        }
        xLefts += TermShiftLeft;
    }
}
    if(new_coreDraw){
    no_sub = new Array(NTerms).fill(0); 
    //console.log(no_sub);
        for (j = 1 ; j <= maxNSub ; j++) {
            var no_term = eval("SUB"+j).sem ; 
            no_sub[no_term-1] = no_sub[no_term-1]+1;  
            //console.log("iTerm="+ no_term + " jSub="+ j + " no_sub[no_term-1]="+no_sub[no_term-1] );
            var xTops = Tops+SubShiftTop*no_sub[no_term-1]; //absolute value from the refrence >> the innerHTML 
            var xLefts = Lefts+TermShiftLeft*no_term;
            document.getElementById('Base').innerHTML += "<button id='Sub" + j +"' draggable='true' style='cursor:pointer;border:5px solid;border-radius:23px;border-color:white;width:" + Widths + "px;height:" + Heights + "px;position:absolute;left:" + xLefts + "px;top:" + xTops + "px;background-color:whitesmoke;font-size:" + btnfontSize + "px;'>" + "Sub_" + (j) + "</button>";
      }
    }
}

//draw terms (Divs) as (n) times 
function termDraw(n) {
    if (n == null) n = 10;
    else if (n < minNTerms) { n = minNTerms; }
    else if (n > maxNTerms) { n = maxNTerms; } // also controled by the input funtion 

    NTerms = n;
    iLvl = 0;

    var TermLefts = baseTermLefts;
    //term draw 
    for (var iTerm = 1 ; iTerm <= NTerms ; iTerm++) {
        //draw term area
        document.getElementById('Base').innerHTML += "<div id='Sem1' class='H' onselectstart='return false;' style='border:5px solid;border-radius:23px;border-color:white;height:" + TermHeights + "px; width:" + TermWidths + "px; background-color:darkcyan; position:absolute; left: " + TermLefts + "px; top: " + TermTops + "px; text-align-last:center;color:white;font-size:27px;'> <u> <b>" + " Level " + iLvl + "00" + " Term " + iTerm + "</b></u> </div>";
        //draw semster-GPA area 
        document.getElementById('Base').innerHTML += "<div id='infoSem1' class='I' onselectstart='return false;' style='border:5px solid;border-radius:20px;border-color:white;height:" + 60 + "px; width:" + (TermWidths - Hoffset / 2) + "px; background-color:black;opacity:0.95; position:absolute; left: " + TermLefts + "px; top: " + (TermTops + TermHeights + 20) + "px; text-align:center;color:cyan;font-size:27px;'></div>";

        if (iTerm % 2 == 0) iLvl++;
        {
            document.getElementById('Base').getElementsByClassName("H")[iTerm - 1].id = "Sem" + iTerm;
            document.getElementById('Base').getElementsByClassName("I")[iTerm - 1].id = "infoSem" + iTerm;
        }
        document.getElementById('Base').style.height = TermHeights + Voffset + 133 + "px";
        document.getElementById('Base').style.width = TermLefts + TermWidths + +Hoffset + "px";
        // document.getElementById('BOTTOM').style.width = TermLefts + TermWidths + Hoffset + "px";
        // document.getElementById('HEADER').style.width = TermLefts + TermWidths + Hoffset + "px";
        document.getElementById('GPA').style.width = TermLefts + TermWidths + Hoffset + 10 + "px";
        document.getElementById('HEADER').style.width = TermLefts + TermWidths + Hoffset + "px";
        document.getElementById('copyright').style.width = (TermLefts + TermWidths + Hoffset) * 0.66 + "px";
        document.getElementById('copyright').style.left = (TermLefts + TermWidths + +Hoffset) / 2 - parseInt(document.getElementById('copyright').style.width) / 2 + 'px';
        document.getElementById('copyright').style.top = parseInt(document.getElementById('Base').style.height) + parseInt(document.getElementById('Base').style.top) + parseInt(document.getElementById('infoHelp').style.height) + 50 + "px";


        TermLefts += TermShiftLeft;

    }
}
// what is going on now ? state bar show operations underwork ..... [DEVELOPING..]
function Stat(x) {
    //  document.getElementById('BOTTOM').innerHTML = "Status :" + x + "."; 
    // var _0x866c = ["\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", "\x42\x4F\x54\x54\x4F\x4D", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x53\x74\x61\x74\x75\x73\x20\x3A", "\x2E"]; document[_0x866c[2]](_0x866c[1])[_0x866c[0]] = _0x866c[3] + x + _0x866c[4]
}
//..............................................

//saveing function  ///////////////////////////
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs = saveAs || function (e) {
    "use strict";
    if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return
    }
    var t = e.document, n = function () {
        return e.URL || e.webkitURL || e
    }, r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), o = "download" in r, a = function (e) { var t = new MouseEvent("click"); e.dispatchEvent(t) }, i = /constructor/i.test(e.HTMLElement) || e.safari, f = /CriOS\/[\d]+/.test(navigator.userAgent), u = function (t) { (e.setImmediate || e.setTimeout)(function () { throw t }, 0) }, s = "application/octet-stream", d = 1e3 * 40, c = function (e) { var t = function () { if (typeof e === "string") { n().revokeObjectURL(e) } else { e.remove() } }; setTimeout(t, d) }, l = function (e, t, n) { t = [].concat(t); var r = t.length; while (r--) { var o = e["on" + t[r]]; if (typeof o === "function") { try { o.call(e, n || e) } catch (a) { u(a) } } } }, p = function (e) { if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) { return new Blob([String.fromCharCode(65279), e], { type: e.type }) } return e }, v = function (t, u, d) {
        if (!d) { t = p(t) }
        var v = this, w = t.type, m = w === s, y, h = function () { l(v, "writestart progress write writeend".split(" ")) }, S = function () { if ((f || m && i) && e.FileReader) { var r = new FileReader; r.onloadend = function () { var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;"); var n = e.open(t, "_blank"); if (!n) e.location.href = t; t = undefined; v.readyState = v.DONE; h() }; r.readAsDataURL(t); v.readyState = v.INIT; return } if (!y) { y = n().createObjectURL(t) } if (m) { e.location.href = y } else { var o = e.open(y, "_blank"); if (!o) { e.location.href = y } } v.readyState = v.DONE; h(); c(y) }; v.readyState = v.INIT; if (o) { y = n().createObjectURL(t); setTimeout(function () { r.href = y; r.download = u; a(r); h(); c(y); v.readyState = v.DONE }); return } S()
    }, w = v.prototype, m = function (e, t, n) { return new v(e, t || e.name || "download", n) }; if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) { return function (e, t, n) { t = t || e.name || "download"; if (!n) { e = p(e) } return navigator.msSaveOrOpenBlob(e, t) } } w.abort = function () { }; w.readyState = w.INIT = 0; w.WRITING = 1; w.DONE = 2; w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null; return m}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content); if (typeof module !== "undefined" && module.exports) { module.exports.saveAs = saveAs } else if (typeof define !== "undefined" && define !== null && define.amd !== null) { define("FileSaver.js", function () { return saveAs }) }

/*
[DEVELOPING]
- Start collecting material for courses 
- Design Tutorial (photos , videos , in-site tutorial) 
- profile Study timeline analysis 
- Time plane (pdf export) (AI smart desing plane) 
- study plane for learners (long/med/short/summary) terms 
- Reviews about courses 
- complete avaiablity on smart phones site/or app 
- STARTING MARKET WITH .. WHY YOU NEED THIS ?
- GET courses details from CSV file for any no. ['DONE 22OCT18']
*/
