var color;
var mapdata1;
var RegionalData;
var local;
var county_agri;
var Reg_voc;
var indep_pub;
var indep_voc;
var chart_comm;
var chart_horace;
var finalMapData;
var sliderOrigin;
var sliderEnd;
var filtereddata;
var seletedData;
var data;
var spendData;
var lowerlimit;
var upperlimit;
var fd;
var x0
var x1;
var histogram;


// function for creating map
function createMap(mapData, divId) {
    
    var dID="svgID";                        // Setting ID for linked data histogram
    if(divId=='#district-map')
    {
        dID="svgid";
    }
    var w=800,h=600;
    var svg = d3.select(divId).append("svg")
        .attr("id", dID)        
	.attr("width", w)
	.attr("height", h);

    var proj = d3.geoConicConformal()
        .parallels([41 + 43/60, 42 + 41/60])
        .rotate([71 + 1/2, -41])
        .fitExtent([[10,10],[w-20,h-20]], mapData);

    var path = d3.geoPath().projection(proj);
    var features = mapData.features;
   
    svg.selectAll(".district")
        .data(mapData.features)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) {
      
            return  "p"+d.properties.ORG_CODE })
	    .attr("class", "district")        
        .on("mouseover", function(d) {
        
            //console.log(d);


            if(d.properties.TTPP!='' && d.properties.TTPP!=undefined){              // Extra credit 
                
                var match1=parseInt(d.properties.TTPP);                     // Getting the TTPP from map on mouse hover  



                var highlightthis=   histogram.filter(function(l){
                 
                 if(match1>=l.x0 && match1<=l.x1)                       //Matching the highlighted value of TTPP from map to the x0 and x1 values of bar i.e if the TTPP value of highlighted district is be
                 {
                     return l.x0;
                 }
                    
                
                });
                             
             var canvas = d3.select("#histogram1");                                 
             canvas.select("#b"+highlightthis[0].x0).attr("fill","yellow");       
                






                console.log("histogram inside where I need to compare",histogram);
                console.log("Twenty second ",histogram[6][22]);
                // compate TTPP and x0 and x1 and return those x0 and x1 between which the value of TTPP lies
            }
     


            var maphoverdata;
            //filtereddata = d.map(function (t)            
            //{
            //    console.log("t is",t);        
            //});        



            
            if(d.properties.TTPP>=lowerlimit || d.properties.TTPP<=upperlimit){

                var histcanvas = d3.select("#histogram1").attr("fill","yellow");
                // data matches then then colour
            }


            //console.log("x0 in createmap",x0);
            //console.log("x1 in createmap",x1);
            

        })
           .on("mouseout", function(d, i) {
               d3.select(this)
               .attr("fill", "black");

               var canvas = d3.select("#histogram1");
               canvas.selectAll("rect").attr("fill","black");       
             

           })

	    .style("fill", "red")
	    .style("fill-opacity", 0.3)
        .style("stroke", "black")
        .style("stroke-width", 0.5)
	    .append("title").text(function(d) { 
	        return d.properties.ORG_CODE.slice(1,4) + ': ' + d.properties.DISTRICT; });
        
    
    
    return svg;

}


function mapFill(fillData){                 // Fill function to fill the map according to the filtered data
            

    var svg=d3.selectAll("#svgid");
    svg.selectAll(".district").style("fill","none");
    var id=fillData.map(function (m){                   
            return "#p"+m.properties.ORG_CODE;        
        })        
        for(var l=0;l<=id.length;l++)
        {
            svg.select(id[l]).data(fillData).style("fill","red");
        }
        
}


function mapFill1(fillData){
    
    console.log(fillData);
    var svg=d3.selectAll("#svgID");
    svg.selectAll(".district").style("fill","none");
    var id=fillData.map(function (m){                   
        return "#p"+m.properties.ORG_CODE;        
    })        
    for(var l=0;l<=id.length;l++)
    {
        svg.select(id[l]).data(fillData).style("fill","red");
    }
        
}


