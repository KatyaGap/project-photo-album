const { editForm } = document.forms

editForm?.addEventListener('click', async (event) => {
  event.preventDefault();

  if (event.target.dataset.edit) {

  // console.log(event.target)
    const fotoId = event.target.id;
  // console.log(fotoId)
    const formData = new FormData(editForm);
    const data = Object.fromEntries(formData);
  // console.log(data)

    const response = await fetch(`/card/${fotoId}`, {
      method: 'put',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
    // console.log('999999999999')
       const title = document.querySelector('h5');
      title.innerText = data.newTitle;
      const description = document.querySelector('p');
      description.innerText = data.newDescription;
  }
}
});

editForm?.addEventListener('click', async (event) => {
  event.preventDefault()
  if ( event.target.dataset.delete) {
    const id = event.target.dataset.delete
    console.log(id)
    const div = document.querySelector(`#div-${id}`);

    const fotoId = event.target.id
    console.log(div);
    const response = await fetch(`/card/${fotoId}`, {
      method: 'delete',
    });
  //  console.log('response', response.ok)
    if (response.ok) {
      // console.log(response)
      div.remove()
      // console.log('4554555')
      window.location = 'http://localhost:3000/card'
    }
  }
})