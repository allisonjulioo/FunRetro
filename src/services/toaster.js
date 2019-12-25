export default {
  open: (message, type) => {
    document.querySelector('body').insertAdjacentHTML(
      'beforeend',
      `
      <div class="toast__container">
        <div class="toast toast--blue ${type} animated flipInX" >
          <div class="toast__content">
          <p>${message}</p>
        </div>
      </div>
   `
    )
    setTimeout(() => {
      document.querySelector('.toast').classList.remove('flipInX')
    }, 1000)
    setTimeout(() => {
      document.querySelector('.toast').classList.add('flipOutX')
    }, 2000)
    setTimeout(() => {
      document.querySelector('.toast__container').remove()
    }, 3000)
  }
}
