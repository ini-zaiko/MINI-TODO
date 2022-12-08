const taskValue = document.getElementsByClassName('task_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];
const reward = document.getElementById('reward');

var taskAll = 3;
var taskNow = 0;

function done(button){
    taskNow += 1;
    button.disabled = true;
    button.setAttribute('class', 'btn');
    button.innerHTML = "完了";
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
  deleteButton.setAttribute('onclick', 'done(this)');
  deleteButton.setAttribute('class', 'btn-warning')
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