function draw(seletedData) {
    
    var width = 700;
        var height = 580;
        var svg = d3.select("#map1").append("svg").attr("width", width).attr("height", height).attr("id", "mapps");     //creating an svg
        var g = svg.append("g");
        var projection1 = d3.geoConicConformal().scale(10000).parallels([41 + 17 / 60, 41 + 29 / 60]).rotate([70 + 30 / 60, 0]).translate([500, 320]).center([0, 41.313]);    //setting the propertiesof map
        var geoPath1 = d3.geoPath().projection(projection1);
    g.selectAll("path")
.data(seletedData)    
.enter()
.append("path")
.attr("fill", "#ff221039")
.attr("stroke", "#000000")
.attr("opacity", "0.8")
.attr("d", geoPath1);
    // svg.exit().remove();
}

function createDropdown(mapData, divId) {

}


var slider;
function createSlider(divId) {    
     slider = document.querySelector(divId);
    noUiSlider.create(slider, {
        //// Handles start at ...
        start: [-1, 12],

        range: { 'min': [-1],
            'max': [12]},

        // Display colored bars between handles
        connect: true,

        step: 1,

        // Show a scale with the slider

        pips: {
            mode: 'steps',
            density: 2000,
            stepped: true,
            filter: d => 1,
            format: {
                to: d => d === -1 ? "PK" : (d === 0 ? "K" : d),
                from: d => d === -1 ? "PK" : (d === 0 ? "K" : d)
            }
        }
    });

    var arr=[];
    var value=[];
        slider.noUiSlider.on('update', function(values, handle) {
            sliderOrigin=parseInt(slider.noUiSlider.get()[0]);
            sliderEnd = parseInt(slider.noUiSlider.get()[1]);
            seletedData=filterdata(data,sliderOrigin,sliderEnd);                 
            mapFill(seletedData);        
        });
    return value;

}
function getValue(){
    
    var value=[];
      slider.noUiSlider.on('update', function(values, handle) {
        value=(parseInt(values[handle]));
    });
    return value;
}


function createHistogram(spendingData, mappDataa,divId) {    
        var sd;    
    sd = spendingData.filter(function (t)            
    {           
        if(t.TTPP!="")
        {
            return t.TTPP;                        
        }
    });

    var histid;

    var width=500;
    var height=480;    

    if(divId=="#histogram1"){


        var canvas = d3.select("#histogram1").append("svg").attr("width",width).attr("height",height).attr("id","mapUpdate1").attr("transform","translate(50,-80)");

        //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }



    else{
        var canvas = d3.select("#histogram").append("svg").attr("width",width).attr("height",height).attr("id","mapUpdate");
    }

    
//    var canvas = d3.select("#histogram1").append("svg").attr("width",width).attr("height",height).attr("id","mapUpdate1");
    var ret = sd.map(function(s){
        return parseInt(s.TTPP);
    })
    
    var sorted=[];
    sorted=ret.sort();
    var margin = {top: 10, right: 30, bottom: 50, left: 30};
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    
     g = canvas.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x= d3.scaleLinear().domain([11000,37000]).rangeRound([0,width]);
    var y = d3.scaleLinear().domain([0,60]).rangeRound([height,0]);
    var t = x.ticks();

    histogram = d3.histogram().domain(x.domain()).thresholds(x.ticks(20))(ret); 
    console.log("Histogram value is",histogram);
    
    x0=histogram.map(function (t){
      return  t.x0;
    
    });

    x1=histogram.map(function (t){
    
        return t.x1;
    });
    
    



    color="red";

    var bars = g.selectAll(".bar").data(histogram).enter()
    if(divId=="#histogram1"){    
        bars.append("rect").attr("x",function(d){
            return x(d.x0)})
           .attr("y",function(d,i){
               return y(d.length)})
           .attr("width",function(d){
               if(x(d.x1)-x(d.x0) ==0 ){
                   return 0;
               }
               else{
                   return x(d.x1)-x(d.x0)-1
               }        
           })
           .attr("height",function(d){
               return (height-y(d.length));
           })
           .attr("fill","black")
            .attr("id",function(d){
                return "b"+d.x0;
            })
       .on("mouseover", function(d) {
        
           d3.select(this)
           .attr("fill", "red");     
           lowerlimit =d.x0;
           upperlimit=d.x1;            
           createLinked(mappDataa, spendingData, '#linked-highlighting');
       })
           .on("mouseout", function(d, i) {
               d3.select(this)
               .attr("fill", "black");
           });
    
    }

    else{
        bars.append("rect").attr("x",function(d){
            return x(d.x0)})
            
        .attr("y",function(d,i){
            return y(d.length)})
        .attr("width",function(d){
            if(x(d.x1)-x(d.x0) ==0 ){
                return 0;
            }


            else{
                return x(d.x1)-x(d.x0)-1
            }

        
        })
        .attr("height",function(d){
            return (height-y(d.length));
        })
        .attr("fill","black")
        
    

    }

    var ticks = x.ticks();
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height+2) + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.format(".2s"))
            );
}



