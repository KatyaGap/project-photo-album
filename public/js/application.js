const { photoBut } = document.forms;

const formFoto = document.querySelector("#formFoto");
const userForm = document.querySelector("#userForm");
const ul = document.getElementById("ul");
const div = document.getElementById("update");
const mainDiv = document.querySelector('.main');
console.log(mainDiv)


// добавление нового альбома
userForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(userForm);
  const data = Object.fromEntries(formData);
  const response = await fetch("/userForm", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    ul.insertAdjacentHTML(
      "beforeend",
      `<li id="li-${result.id}" class="list-group-item">
      <a href="/user/album">${result.title}</a>
      <button data-edit=${result.id} class="btn btn-primary" type="click">edit title</button>
      <button data-delete=${result.id} class="btn btn-primary" type="click">delete</button>
    </li>`
    );
  }
});


ul?.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const li = document.getElementById(`li-${id}`);
    const response = await fetch(`/album/${id}`, {
      method: "delete",
    });
    if (response.ok) {
      console.log(response);
      li.remove();
    }
  }
});

// редактирование названия альбома
// отлавливаем нажатие на кнопку редактирования
ul?.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.dataset.edit) {
    const id = e.target.dataset.edit;
    console.log("click edit");
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
div?.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.dataset.update) {
    const id = e.target.dataset.update;
    const li = document.getElementById(`li-${id}`);
    const formEdit = document.querySelector("#editForm");
    const formData = new FormData(formEdit);
    const data = Object.fromEntries(formData);
    const response = await fetch(`/album/${id}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      li.innerHTML = `<li id="li-${id}" class="list-group-item">
          <a href="/user:id/album:id">${result.title}</a>
          <button data-edit=${id} class="btn btn-primary" type="click">Edit title</button>
          <button data-delete=${id} class="btn btn-primary" type="click">delete</button>
        </li>`;
    }
  }
});

// клики на ссылки
ul?.addEventListener("click", async (e) => {
  if (e.target.dataset.href) {
    const id = e.target.dataset.href;
    const a = document.getElementById(`a-${id}`);
    const response = await fetch(`/album/${id}`)
    if (response.ok) {
      console.log(response);
      window.location.href = `/albumCards/${id}`;
    }
  }
});
