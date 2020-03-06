const MAX_COINS = 100;
const MAX_Selector_COINS = 5;
var list_Selector_Coins = localStorage.getItem('list_Selector_Coins') ? JSON.parse(localStorage.getItem('list_Selector_Coins')) : [];;
var selector_Coins=localStorage.getItem('selector_Coins') ? JSON.parse(localStorage.getItem('selector_Coins')) : 0;
var coins = localStorage.getItem('coins') ? JSON.parse(localStorage.getItem('coins')) : [];
setTimeout(printCards(), 1000);
setInterval(mainHome, 120000);
$(document).ready(function () {
    

    $(document).ajaxStart(function () { // show loader on start
        $('#wait').show();
    });
    $(document).ajaxStop(function () {// hide loader on success
        $('#wait').hide();
        printCards();
    });
    $(document).ajaxError(function () {
        $('#wait').hide();
    });
    
        

    
    $("#Home").click(function () {

        mainHome();
    });
    $("#btn_search").click(function () {

        searchFun();
    });
    $("#Live").click(function () {

        liveCoins();
    });
    $("#About").click(function () {

        aboutMe();
    });




   

});



function aboutMe() {
    $('#contact').html(`<div class="container">
    
    <!-- Heading Row -->
    <div class="row align-items-center my-5">
        <div class="col-lg-7">
            <img height="150px" class="img-fluid rounded mb-4 mb-lg-0"
                src="https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/22298_688550961273846_5089869872106788534_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_oc=AQkdKnbPYWs_fNePvhS9k-qe3OndPyIEsJJZROagdQj3bzUZv4JMSlmQvHF0tJNirA4&_nc_ht=scontent-lhr8-1.xx&oh=11c02e8f49cacea85899c61212593dcc&oe=5E804DD5"
                alt="">
        </div>
        <!-- /.col-lg-8 -->
        <div class="col-lg-5">
            <h1 class="font-weight-light">cryptonite</h1>
            <p>my name is tamer ammas and created a this small project that get coins and see all details about the coin
                !</p>
            <a class="btn btn-primary" href="#" data-toggle="modal" data-target="#myModal">Conact me !</a>
        </div>
        <!-- The Modal -->
        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">send email</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="form-group">
                            <label for="comment">Comment:</label>
                            <textarea class="form-control" rows="5" id="comment"></textarea>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">send</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>


                </div>
            </div>
        </div>
    
  </div>`);
}


function liveCoins() {
    
    var textOfCoins ='';
    var datasofCoins =[];
    var theColors = ["#B22222","#1E90FF","#228B22","#FFFF00","#BA55D3"];
    
    for (let index = 0; index < list_Selector_Coins.length; index++) {
        if(index == 0){
            textOfCoins +=  coins[list_Selector_Coins[index]].symbol +" "  ;
        }
        else{

            textOfCoins += ", " + coins[list_Selector_Coins[index]].symbol +" "  ;  
        }

        var dataofCoins = {
            type: "line",
            showInLegend: true,
            name :coins[list_Selector_Coins[index]].symbol,
            markerType: "square",
           
            color : theColors[index],
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: 0, y: coins[list_Selector_Coins[index]].usd },
                { x: 2, y: coins[list_Selector_Coins[index]].usd},
                { x: 3, y: coins[list_Selector_Coins[index]].usd},
                { x: 6, y: coins[list_Selector_Coins[index]].usd},
                { x:8, y:  coins[list_Selector_Coins[index]].usd },
                { x: 10, y: coins[list_Selector_Coins[index]].usd }
            ]
        };
        
        datasofCoins.push(dataofCoins);   
       
    }
    console.log(datasofCoins);
    textOfCoins +="to USD"
    for (let index = 0; index < list_Selector_Coins.length; index++) {

        

    }
    var options = {
        animationEnabled: true,
        axisXType: "secondary", 
        theme: "light2",
        title:{
            text: textOfCoins
        },
        // axisX:{
        //     valueFormatString: "mm:ss"
        // },
        axisY: {
            title: "Coins Value",
            suffix: " USD",
            minimum: 0
        },
        toolTip:{
            shared:true
        },  
        legend:{
            cursor:"pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: datasofCoins
      
    };
    $("#contact").CanvasJSChart(options);
    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}
function mainHome() {
    $('#contact').html('');
    list_Selector_Coins =[];
    selector_Coins =0;
    var data = getData();
    console.log(data);

    //https://api.coingecko.com/api/v3/coins/list
}


function getData() {



    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            "name": name
        },
        url: "https://api.coingecko.com/api/v3/coins/list",
        success: function (data) {

            for (let i = 0; i < MAX_COINS; i++) {

                $.ajax({
                    type: "GET",
                    dataType: "json",
                    data: {
                        "name": name
                    },
                    url: `https://api.coingecko.com/api/v3/coins/${data[i].id}`,

                    success: function (dataForSpetialCoin) {
                        var coin = {
                            index: i,
                            symbol: data[i].symbol,
                            name: data[i].id,
                            img: dataForSpetialCoin.image.thumb,
                            usd: dataForSpetialCoin.market_data.current_price.usd,
                            ero: dataForSpetialCoin.market_data.current_price.eur,
                            ils: dataForSpetialCoin.market_data.current_price.ils
                        };
                        
                        coins.push(coin);




                    }
                });



            }
           


        }
    });

    

}

