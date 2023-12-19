let currentIndex = 0;
const bannerItems = document.querySelectorAll('.body ul li');
const buttons = document.querySelectorAll('.head ul li');


if (sessionStorage.getItem('userType')) {
    alert("您已经登陆过");
    window.location.href = 'index.html';
}

let user = JSON.parse(localStorage.getItem('user'));

function init() {
    setInterval(nextBanner, 3000);
    if (!user) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                user = JSON.parse(xhr.responseText);
                localStorage.setItem('user', JSON.stringify(user));
            }
        };
        xhr.open('GET', './json/user.json', true);
        xhr.send();
    }
}

function showBanner(index) {
    bannerItems.forEach(item => item.style.display = 'none');
    buttons.forEach(button => button.classList.remove('on'));
    bannerItems[index].style.display = 'block';
    buttons[index].classList.add('on');
}

function nextBanner() {
    currentIndex = (currentIndex + 1) % bannerItems.length;
    showBanner(currentIndex);
}

function prevBanner() {
    currentIndex = (currentIndex - 1 + bannerItems.length) % bannerItems.length;
    showBanner(currentIndex);
}

buttons[0].addEventListener('click', prevBanner);
buttons[1].addEventListener('click', nextBanner);


document.getElementById('login').addEventListener('click', function () {
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    if (!username.trim() || !password.trim()) {
        alert('账号或密码不为空');
    }

    let isValidUser = false;
    for (let i = 0; i < user.length; i++) {
        if (username === user[i].username && password === user[i].password) {
            isValidUser = true;
            sessionStorage.setItem('userType', user[i].userType);
            sessionStorage.setItem('name', user[i].name);
            break;
        }
    }

    if (isValidUser) {
        window.location.replace('index.html');
    } else {
        alert('用户名不存在或密码错误');
    }
});