function createLinked(mapData, spendingData, divIdlinked) {

    var features = mapData.features;    


    fd = mapData.features.filter(function (t)         
    {
        


        if(t.properties.TTPP>=lowerlimit && t.properties.TTPP<=upperlimit)
                {
                    
                    return  t.properties;
                }
        



                
    });
        
    mapFill1(fd);
    








    //here
    
    //for(var j = 0; j < features.length; j++){

    //    //if(mapData.features[j].properties.TTPP!=''){

    //    //    console.log(j,"Mapdata in createlinked",mapData.features[j].properties.TTPP);
    //    //}
        

      
        
    //    if(mapData.features[j].properties.TTPP>=lowerlimit && mapData.features[j].properties.TTPP<=upperlimit)
    //    {
    //        console.log(mapData.features[j].properties.TTPP,"Should be less than",lowerlimit,"greater than",upperlimit);
    //        console.log(j,"got the dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //        //mapFill1(mapData.features[j].properties.TTPP);

    //    }
        
    //}


    //to here
    


    d3.select(divIdlinked).append('div')
        .attr("id", divIdlinked.substring(1) + '-map');
    d3.select(divIdlinked).append('div')
        .attr("id", divIdlinked.substring(1) + '-hist');

}


function filterdata(data,sliderOrigin,sliderEnd){
    filtereddata = mapData1.features.filter(function (t)             //Filtering the data having DISTRICT = local school
    {
        if(t.properties.STARTGRADE=='PK')               // Replacing all the PK with -1 and K with 0 in the data
        {
            t.properties.STARTGRADE=-1;
        }
        if(t.properties.STARTGRADE=='K')
        {
            t.properties.STARTGRADE=0;
        }
        if(t.properties.ENDGRADE=='PK')
        {
            t.properties.ENDGRADE=-1;
        }
        if(t.properties.ENDGRADE=='K')
        {
            t.properties.ENDGRADE=0;
        }                    
        var svg=d3.selectAll("#svgid");
        svg.selectAll(".district").style("fill","none");     
        if(t.properties.MADISTTYPE==data && t.properties.STARTGRADE>=sliderOrigin && t.properties.ENDGRADE<=sliderEnd){                        
            return "p"+t.properties.ORG_CODE;  
        }        
    });        
    return filtereddata;
}

var org=[];