function printCards() {
    localStorage.setItem('coins', JSON.stringify(coins));
    for (let index = 0; index < coins.length; index++) {
        var clecked ='';
        if(list_Selector_Coins.includes(index)){
           clecked = 'checked' 
        }


        $('#contact').append(
            `<div class="card Column"  style="width: 18rem;">
    <div class="card-body">
    <div class="Row">
        <h5 class="card-title Column">${coins[index].symbol}</h5>
        <div class="switch_box box_1 Column">
            <input id="${index}" name="chk[]" onClick=clickCheckBox(${index}) type="checkbox" class="switch_1" ${clecked}>
        </div>
    </div>
    
    <p class="card-text">${coins[index].name}</p>
    <button type="button" class="btn btn-primary btnmoreinfo" data-toggle="collapse" data-target="#demo${index}">
        <span class="glyphicon glyphicon-collapse-down"></span> More info
    </button>
    <div id="demo${index}" class="collapse multi-collapse">
        <img src="${coins[index].img}" alt="Smiley face" height="42" width="42">
        <h6>in dollar : ${coins[index].usd} $</h6>
        <h6>in euro : ${coins[index].ero} €</h6>
        <h6>in shekel : ${coins[index].ils} ₪ </h6>
    
    </div>
    </div>
    </div>`
        );


    }
}

function showMoadul(){
    $('#module').empty();
    var selected_html = ' ';
    for (let index = 0; index < list_Selector_Coins.length; index++) {
        selected_html += `<div class="Row"><h5 class="card-title Column">${coins[list_Selector_Coins[index]].symbol}</h5>
        <div class="switch_box box_1 Column">
            <input id="${list_Selector_Coins[index]}" name="chk[]" onClick=clickCheckBox(${list_Selector_Coins[index]}) type="checkbox" class="switch_1" checked>
            </div></div>`
        
    }
    $('#module').append(
        ` <!-- The Modal -->
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
            
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">close to get</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body">
                
                  ${selected_html}
                
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button id ="btn_close "type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
              
            </div>
          </div>
        </div>`
    );
    $("#myModal").modal();
    $('#module').append(' ');
}

function clickCheckBox(id)
{
    var isClicked=false;
    var tempIndex;
    for(let index = 0; index < selector_Coins;index++)
    {
        if(list_Selector_Coins[index]==id)
        {
            isClicked=true;
            tempIndex=index;
        }
    }
    
    if(isClicked==true)
    {
        
        document.getElementById(id).checked=false;

        list_Selector_Coins.splice(tempIndex, 1);
        localStorage.setItem('list_Selector_Coins', JSON.stringify(list_Selector_Coins));
        selector_Coins--;        
        localStorage.setItem('selector_Coins', JSON.stringify(selector_Coins));
    }
    else
    {
         if(selector_Coins < MAX_Selector_COINS)
         {
            list_Selector_Coins[selector_Coins]=id;
            localStorage.setItem('list_Selector_Coins', JSON.stringify(list_Selector_Coins));
            document.getElementById(id).checked=true;             
            selector_Coins++;
            localStorage.setItem('selector_Coins', JSON.stringify(selector_Coins));
         }  
         else
         {
            document.getElementById(id).checked=false;
    
            showMoadul();
         }  
    }
}
function searchFun(){
    var searchCoin = document.getElementById("input_search").value;
    var ifIncluded;
    var isClick =' ' ;
    for (let index = 0; index < coins.length; index++) {
        if(searchCoin === coins[index].symbol){
            list_Selector_Coins.sort();
            ifIncluded = list_Selector_Coins.includes(index);
            console.log(ifIncluded);
            console.log(list_Selector_Coins);
            console.log(coins[index].index);
            if(ifIncluded){
                isClick = 'checked';
            }
           
            $('#contact').empty();
            $('#contact').append(
                `<div class="card Column"  style="width: 18rem;">
        <div class="card-body">
        <div class="Row">
            <h5 class="card-title Column">${coins[index].symbol}</h5>
            <div class="switch_box box_1 Column">
                <input id="${index}" name="chk[]" onClick=clickCheckBox(${index}) type="checkbox" class="switch_1" ${isClick}>
            </div>
        </div>
        
        <p class="card-text">${coins[index].name}</p>
        <button type="button" class="btn btn-primary btnmoreinfo" data-toggle="collapse" data-target="#demo${index}">
            <span class="glyphicon glyphicon-collapse-down"></span> More info
        </button>
        <div id="demo${index}" class="collapse multi-collapse">
            <img src="${coins[index].img}" alt="Smiley face" height="42" width="42">
            <h6>in dollar : ${coins[index].usd} $</h6>
            <h6>in euro : ${coins[index].ero} €</h6>
            <h6>in shekel : ${coins[index].ils} ₪ </h6>
        
        </div>
        </div>
        </div>`
            );
            break;
        }

        
    }

}

