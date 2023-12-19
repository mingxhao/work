var ticket;


if (sessionStorage.getItem("userType")) {
    document.getElementById("username").innerText = sessionStorage.getItem("name")
    document.getElementById("noLogin").style.display = "none";
    document.getElementById("alreadyLogin").style.display = "flex";
}

var get = init();

async function init() {
    if (!localStorage.getItem('ticket')) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                localStorage.setItem('ticket', JSON.stringify(data));
                ticket = data;
                addTicket();
            }
        };
        xhr.open('GET', './json/ticket.json', true);
        xhr.send();
    } else {
        ticket = JSON.parse(localStorage.getItem('ticket'));
        addTicket();
    }
}


function addTicket() {
    var table = document.getElementById('queryLeftTable');
    var strHtml = '';
    for (var i = 0; i < ticket.length; i++) {
        strHtml = strHtml + '<tr class="bgc">' + '<td colspan="4" width="370">' +
            '<div class="ticket-info clearfix">' + '<div class="train">' + '<div><a title="" style="height: 18px; line-height: 18px;" href="" class="number">' +
            ticket[i].trainNumber + '</a></div><span class="lookup"><span style="display:none;">查看票价</span><b title="查看票价"></b></span></div><div class="cdz"><strong title="' +
            ticket[i].departureStation + '" class="start-s">' + ticket[i].departureStation + '</strong><strong title="' + ticket[i].destinationStation + '"class="end-s">' +
            ticket[i].destinationStation + '</strong></div><div class="cds"><strong class="start-t">' + ticket[i].departureTime + '</strong><strong class="color999">' +
            ticket[i].arrivalTime + '</strong></div><div class="ls"><strong>' + ticket[i].duration + '</strong><span>当日到达</span></div></div>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].businessSeat.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].firstClassSeat.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].secondClassSeat.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].advancedSoftSleeper.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].softSleeper.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].movingSleeper.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].hardSleeper.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].softSeat.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].hardSeat.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].noSeat.quantity + '</td>' +
            '<td title="" width="46" align="center" style="cursor: pointer;" class="t-num">' + ticket[i].other.quantity + '</td>' +
            '<td align="center" width="80" class="no-br"><a class="btn72">预订</a></td></tr>'
    }
    table.innerHTML = strHtml;
}

document.getElementById('logout').addEventListener('click', function () {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('name');
    document.getElementById("noLogin").style.display = "flex";
    document.getElementById("alreadyLogin").style.display = "none";
});

var now = new Date();
var month = now.getMonth(); 
var day = now.getDate(); 
var dayOfWeek = now.getDay(); 
var daysOfWeek = ['日','一','二','三','四','五','六']
document.getElementById("data").innerHTML = "北京 --&gt; 上海（" + month + "月"+ day + "日&nbsp;&nbsp;周" + daysOfWeek[dayOfWeek] + "）";
document.getElementById('trainum').innerText = ticket.length;