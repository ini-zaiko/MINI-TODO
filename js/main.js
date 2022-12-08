const taskValue = document.getElementsByClassName('task_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];
const reward = document.getElementById('reward');

const taskAllCon = 3;
const taskNowCon = 0;
const compMissionCon = [];

var COOKIES = COOKIES || {
    /*
     指定したcookieの値を取得して返す関数
     第1引数=取得したいcookiename
    */
    getCookie: function(cName) {
        var cookie_name = cName;
        if(cookie_name == '' || cookie_name == null) {
            console.log('COOKIES.getCookie：引数に値を代入してください。');
        } else {
            var set_replace = '(?:(?:^|.*\s*)' + cookie_name + '\s*\=\s*([^;]*).*$)|^.*$';
            var cookie_value = document.cookie.replace(new RegExp(set_replace), '$1');
            return cookie_value;
        }
    },
    /*
     指定したcookieを追加する関数
     第1引数=追加するcookiename;第2引数=追加するcookievalue;第3引数=cookieの有効期限はカットしたので固定で日付変更（朝9時）まで
    */
    setCookie: function(cName, cValue) {
        var cookie_name = cName;
        var cookie_Value = cValue;
        var cookie_domain = location.hostname;
        var date = new Date();
        var now = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        if(cookie_name == '' || cookie_name == null) {
            console.log('COOKIES.setCookie：第1引数に値を代入してください。')
        } else {
            console.log('lets set:' + now);
            document.cookie = cookie_name + '=' + cookie_Value + ';domain=' + cookie_domain + ';expires=' + now;
        }
    },
    /*
     指定したcookieの値を削除する関数
     第1引数=削除したいcookiename
    */
    deleteCookie: function(cName) {
        var cookie_name = cName;
        if(cookie_name == '' || cookie_name == null) {
            console.log('COOKIES.deleteCookie：引数に値を代入してください。');
        } else {
            COOKIES.setCookie(cookie_name, '');
        }
    }
};

var taskAll = COOKIES.getCookie('taskAll');
var taskNow = COOKIES.getCookie('taskNow');
var compMission = COOKIES.getCookie('compMission');

function setCookies(all, now){
    COOKIES.setCookie('taskAll', all);
    COOKIES.setCookie('taskNow', now);
}

if(taskNow == ''){
    taskAll = taskAllCon;
    taskNow = taskNowCon;
    compMission = compMissionCon;
    console.log("taslAll:" + taskAll + "; taskNow:" + taskNow + "; compMission:" + compMission);
    setCookies(taskAll, taskNow);
}

function done(button, num){
    taskNow += 1;
    button.disabled = true;
    button.setAttribute('class', 'btn-white');
    button.innerHTML = "完了";
    compMission.push(num);
    COOKIES.setCookie('taskNow', taskNow);
    COOKIES.setCookie('compMission', compMission);
    if (taskAll == taskNow) {
        reward.disabled = false;
    }
}

function rewardGet(button){
    alert("あんたは天才");
    button.disabled = true;
    button.setAttribute('class', 'btn');
    button.innerHTML = "リワードを受け取りました！";
}

if(taskAll == taskNow){
    reward.disabled = false;
    reward.setAttribute('class', 'btn');
    reward.innerHTML = "リワードを受け取りました！";
}

if(compMission != compMissionCon){
    for (const mission of compMission) {
        var button = document.getElementsByClassName('done-btn')[mission];
        button.disabled = true;
        button.setAttribute('class', 'btn-white');
        button.innerHTML = "完了";
    }
}

// 追加ボタンを作成
const addTasks = (task) => {
  // 入力したタスクを追加・表示
  taskAll += 1;
  const listItem = document.createElement('li');
  const showItem = taskList.appendChild(listItem);
  showItem.innerHTML = task;

  // タスクに削除ボタンを付与
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '挑戦';

  // 削除ボタンをクリックし、イベントを発動（タスクが削除）
  deleteButton.setAttribute('onclick', 'done(this,' + taskAll + ' )');
  deleteButton.setAttribute('class', 'done-btn btn-warning')
  listItem.appendChild(deleteButton);
};

// 削除ボタンにタスクを消す機能を付与
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);
};

// 追加ボタンをクリックし、イベントを発動（タスクが追加）
taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  addTasks(task);
  taskValue.value = '';
});