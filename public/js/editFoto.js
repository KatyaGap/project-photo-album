const {editForm} = document.forms

editForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('15151515')
  const fotoId = event.target.id;
  const formData = new FormData(editFotoButton);
  const data = Object.fromEntries(formData);

  const response = await fetch(`/student/${fotoId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const userName = document.querySelector('h3');
    userName.innerText = data.name;
  }
});
