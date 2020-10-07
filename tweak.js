let places=[];
function makeListVisible(event)
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
function makeFormVisible(event)
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
function addToGridView()
{
    let gridContainer = document.querySelector('.grid-container');
    gridContainer.style.gridTemplateRows+=' 4fr';

    let divName= document.createElement('div');
    divName.classList.add("details", "details-name");
    divName.textContent=document.querySelector('input.name').value;
    gridContainer.appendChild(divName);

    let divAddress= document.createElement('div');
    divAddress.classList.add("details", "details-address");
    divAddress.textContent=document.querySelector('input.address').value;
    gridContainer.appendChild(divAddress);

    let divRating= document.createElement('div');
    divRating.classList.add("details", "details-rating");
    divRating.textContent=document.querySelector('input.rating').value;
    gridContainer.appendChild(divRating);

    let divImage= document.createElement('div');
    divImage.classList.add("details", "details-name");
    divImage.textContent=document.querySelector('input.picture').value;
    gridContainer.appendChild(divImage);
    
    let imgFile= document.createElement('img');
    let path=document.querySelector('input.picture').value;
    imgFile.setAttribute("src", path);
    divImage.appendChild(imgFile);

    makeListVisible;
}
function validateFormValues(event)
{
    let imagefile= document.querySelector('input.picture').value;
    let parts = imagefile.split('.');
    let extension=parts[parts.length-1].toLowerCase();
    if(extension==="jpeg" || extension==="jpg" || extension==="png")
    {
        addToGridView();
    }
    else
    {
        alert("Invalid file type. please select image only");
        event.preventDefault();
    }

}
let gotolistpage = document.querySelector('.gotolistpage');
gotolistpage.addEventListener('click',makeListVisible);

let gotoformpage = document.querySelector('.gotoformpage');
gotoformpage.addEventListener('click',makeFormVisible);

let submitbtn = document.querySelector('button.submit');
submitbtn.addEventListener('click', validateFormValues);