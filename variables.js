// JavaScript source code

//Varables////
//const BaseMaxNSubs = 70; //max number of subjects ... may database set less than it 
const maxHours = 21; //max hours per semster  ... using in showing >=< of total semster hours ... not resticted 

var LowPassDegree = 60,
    HighestDegree = 100;

var maxNSub = 0, //max base subjects per semster .. =0 .. so theres no subs intialy 
    maxNTerms = 18, //max no. of terms at most 
    minNTerms = 5, //min no. of terms ''  '' 
    NTerms = 0, //intial no. of terms 
    maxTermSubs = 8; //max subjects per semster ... using to restrict 

var intiNumSubsPerTerm = 6;  //intial fill courses per term

var courses_data ; //contains all data from uploaded CSV file 
var maxINPUTTemrs = 0 ; //counted = max semster no. / of the input dataset 

//style of buttons 
var butt_default_background = "white",
butt_default_font_color = "black",
butt_default_border_color = "white",
butt_choosen_background = "red",
butt_choosen_font_color = "white",
butt_choosen_border_color = "yellow",
butt_root_background = "orange",
butt_root_font_color = "white",
butt_root_of_root_background = "yellow",
butt_root_of_root_font_color = "black",
butt_child_background = "blue",
butt_child_font_color = "white",
butt_child_of_child_background = "skyblue",
butt_child_of_child_font_color = "black";
var backcanvas_background = "black";
var TermPopUp_color = 'hotpink';


//Arrays  
var allTerms = new Array(NTerms); //Array that contain each semster subjects (As object) ... starting from i-1 as i==sem no.
var allSUBs = []; //Array have all subjects (objects) with default Semster pose ... and if upload file it update these poses 
var dataInfo = []; // Array contains the output data (will-be-saved) // 0->no.of.terms i->sub.no. i+1->terms.no i+2->degree
// canvs Arrays 
var Buttons = document.getElementById('Base').getElementsByTagName("button"); // all the buttons have created to contain the subject (object) 
var sss = document.getElementById('Base').getElementsByTagName("div"); // all divs  """ """ "" "" """ contain the semster (area) 
var infoCanvas = document.getElementById('info'); // information zone Div 
var infoButtons = document.getElementById('info').getElementsByTagName('button'); // all buttons in Information Zone Div // using to go to direct information directory  

var input = document.getElementById("input"); //input file == upload 
var output = document.getElementById("output"); // output file == download 


//button intial style
var Heights = 100,
    Widths = 200,
    Lefts = 50,
    Tops = 130;
const btnfontSize = 30;

//intial offset of Terms 
var Hoffset = 10,
    Voffset = 10;
//Terms intial style 
var TermHeights = 1000,
       TermWidths = Widths + Hoffset * 2,
       baseTermLefts = 0,//Lefts - Hoffset,
       TermTops = 50,
       iTerm = 0,
       iLvl = 0;
// intial info style 
var infoHeight = 635,
    infoWidth = 800;

var TermShiftLeft = 260, //the shifing of semsters poses horizantal 
    SubShiftTop = 120; //"" "" "" "" of subjs vertical 
var DescHeight = 200; // .... NOT USED ... may be developed for under-semster GPA zone height style 

//Information Zone function intial valuse 
var openedSubject; //01 ,02 ,.. number 
var infoDesc; // description 
var infoHours;// hours 
var infoSubject; //"PHY01";
var infoLecturers; //Dr.sdsd
var infoTopics; //sdsd , sdsd ,sdw
var infoType; //"core";
var infoScore; //1 - 100 

var maxOPacity = 80; //%100 //obacity of end-load Information-Zone (afer smooth-in )
var state = 0; //1>add , -1>delete // using to differ click of delete or add In-Between semsters  
var lan = "en"; // Ar // default is English 

var THISx, THISy; // global postion when touch events is calling 
var globalName = "fullname"; // properties of SUb english name // Arname attribute of sub arabic name // 

var RESULT; //the input file data 
var fadingspeed = 0.01 ; //less is faster  
var new_coreDraw = true ; //new way of core draw by surfing sem.value for each sub
