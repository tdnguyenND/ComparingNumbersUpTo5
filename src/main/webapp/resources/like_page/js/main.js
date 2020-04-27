let like = document.querySelector('.simple-yes')
let dislike = document.querySelector('.simple-no')
let btnNext = document.querySelector('.btn-default')
like.onclick = () =>{
    btnNext.removeAttribute('disabled')
    if(!like.classList.contains('active')){
        dislike.classList.remove('active')
        like.classList.add('active')
    }
}
dislike.onclick = () =>{
    btnNext.removeAttribute('disabled')
    if(!dislike.classList.contains('active')){
        like.classList.remove('active')
        dislike.classList.add('active')
    }
}
btnNext.addEventListener('click', next)
function next() {
    window.location = '/'
}
