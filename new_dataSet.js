// JavaScript source code

$.ajax({
   url:"courses_dataSet.csv",
   dataType:"text",
   async: false,
   success:function(data)
   {
    courses_data = data.split(/\r?\n|\r/);
    //var table_data = '<table class="table table-bordered table-striped">';
    console.log("Successful uploading 0f lines # = "+courses_data.length);
   },
 });

class SUBX {
  constructor () {
        this.name= "";
        this.root= [];
        this.sem= 1;
        this.degree= 0;
        this.hours= 2;

        this.type= "";
        this.fullname= '';
        this.Arname= "";
        this.description= "";
        this.Ardescription= " ";

        this.drs= [];
        this.topics= [];
        this.Books= '';
        this.Videos= ''; 
        this.Notes= '';
        this.Exams= '';
        this.Lectures= '';
      }
    }
console.log(courses_data.length);
var count = 0 ; 

for(var c = 1; c<courses_data.length; c++)
    {
      var cell_data = courses_data[c].split(",");
      if (cell_data[0] != "" ) count+= 1 ;
      else {continue ;}

      //console.log(cell_data);
      eval("var SUB"+(count).toString()+" = new SUBX();") ; //creat new object of class SUBX
     
      //alter details with comming csv file 
      eval("SUB"+count).name= cell_data[0].toString();
      var croot = [([cell_data[1]][0]).split('-')][0].map(Number) ; 
      // console.log(cc);
      eval("SUB"+count).root= croot ; // to make a vector again
      // console.log(eval("SUB"+count).root);
      eval("SUB"+count).sem = parseInt(cell_data[2]);
      maxINPUTTemrs = Math.max(maxINPUTTemrs,parseInt(cell_data[2]));

      eval("SUB"+count).degree= 0 ; //parseInt(cell_data[3]);
      
      var xhours = parseInt(cell_data[4]); 
      if (xhours >= 1 && xhours <= 8) eval("SUB"+count).hours= xhours ; 
      else eval("SUB"+count).hours= 3 ; 

      eval("SUB"+count).type= cell_data[5].toString();

      eval("SUB"+count).fullname= cell_data[6].toString();
      eval("SUB"+count).Arname= cell_data[7].toString();
      eval("SUB"+count).description= cell_data[8].toString();
      eval("SUB"+count).Ardescription= cell_data[9].toString();

      eval("SUB"+count).drs= cell_data[10];
      eval("SUB"+count).topics= cell_data[11];
      eval("SUB"+count).Books= cell_data[12];
      eval("SUB"+count).Videos= cell_data[13];
      eval("SUB"+count).Notes= cell_data[14];
      eval("SUB"+count).Exams= cell_data[15];
      eval("SUB"+count).Lectures= cell_data[16];
      
      //console.log("SUB"+count+" - "+eval("SUB"+count).name+" .. Loaded");
      // eval("SUB"+1).name = "ESLaM" ;//= SUBJ(x);  
    }
numofuploadSubs = count ;
console.log("#0f_loaded courses successfully = "+numofuploadSubs);