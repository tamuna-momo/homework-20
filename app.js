const userModalId = '#user-form-modal';
function modal(modalId){
    const modalWrapper = document.querySelector(modalId);
    const modalContent = modalWrapper.querySelector('.modal-content');
    const closeBtn= modalContent.querySelector('.close');

    modalWrapper.style.display='block';

    modalContent.addEventListener('click', e => {
        e.stopPropagation();
      });
      modalWrapper.addEventListener('click', e => {
        modalWrapper.style.display = 'none';
      });
     closeBtn.addEventListener('click', e => {
     modalWrapper.style.display='none';
})
closeBtn.addEventListener('click', e => {
    modalWrapper.style.display = 'none';
});
function close(){
    modalWrapper.style.display = 'none';
  }

  return {
    close
  }
}

const modalButtons= document.querySelectorAll('[data-modal-target]');

modalButtons.forEach((btn) => {
    btn.addEventListener('click', e =>{
        console.log(e.target.dataset.modalTarget);
           modal(e.target.dataset.modalTarget);
    })

})
console.log(modalButtons);

// 1.
function getUsers(){
    fetch('http://api.kesho.me/v1/user-test/index')
    .then(resp => {
     return resp.json();
    })
    .then(data=>{
        console.log(data);
    }). catch(error=>{
        console.log(error);
    })
        
}
getUsers();


