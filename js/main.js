// ! ============= todo list ===============
// ? CRUD - create read update delete
let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");

render();

btn.addEventListener("click", () => {
  // событие на кнопку добавить
  if (inp.value === "") {
    alert("Заполните поле!");
    return;
  }
  let obj = { task: inp.value };
  setItemToStorage(obj);
  render();
  inp.value = "";
});

// Функция для создания новых тасков и отправки в localStorage
// data = []
function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task);
  localStorage.setItem("task-data", JSON.stringify(data));
}

// функция для отображения данных в браузере
function render() {
  if (!localStorage.getItem("task-data")) {
    // проверка на то, есть ли что-нибудь в localStorage, а именно наш ключ task-data
    localStorage.setItem("task-data", JSON.stringify([])); // если такого ключа нет, то создаем его и добавляем первое значение пустой массив
  }

  let newData = JSON.parse(localStorage.getItem("task-data")); // стягиваем массив с localStorage и преобразовываем в обычный формат js
  list.innerHTML = ""; // очищаем страницу
  newData.forEach((item, index) => {
    // перебираем массив и для каждого элемента создаём новый li тег с кнопками delete и edit
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = item.task;
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    li.append(btnDelete);
    li.append(btnEdit);
    list.append(li);
    btnDelete.addEventListener("click", () => {
      // событие на кнопку delete
      deleteElement(index); // вызов функции, в аргументы передаём индекс кнопки
    });
    btnEdit.addEventListener("click", () => {
      editElement(index); // вызов функции edit, в аргументы передаём индекс элемента
    });
  });
}

// Функция для удаления таска
function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

// Функция для редактирования таска
// сохраняем в переменные, элементы моадльного окна
let mainModal = document.querySelector(".main-modal");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");
let inpEdit = document.querySelector(".inp-edit");

function editElement(id) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit.setAttribute("id", id);
  inpEdit.value = data[id].task;
  console.log(data[id]);
}
