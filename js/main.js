// ! ============= todo list ===============
// ? CRUD - create read update delete

let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");

render(); // один раз вызываем функцию render(), для того чтобы отобразить данные в браузере как только зашли на сайт

btn.addEventListener("click", (e) => {
  // событие на кнопку добавить (Add task)
  if (inp.value.trim() === "") {
    // проверка на заполненность инпута
    alert("Заполните поле!");
    return; // return нужен для того чтобы код ниже не сработал
  }
  let obj = { task: inp.value }; // создаём новый объект с ключём task и со значением инпута (inp)
  setItemToStorage(obj); // вызываем функцию, которая добавляет наш новый созданный объект в хранилище localStorage c ключом task-data
  render(); // для того чтобы, все данные отобразились сразу после нажатия на кнопку Add task
  inp.value = ""; // очищает инпут
});

// Функция для создания новых тасков и отправки в localStorage
// data = []
function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task); // в массив data добавляем новый объект
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
    list.append(li); // добавляем в тег ul, новый созданный li тег
    btnDelete.addEventListener("click", () => {
      // событие на кнопку delete
      deleteElement(index); // вызов функции, в аргументы передаём индекс кнопки
    });
    btnEdit.addEventListener("click", () => {
      // событие на кнопку edit
      editElement(index); // вызов функции edit, в аргументы передаём индекс элемента
    });
  });
}

// Функция для удаления таска
function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1); // с помощью метода splice удаляем нужный элемент из массива
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
  mainModal.style.display = "block"; // для того чтобы отобразить моадльное окно, которое уже заготовлено
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit.setAttribute("id", id); // для того чтобы сохранить нужный нам индекс в аттрибут инпута в виде id
  inpEdit.value = data[id].task; // перезаписываем значение инпута на нужное нам значение из массива с localStorage
}

// Событие на кнопку save
btnSave.addEventListener("click", () => {
  if (inpEdit.value.trim() === "") {
    // проверка на заполненность поля
    alert("Заполните поле!");
    return;
  }
  let data = JSON.parse(localStorage.getItem("task-data"));
  let editTask = {
    // создаем новый объект с ключём task и со значение инпута edit
    task: inpEdit.value,
  };
  let index = inpEdit.id; // в переменную  index сохраняем индекс нашего li тега
  data.splice(index, 1, editTask);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none"; // закрываем наше модальное окно
  render(); // вызываем функцию render(), для отображения данных
});

// trim() - поиск пробелов в начале предложения. Не учитывает пробелы.

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
