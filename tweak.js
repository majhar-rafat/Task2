function makelistvisible(event)
{
    if(document.querySelector('a.gotolistpage')===event.target){
        event.preventDefault();
    }
    let grid=document.querySelector('.list-view');
    let formbox=document.querySelector('.formbox');
    formbox.style.visibility='hidden';
    formbox.style.display='none';
    grid.style.visibility='visible';
    grid.style.display='block';
}
function makeformvisible(event)
{
    if(document.querySelector('a.gotoformpage')===event.target){
        event.preventDefault();
    }
    let grid=document.querySelector('.list-view');
    let formbox=document.querySelector('.formbox');
    grid.style.visibility='hidden';
    grid.style.display='none';
    formbox.style.visibility='visible';
    formbox.style.display='block';
}
let gotolistpage = document.querySelector('.gotolistpage');
gotolistpage.addEventListener('click',makelistvisible);

let gotoformpage = document.querySelector('.gotoformpage');
gotoformpage.addEventListener('click',makeformvisible);