function createVis(errors, mapData, spendingData)
{
    
    var features = mapData.features;    
    for (var i = 0; i < spendingData.length; i++)
    {
        var spend_district = spendingData[i].District; // districts of spending data

        var ttpp = spendingData[i].TTPP;
        for (var j = 0; j < features.length; j++)
        {
                
            var map_district = features[j].properties.DISTRICT;    // districts of mapdata
    
                
            if (map_district == spend_district)
            {
                console.log("Mapping data");
                features[j].properties.TTPP = ttpp;                   
                              
            }

        }


    }            
    
    
    mapData1=mapData;
    createSlider('#grade-level');
    createDropdown('#district-type');
    var mp = [];
    mp = mapData;

    // Filtering the data
    
    RegionalData = mapData.features.filter(function (m)    
    {
        return m.properties.MADISTTYPE == "Regional Academic";
    });

    
    county_agri = mapData.features.filter(function (m)    
    {
        
        return m.properties.MADISTTYPE == "County Agricultural";
    });        
    
    Reg_voc = mapData.features.filter(function (r)   
    {
        return r.properties.MADISTTYPE == "Regional Vocational Technical";
    });
    

   
    indep_pub = mapData.features.filter(function (r)    
    {
        return r.properties.MADISTTYPE == "Independent Public";
    });
    
    indep_voc = mapData.features.filter(function (r)    
    {
        return r.properties.MADISTTYPE == "Independent Vocational";
    });
    
    

    chart_comm = mapData.features.filter(function (r)   
    {
        return r.properties.MADISTTYPE == "Charter - Commonwealth";
    });
    
    
    chart_horace = mapData.features.filter(function (r)    
    {
        return r.properties.MADISTTYPE == "Charter - Horace Mann";
    });
    
    
    createMap(mapData, "#district-map");


    // On change or on selection of option from the drop down

    $('select[name="selection"]').change(function () {
        if ($(this).val() == "All")       
        { 
            mapFill(mapData.features);
        }

        if ($(this).val() == "regionalVT")       // If regional Vocational technical is selected
        {            
            data = "Regional Vocational Technical";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);              // Filtering the data
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data
        }
        if ($(this).val() == "CountyAgri")       // If County Agricultural is selected
        {            
            data = "County Agricultural";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);              // Filtering the data   
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data

        }

        if ($(this).val() == "IndepPub")       // If Independent Public is selected
        {          
            data = "Independent Public";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);                 // Filtering the data
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data

        }
        if ($(this).val() == "IndepVoc")       // If Independent Vocational is selected
        {         
            data = "Independent Vocational";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);                 // Filtering the data
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data

        }

        if ($(this).val() == "localSchool")        // If Local School is selected
        {                        
            data="Local School";
            seletedData=filterdata("Local School",sliderOrigin,sliderEnd);              // Filtering the data
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data
            
        }
        if ($(this).val() == "regAcademic")     // If Regional Academic is selected
        {
            
            data="Regional Academic";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);                 // Filtering the data
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data

        }

        if ($(this).val() == "CharterComm")        // If Charter - Commonwealth is selected
        {
            
            data = "Charter - Commonwealth";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);                 // Filtering the data
            mapFill(seletedData);       // Passing the filtered data to mapFill function to fill the map according to the filtered data

        }
        if ($(this).val() == "CharteHorace")      // If Charter - Horace Mann is selected
        {                        
            data = "Charter - Horace Mann";
            seletedData=filterdata(data,sliderOrigin,sliderEnd);                 // Filtering the data
            mapFill(seletedData);           // Passing the filtered data to mapFill function to fill the map according to the filtered data 
        }

    })
    
    createMap(mapData, '#linked-highlighting' + '-map');
    createHistogram(spendingData,mapData,'#histogram');
    createHistogram(spendingData,mapData,'#histogram1');

}

d3.queue().defer(d3.json, "https://cdn.rawgit.com/dakoop/e3d0b2100c6b6774554dddb0947f2b67/raw/b88ded9fbc37a4e13e7f94d58a79efe2074c8c8a/ma-school-districts-100.geojson")
    // use this version if the 100m version is too slow
    //.defer(d3.json, "https://cdn.rawgit.com/dakoop/e3d0b2100c6b6774554dddb0947f2b67/raw/b88ded9fbc37a4e13e7f94d58a79efe2074c8c8a/ma-school-districts-500.geojson")
    .defer(d3.csv, "https://gist.githubusercontent.com/dakoop/e3d0b2100c6b6774554dddb0947f2b67/raw/b88ded9fbc37a4e13e7f94d58a79efe2074c8c8a/ma-school-funding.csv")
    .await(createVis);



