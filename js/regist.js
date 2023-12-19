var IsUserName = false;
const userNameInput = document.getElementById('userName');


if (sessionStorage.getItem('userType')) {
    alert("您已经登陆过,不需要注册");
    window.location.href = 'index.html';
}

let user = JSON.parse(localStorage.getItem('user'));
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

var IsUserCanUse = true;

userNameInput.addEventListener('blur', function () {
    IsUserCanUse = true;
    const userName = this.value;
    const regex = /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/;
    const errorLabel = this.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.querySelector('br');
    for (let i = 0; i < user.length; i++) {
        if (userName == user[i].username) {
            IsUserCanUse = false;
            break;
        }
    }

    if (!userName.match(regex)) {
        IsUserName = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '用户名格式不正确';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.appendChild(errorLabel);
        } else {
            errorLabel.textContent = '用户名格式不正确';
            this.parentNode.parentNode.querySelector('.error').innerText = "用户名格式不正确";
        }
    } else if (IsUserCanUse == false) {
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '用户名已被使用';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.appendChild(errorLabel);
        } else {
            errorLabel.textContent = '用户名已被使用';
            this.parentNode.parentNode.querySelector('.error').innerText = "用户名已被使用";
        }
    } else {
        IsUserName = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
});

var IsPassWord = false;
const passwordInput = document.getElementById('passWord');
passwordInput.addEventListener('blur', function () {
    const password = this.value;
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+]{6,20}$/;
    const errorLabel = this.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.querySelector('br');

    if (!password.match(regex)) {
        IsPassWord = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '密码格式不正确';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.appendChild(errorLabel);
        }
    } else {
        IsPassWord = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
});


var IsConfirmPassWord = false;
const confirmPassInput = document.getElementById('confirmPassWord');
confirmPassInput.addEventListener('blur', function () {
    const confirmPass = this.value;
    const password = passwordInput.value;
    const errorLabel = this.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.querySelector('br');

    if (confirmPass !== password) {
        IsConfirmPassWord = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '确认密码与密码不同！';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.appendChild(errorLabel);
        }
    } else {
        IsConfirmPassWord = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
});

const nameInput = document.getElementById('regist_name');
var IsNameInput = false;
nameInput.addEventListener('blur', function () {
    const name = this.value;
    const errorLabel = this.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.querySelector('br');

    if (name.trim() === '') {
        IsNameInput = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '姓名不能为空';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.appendChild(errorLabel);
        }
    } else {
        IsNameInput = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
});

const cardCodeInput = document.getElementById('cardCode');
var IscardCodeInput = false;
cardCodeInput.addEventListener('blur', function () {
    const cardCode = this.value;
    const errorLabel = this.parentNode.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.parentNode.querySelector('br');
    const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

    if (!idCardReg.test(cardCode)) {
        IscardCodeInput = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '身份证号不合法';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.parentNode.appendChild(errorLabel);
        }
    } else {
        IscardCodeInput = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
});

const emailInput = document.getElementById('email');
var IsEmail = false;
emailInput.addEventListener('blur', function () {
    const email = this.value;
    const errorLabel = this.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.querySelector('br');
    const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if(email){
            if (!emailReg.test(email)) {
        IsEmail = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '邮箱不合法';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.appendChild(errorLabel);
        }
    } else {
        IsEmail = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
    }

});

const mobileNoInput = document.getElementById('mobileNo');
var IsMobileInput = false;
mobileNoInput.addEventListener('blur', function () {
    const mobileNo = this.value;
    const errorLabel = this.parentNode.parentNode.parentNode.querySelector('.error');
    const lineBreak = this.parentNode.parentNode.parentNode.querySelector('br');
    const mobileNoReg = /^1[3-9]\d{9}$/;

    if (!mobileNoReg.test(mobileNo)) {
        IsMobileInput = false;
        if (!errorLabel) {
            const errorLabel = document.createElement('label');
            errorLabel.textContent = '手机号不合法';
            errorLabel.classList.add('error');
            this.parentNode.parentNode.parentNode.appendChild(document.createElement('br'));
            this.parentNode.parentNode.parentNode.appendChild(errorLabel);
        }
    } else {
        IsMobileInput = true;
        if (errorLabel) {
            errorLabel.parentNode.removeChild(errorLabel);
        }
        if (lineBreak) {
            lineBreak.parentNode.removeChild(lineBreak);
        }
    }
});

const passWordInput = document.getElementById('passWord');
passWordInput.addEventListener('input', function () {
    const passWord = this.value;
    const rankDiv = this.parentNode.nextElementSibling.querySelector('.safe-rank');

    const hasLetter = /[a-zA-Z]/.test(passWord);
    const hasNumber = /\d/.test(passWord);
    const hasUnderscore = /_/.test(passWord);

    if (hasLetter && hasNumber && hasUnderscore) {
        rankDiv.classList.remove('rank-a', 'rank-b');
        rankDiv.classList.add('rank-c');
    } else if (hasLetter && hasNumber) {
        rankDiv.classList.remove('rank-a', 'rank-c');
        rankDiv.classList.add('rank-b');
    } else {
        rankDiv.classList.remove('rank-b', 'rank-c');
        rankDiv.classList.add('rank-a');
    }

});


const nextBtn = document.getElementById('nextBtn');
const checkAgree = document.getElementById('checkAgree');
const mobileCodeSelect = document.getElementById('mobileCode');
const passengerTypeSelect = document.getElementById('passengerType');
nextBtn.addEventListener('click', function () {
    const mobileCodeValue = mobileCodeSelect.value;
    const selectedPassengerType = passengerTypeSelect.value;
    const cardTypeSelect = document.getElementById('cardType');
    const selectedCardType = cardTypeSelect.value;  
    if (!checkAgree.checked) {
        alert('请阅读并统一遵守《中国铁路客户服务中心网站服务条款》《隐私权政策》');
    } else {
        if (IsUserName && IsUserCanUse
            && IsPassWord && IsConfirmPassWord && IsNameInput
            && IscardCodeInput && IsMobileInput) {
            var data = {
                "username": userNameInput.value,
                "password": passwordInput.value,
                "idType": selectedCardType,
                "name": nameInput.value,
                "idNumber": cardCodeInput.value,
                "discountType": selectedPassengerType,
                "email": emailInput.value,
                "phoneType": mobileCodeValue,
                "phone": mobileNoInput.value,
                "userType": "user"
            }
            user.push(data);
            localStorage.setItem('user', JSON.stringify(user));
            alert("注册成功，前往登录界面");
            window.location.href = 'login.html';
        }
    }

});