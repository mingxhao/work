var pic = document.getElementById('banner');
var picUrl = document.getElementById('banner-url');
let sw = 2;
let banner = 2;
var obj;
var chepiao = ["dancheng", "fancheng", "huancheng", "gaiqian"];
var chaxun = ["zhengwandian", "jianpiaokou", "qishoushijian", "tianqichaxun"];
var dingcan = ["yuding"];

function init() {
    document.getElementById("sw-1").style.opacity = 1;
    document.getElementById("banner-url1").style.opacity = 1;
    setInterval(autoChange, 5000);
    show("chepiao", 0);
    getTravelList();
    shownews("news");
    getnews();
    getquestion();
    getdiscredit();
    if(sessionStorage.getItem("userType")){
        document.getElementById("username").innerText = sessionStorage.getItem("name")
        document.getElementById("noLogin").style.display = "none";
        document.getElementById("alreadyLogin").style.display = "flex";
    }
}

function clear() {
    for (let i = 0; i < 6; i++) {
        obj = "sw-" + (i + 1);
        obj = document.getElementById(obj);
        obj.style.opacity = 0.6;
        obj = "banner-url" + (i + 1);
        obj = document.getElementById(obj);
        obj.style.opacity = 0;
    }
}

function changebanner(i) {
    clear();
    sw = i;
    banner = i;
    obj = "sw-" + i;
    obj = document.getElementById(obj);
    obj.style.opacity = 1;
    obj = "banner-url" + i;
    obj = document.getElementById(obj);
    obj.style.opacity = 1;
}

function autoChange() {
    clear();
    obj = "sw-" + sw;
    obj = document.getElementById(obj);
    obj.style.opacity = 1;
    obj = "banner-url" + banner;
    obj = document.getElementById(obj);
    obj.style.opacity = 1;
    sw++;
    banner++;
    if (sw == 7) {
        sw = 1;
        banner = 1;
    }
}

function clearWhat(left) {
    document.getElementById(left).className = "";
    document.getElementById(left + "item").style.display = "none";
    for (var i = 0; i < eval(left).length; i++) {
        var str = eval(left)[i];
        document.getElementById(str).className = "";
        document.getElementById(str + "item").style.display = "none";
    }
}

function show(left, id) {
    var str;
    clearWhat("chepiao");
    clearWhat("chaxun");
    clearWhat("dingcan");
    if (left == "chepiao") {
        str = chepiao[id];
    } else if (left == "chaxun") {
        str = chaxun[id];
    } else if (left == "dingcan") {
        str = dingcan[id];
    }
    document.getElementById(left).className = "active";
    document.getElementById(left + "item").style.display = "";
    document.getElementById(str).className = "active";
    document.getElementById(str + "item").style.display = "";
}

function getTravelList() {
    let url = "./json/travel.json";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            var strHtml = '';
            for (let i = 0; i < data.length; i++) {
                strHtml = strHtml + '<li><a href="' + data[i].url +
                    '">' + '<div class="travel-pic"><img src="' + data[i].img +
                    '"></div><div class="travel-info"><h3 class="travel-name">' + data[i].title +
                    '</h3><div class="txt-price"><i class="rmb">¥</i>' + data[i].price +
                    '</div></div></a></li>'
            }
        }
        document.getElementById("travelList").innerHTML = strHtml;
    }
    request.open("get", url, true);
    request.send(null);
}

function clearnews(){
    document.getElementById("news").className = "";
    document.getElementById("question").className = "";
    document.getElementById("shixin").className = "";
    document.getElementById("newsitem").style.display = "none";
    document.getElementById("questionitem").style.display = "none";
    document.getElementById("shixinitem").style.display = "none";
}

function shownews(id){
    clearnews();
    document.getElementById(id).className = "active";
    document.getElementById(id + "item").style.display = "";
}

function getnews(){
    let url = "./json/news.json";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            var strHtml = '';
            for (let i = 0; i < data.length; i++) {
                strHtml = strHtml + '<li><div><span class="d"></span><a href="' + data[i].url +
                    '" class="news-title">' + data[i].title +
                    '"</a></div><span class="news-time">' + data[i].date +
                    '</span></li>'
            }
        }
        document.getElementById("newsList").innerHTML = strHtml;
    }
    request.open("get", url, true);
    request.send(null);
}

function getquestion(){
    let url = "./json/question.json";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            var strHtml = '';
            for (let i = 0; i < data.length; i++) {
                strHtml = strHtml + '<li><div><span class="d"></span><a href="https://kyfw.12306.cn/otn/' + data[i].url +
                    '" class="news-title">' + data[i].title +
                    '</a></div></li>'
            }
        }
        document.getElementById("questionList").innerHTML = strHtml;
    }
    request.open("get", url, true);
    request.send(null);
}

function getdiscredit(){
    let url = "./json/discredit.json";
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            var strHtml = '';
            for (let i = 0; i < data.length; i++) {
                strHtml = strHtml + '<dd class="dis-item"><div><span class="d"></span><span class="person-name">' + data[i].name +
                    '</span></div><span class="person-card">' + data[i].id.slice(0,6) + "********" + data[i].id.slice(-4)
                    '</a></div></li>'
            }
        }
        document.getElementById("discreditList").innerHTML = strHtml;
    }
    request.open("get", url, true);
    request.send(null);
}

document.getElementById('logout').addEventListener('click', function() {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('name');
    document.getElementById("noLogin").style.display = "flex";
    document.getElementById("alreadyLogin").style.display = "none";
});