let places=["Sea Beach", "Cox's Bazar", 5, "beach.jpg",
"Sundarban", "Khulna", 4, "tiger.jpg",
"Hill View", "Khagrachori", 5, "hill.jpg"];
let rowString="50px";
function makeListVisible(event)
{
    if(document.querySelector('a.gotolistpage')===event.target){
        event.preventDefault();
    }
    else if(document.querySelector('button#submit.submit')===event.target)
    {
        event.preventDefault();
    }
    let grid=document.querySelector('.list-view');
    let formbox=document.querySelector('.formbox');
    formbox.style.visibility='hidden';
    formbox.style.display='none';
    grid.style.visibility='visible';
    grid.style.display='block';
    addToGridView();
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
    while(gridContainer.childElementCount)
    {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    ///// Checking if places exist ////

    if(places.length===0)
    {
        document.querySelector('.grid-container').style.visibility='hidden';
        document.querySelector('.grid-container').style.display='none';
        
        return;
    }
    else
    {
        document.querySelector('.no-places').style.display='none';
        document.querySelector('.no-places').style.visibility='hidden';
    }

    ////// Checking part done //////
    
    ////// Adding Heading Part //////
    let divNameHead= document.createElement('div');
    divNameHead.classList.add("heading", "heading-name");
    divNameHead.textContent='NAME';
    gridContainer.appendChild(divNameHead);

    let divAddressHead= document.createElement('div');
    divAddressHead.classList.add("heading", "heading-address");
    divAddressHead.textContent='ADDRESS';
    gridContainer.appendChild(divAddressHead);

    let divRatingHead= document.createElement('div');
    divRatingHead.classList.add("heading", "heading-rating");
    divRatingHead.textContent='RATING';
    gridContainer.appendChild(divRatingHead);

    let divImageHead= document.createElement('div');
    divImageHead.classList.add("heading", "heading-picture");
    divImageHead.textContent='PICTURE';
    gridContainer.appendChild(divImageHead);

    let divActionHead= document.createElement('div');
    divActionHead.classList.add("heading", "heading-action");
    divActionHead.textContent='ACTIONS';
    gridContainer.appendChild(divActionHead);

    ////// Adding Heading Part Ended //////
    let rowString='50px';

    ///// Adding Items to Grid from Array Starts ////
    for(let i=0;i<places.length;i+=4)
    {
        rowString+=' 4fr';
        gridContainer.style.gridTemplateRows=rowString;

    
        let divName= document.createElement('div');
        divName.classList.add("details", "details-name");
        divName.textContent=places[i];
        gridContainer.appendChild(divName);

        let divAddress= document.createElement('div');
        divAddress.classList.add("details", "details-address");
        divAddress.textContent=places[i+1];
        gridContainer.appendChild(divAddress);

        let divRating= document.createElement('div');
        divRating.classList.add("details", "details-rating");
        divRating.textContent=places[i+2];
        gridContainer.appendChild(divRating);

        let divImage= document.createElement('div');
        divImage.classList.add("details", "details-image");
        gridContainer.appendChild(divImage);
        
        let imgFile= document.createElement('img');
        let path=places[i+3];
        imgFile.setAttribute("src", path);
        divImage.appendChild(imgFile);

        let divAction= document.createElement('div');
        divAction.classList.add("details", "details-action");
        gridContainer.appendChild(divAction);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add("deletebtn");
        deleteButton.textContent="Delete";
        divAction.appendChild(deleteButton);

        let updateButton = document.createElement('button');
        updateButton.classList.add("updatebtn");
        updateButton.textContent="Update";
        divAction.appendChild(updateButton);
        
    }

}
function validateFormValues(event)
{
    let imagefile= document.querySelector('input.picture').value;
    let parts = imagefile.split('.');
    let extension=parts[parts.length-1].toLowerCase();
    if(extension==="jpeg" || extension==="jpg" || extension==="png")
    {
        places.push(document.querySelector('input.name').value);
        places.push(document.querySelector('input.address').value);
        places.push(document.querySelector('input.rating').value);
        places.push(document.querySelector('input.picture').files[0].name);
        makeListVisible(event);
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