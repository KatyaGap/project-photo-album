const form = document.querySelector('#form');
const dogList = document.querySelector('#dogList');
const container = document.querySelector('.container');

// добавление карточки
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { id } = form.dataset;
  const response = await fetch(`/albumCards/${id}`, {
    method: 'post',
    body: new FormData(form),
  });
  if (response.ok) {
    const result = await response.json();
    dogList.insertAdjacentHTML(
      'afterbegin',
      `<div id='div-${result.id}' class="card standart" >
<img src="${result.image}" class="card-img-top" alt=${result.photo_title}>
<div class="card-body">
<h5 class="card-title">${result.photo_title}</h5>
<p class="card-text">${result.description}</p>
<button data-more=${result.id} class="btn btn-primary" type="click">view more</button>
<button data-edit=${result.id} class="btn btn-primary" type="click">edit</button>
<button data-delete=${result.id} class="btn btn-primary" type="click">delete</button></div></div>`,
    );
  }
});

// удаление карточки
container?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const div = document.getElementById(`div-${id}`);
    const response = await fetch(`/card/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      div.remove();
    }
  }
});

// редактирование карточки
// отлавливаем нажатие на кнопку редактирования
container?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.edit) {
    const id = e.target.dataset.edit;
    const div = document.getElementById(`div-${id}`);
    const response = await fetch(`/card/${id}`);
    if (response.ok) {
      const result = await response.json();
      div.innerHTML = `<form id="edit" name="busForm">
<div class="mb-3">
<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="newTitle" placeholder=${result.photo_title}>
<input type="text" class="form-control" id="exampleInputPassword1" name="newDescription" placeholder=${result.description}>
</div>
<button data-update=${id} type="click" class="btn btn-primary">edit</button>
</form>`;
    }
  }
});

// добавляем новую редакцию карточки
container?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.update) {
    const id = e.target.dataset.update;
    const div = document.getElementById(`div-${id}`);
    const formEdit = document.querySelector('#edit');
    const formData = new FormData(formEdit);
    const data = Object.fromEntries(formData);
    const response = await fetch(`/card/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      div.innerHTML = `<div id='div-${result.id}' class="card standart">
<img src="${result.image}" class="card-img-top" alt=${result.photo_title}><div class="card-body">
<h5 class="card-title">${result.photo_title}</h5>
<p class="card-text">${result.description}</p>
<button data-more=${result.id} class="btn btn-primary" type="click">view more</button>
<button data-edit=${result.id} class="btn btn-primary" type="click">edit</button>
<button data-delete=${result.id} class="btn btn-primary" type="click">delete</button></div></div>`;
    }
  }
});

// view more
container?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.more) {
    const id = e.target.dataset.more;
    const div = document.getElementById(`div-${id}`);
    const image = div.querySelector('img');
    const response = await fetch(`/card/${id}`);
    if (response.ok) {
      div.classList.toggle('standart');
      image.classList.toggle('viewMore');
      div.classList.toggle('pop');
    }
  }
});
