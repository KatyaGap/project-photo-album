
const formFoto = document.querySelector('#formFoto')
const deleteFotoButton = document.querySelector('#deleteFotoButton')


formFoto.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/card', {
    method: 'post',
    body: new FormData(formFoto),
  });
    if(response.ok) {
      window.location = 'http://localhost:3000/card'
    }
  
});

// deleteFotoButton.addEventListener('click', async (e) => {
// 	e.preventDefault();
// 	if (e.target.dataset.delete) {
// 		const id = e.target.dataset.delete;
// 		const div = document.getElementById(`div-${id}`);
// 		const response = await fetch(`/delete/${id}`, {
// 			method: 'delete',
// 		});
// 		if (response.ok) {
// 			console.log(response)
// 			div.remove();
// 		}
// 	}})

const userForm = document.querySelector('#userForm');
const ul = document.getElementById('ul');
const container = document.querySelector('#div');
// console.log(ul)

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
			console.log(result)
			ul.insertAdjacentHTML('beforeend', 
      `<li id="li-${result.id} class="list-group-item">
      <a href="/user:id/album:id">${result.title}</a>
      <button data-change=${result.id} class="change-button" type="click">change</button>
      <button data-delete=${result.id} class="delete-button" type="click">delete</button>
    </li>`)
		}
	});

	// удаление альбома
container.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const li = document.getElementById(`li-${id}`);
    const response = await fetch(`/album/${id}`, {
       method: 'delete',
    });
    if (response.ok) {
			console.log(response)
      li.remove();
    }
  }})


	// редактирование названия альбома
	// отлавливаем нажатие на кнопку редактирования
	container.addEventListener('click', async (e) => {
		e.preventDefault();
		if (e.target.dataset.edit) {
				const id = e.target.dataset.edit;
				console.log('click ed')
				const li = document.getElementById(`li-${id}`);
				const response = await fetch(`/album/${id}`);
			if (response.ok) {
				const result = await response.json();
				li.innerHTML = `<form id="editForm">
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Title</label>
					<input type="text" name="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="${result.title}">
				</div>
				<button data-update=${id} id="editAlbum" type="submit" class="btn btn-primary">Edit title</button>
			</form>`
			}
		}})

// добавляем новый текст дела
			container.addEventListener('click', async (e) => {
				e.preventDefault();
				if (e.target.dataset.update){
				const id = e.target.dataset.update;
				const li = document.getElementById(`li-${id}`);
				const formEdit = document.querySelector('#editForm')
				const formData = new FormData(formEdit);
				const data = Object.fromEntries(formData);
				const response = await fetch(`/album/${id}`, {
					method: 'post',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data),
				})
				if (response.ok) {
					const result = await response.json();
					li.innerHTML = `<li id="li-${id}" class="list-group-item">
          <a href="/user:id/album:id">${result.title}</a>
          <button data-edit=${id} class="change-button" type="click">Edit title</button>
          <button data-delete=${id} class="delete-button" type="click">delete</button>
        </li>`;
				}
			}
		})

