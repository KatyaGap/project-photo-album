const { photoBut } = document.forms;

const formFoto = document.querySelector('#formFoto');
const userForm = document.querySelector('#userForm');
const ul = document.getElementById('ul');
console.log(ul);
const div = document.getElementById('update');
const mainDiv = document.querySelector('.main');
const href = document.getElementById('href')
const update = document.getElementById('update')

// добавление нового альбома
userForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(userForm);
  const data = Object.fromEntries(formData);
  const response = await fetch('/userForm', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    ul.insertAdjacentHTML(
      'beforeend',
      `<li id="li-${result.id}" class="list-group-item">
			<a data-href=${result.id} id="a-${result.id}" href="">${result.title}</a>
      <button data-edit=${result.id} class="btn btn-primary" type="click">edit title</button>
      <button data-delete=${result.id} class="btn btn-primary" type="click">delete</button>
			<button data-private=${result.id} class="btn btn-primary" type="click">private</button>
    </li>`
    );
  }
});

// удаление альбома
ul?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const li = document.getElementById(`li-${id}`);
    const response = await fetch(`/album/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      console.log(response);
      li.remove();
    }
  }
});

// редактирование названия альбома
// отлавливаем нажатие на кнопку редактирования
ul?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.edit) {
    const id = e.target.dataset.edit;
    console.log('click edit');
    const li = document.getElementById(`li-${id}`);
    console.log(li);
    const response = await fetch(`/album/${id}`);
    if (response.ok) {
      const result = await response.json();
      li.innerHTML = `<form id="editForm">
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Title</label>
					<input type="text" name="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="${result.title}">
				</div>
				<button data-update=${id} id="editAlbum" type="submit" class="btn btn-primary">Edit title</button>
			</form>`;
    }
  }
});

// добавляем новый текст альбома
div?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.update) {
    const id = e.target.dataset.update;
    const li = document.getElementById(`li-${id}`);
    const formEdit = document.querySelector('#editForm');
    const formData = new FormData(formEdit);
    const data = Object.fromEntries(formData);
    const response = await fetch(`/album/${id}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      li.innerHTML = `
          <a href="/user:id/album:id">${result.title}</a>
          <button data-edit=${id} class="btn btn-primary" type="click">Edit title</button>
          <button data-delete=${id} class="btn btn-primary" type="click">delete</button>
					<button data-private={{id}} class="btn btn-primary" type="click">private</button>`;

    }
  }
});

// клики на ссылки
ul?.addEventListener('click', async (e) => {
  if (e.target.dataset.href) {
    const id = e.target.dataset.href;
    const a = document.getElementById(`a-${id}`);
    const response = await fetch(`/album/${id}`);
    if (response.ok) {
			console.log(response)
     const result = await response.json();
		 if (result.message === 200) alert('доступ ограничен');
		 else window.location.href = `/albumCards/${id}`;
    }
  }
});

// кнопка приватности
ul?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.private) {
    const id = e.target.dataset.private;
    console.log('click edit');
    const li = document.getElementById(`li-${id}`);
    const response = await fetch(`/album/${id}`);
    if (response.ok) {
      const result = await response.json();
      li.innerHTML = `<form id="privateForm">
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Add person's email</label>
					<input type="text" name="private_email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email">
				</div>
				<button data-email=${id} id="editAlbum" type="submit" class="btn btn-primary">Submit</button>
				<button data-del=${id} id="editAlbum" type="submit" class="btn btn-primary">Delete email</button>
			</form>`;
			userForm.remove();
			href.insertAdjacentHTML('afterend', `<a href="/emails/${id}">Private list</a>`);
    }
  }
});

// добавление емайл в приватный список
ul?.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('click aaaaaa');
  if (e.target.dataset.email) {
    const id = e.target.dataset.email;
    console.log('click priv email');
    const li = document.getElementById(`li-${id}`);
    const formPriv = document.querySelector('#privateForm');
    const formData = new FormData(formPriv);
    const data = Object.fromEntries(formData);
    const response = await fetch(`/private/${id}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
		window.location.href = `http://localhost:3000/user/${result.userId}`
  }
});


// удаление емайла из приватного списка
ul?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.del) {  
		console.log('click del');
    const id = e.target.dataset.del;
    const li = document.getElementById(`li-${id}`);
    const formPriv = document.querySelector('#privateForm');
    const formData = new FormData(formPriv);
    const data = Object.fromEntries(formData);
    const response = await fetch(`/private/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
		window.location.href = `http://localhost:3000/user/${result.userId}`
  }
});


// download
// ul?.addEventListener('click', async (e) => {
//   e.preventDefault();
//   if (e.target.dataset.download) {
//     const id = e.target.dataset.download;
//     console.log('click down');
//     const li = document.getElementById(`li-${id}`);
//     console.log(li);
//     const response = await fetch(`/download/${id}`);
//     if (response.ok) {
//       console.log('все ок')
//     }
//   }
// });

