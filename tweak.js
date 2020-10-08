let places=[];
// let places=["Sea Beach", "Cox's Bazar", 5, "beach.jpg",
// "Sundarban", "Khulna", 4, "tiger.jpg",
// "Hill View", "Khagrachori", 5, "hill.jpg"];
let rowString="50px";
let deletebtn,updatebtn;
let gridShown       =  false;
let gridContainer   =  document.querySelector('.grid-container')
let name            =  document.querySelector('input.name');
let address         =  document.querySelector('input.address');
let rating          =  document.querySelector('input.rating');
let picture         =  document.querySelector('input.picture');
let submit          =  document.querySelector('button.submit');
let update          =  false;
let fromObject      =  {};
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
    if( document.querySelector('a.gotoformpage') === event.target ){
        event.preventDefault();
    }
    let grid=document.querySelector('.list-view');
    let formbox=document.querySelector('.formbox');
    grid.style.visibility='hidden';
    grid.style.display='none';
    formbox.style.visibility='visible';
    formbox.style.display='block';
    gridShown=false;
}
function removeElementFromArray(item)
{

    for(let i=0;i<places.length;i++)
    {
        if(places[i].name===item)
        {
            places.splice(i,1);
        }
    }
    // let startIndex= places.indexOf(item);
    // places.splice(startIndex,startIndex+4);
    // console.log(startIndex,item);
}
function getDataFromGrid(event)
{
    let listOfClass=event.target.classList;
    let data=[];
    let id=1;
    console.log(listOfClass[id]);
    console.log(`details-name, ${listOfClass[id]}`);
    console.log(document.querySelector(`${listOfClass[id]}`));

    data.push( document.querySelector(`div.details-name.${listOfClass[id]}`).textContent );
    data.push( document.querySelector(`div.details-address.${listOfClass[id]}`).textContent );
    data.push( document.querySelector(`div.details-rating.${listOfClass[id]}`).textContent );
    data.push( document.querySelector(`img.${listOfClass[id]}`).src );

    return data;

}
function removeFromGrid(event)
{
    let button=event.target;
    let count=4;
    while(count--)
    {
        button.parentNode.previousSibling.remove();

        if(count===1)
            removeElementFromArray(button.parentNode.previousSibling.textContent);
    }

    button.parentNode.remove();
    rowString.slice(0,-4);
    gridContainer.style.gridTemplateRows=rowString;
    makeListVisible(event);
}
function getRowOfDetails(data)
{
    for(let i=0;i<places.length;i++)
    {
        if(places[i].name===data[0] && places[i].address===data[1] && places[i].rating===data[2])
        {
            return i;
        }
    }
}
function updateInGrid(event)
{
    let button=event.target;
    makeFormVisible(event);

    update         = true;
    let data       = getDataFromGrid(event);

    // filePath       = data[3];

    // let parts      = filePath.split('/');

    //picture.value  = data[3];

    rating.value     = data[2];

    address.value    = data[1];

    name.value       = data[0];

    fromObject.name    = data[0];

    fromObject.address = data[1];

    fromObject.rating  = data[2];

    //let indexOfDetails = getRowOfDetails(data);
    //places.splice(indexOfDetails,1);

    // if(document.querySelector('button.submit').clicked === true)
    // {
    //     places.splice(indexOfDetails,1);
    // }
    //     places.splice(indexOfDetails,1);
    //     validateFormValues();
    // });

}
function addElementToParent(elementName, listOfClass, content, attribute, parent)
{
    let newElement= document.createElement(elementName);
    for(let i=0;i<listOfClass.length;i++)
    {
        newElement.classList.add(listOfClass[i]);
    }

    if(attribute.length)
    {
        newElement.setAttribute(attribute[0],attribute[1]);
    }

    newElement.textContent=content;
    parent.appendChild(newElement);
    return newElement;
}

function nameClass(str)
{
    str=str.replace(/\s/g,"");
    return str.toLowerCase();
}

function addPlacesToGrid()
{
    let rowString = '50px';
    let cnt=0;
    for(let i=0;i<places.length;i++)
    {
        cnt++;
        console.log(places[i]);
        console.log(places.length);
        gridShown           =    true;
        rowString           =    rowString + ' 4fr';

        gridContainer.style.gridTemplateRows  =  rowString;
        

        let divName         =    addElementToParent( 'div', ["details", "details-name", nameClass(places[i].name)], places[i].name, [], gridContainer );

        let divAddress      =    addElementToParent( 'div', ["details", "details-address", nameClass(places[i].name)], places[i].address, [], gridContainer );

        let divRating       =    addElementToParent( 'div', ["details", "details-rating", nameClass(places[i].name)], places[i].rating, [], gridContainer );

        let divImage        =    addElementToParent( 'div', ["details", "details-image", nameClass(places[i].name)], "", [], gridContainer );

        let imgFile         =    addElementToParent( 'img', [nameClass(places[i].name)], "", ["src",places[i].picture], divImage );

        let divAction       =    addElementToParent( 'div', ["details", "details-action", nameClass(places[i].name)], "", [], gridContainer );
        
        let deleteButton    =    addElementToParent('button', ["deletebtn", nameClass(places[i].name)], "Delete", ['type','button'], divAction );

        let updateButton    =    addElementToParent('button', ["updatebtn", nameClass(places[i].name)], "Update", ['type','button'], divAction );
        
    }
    console.log("cnt", cnt);
}

function addHeadingToGrid()
{
    let divNameHead      =    addElementToParent( 'div', ["heading", "heading-name"], 'NAME', [], gridContainer );

    let divAddressHead   =    addElementToParent( 'div', ["heading", "heading-address"], 'ADDRESS', [], gridContainer );

    let divRatingHead    =    addElementToParent( 'div', ["heading", "heading-rating"], 'RATING', [], gridContainer );

    let divImageHead     =    addElementToParent( 'div', ["heading", "heading-picture"], 'PICTURE', [], gridContainer );

    let divActionHead    =    addElementToParent( 'div', ["heading", "heading-action"], 'ACTIONS', [], gridContainer );
}

function addToGridView()
{
    while(gridContainer.childElementCount)
    {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    ///// Checking if places exist ////
    if(places.length === 0)
    {
        document.querySelector('.grid-container').style.visibility='hidden';
        document.querySelector('.grid-container').style.display='none';
        document.querySelector('.no-places').style.display='block';
        document.querySelector('.no-places').style.visibility= 'visible';
        
        return;
    }
    else
    {
        document.querySelector('.grid-container').style.visibility='visible';
        document.querySelector('.grid-container').style.display='grid';
        document.querySelector('.no-places').style.display='none';
        document.querySelector('.no-places').style.visibility='hidden';
    }

    addHeadingToGrid();

    addPlacesToGrid();
    
    // deletebtn = document.querySelectorAll('button.deletebtn');
    // updatebtn = document.querySelectorAll('button.updatebtn');
    // for(let i=0;i<deletebtn.length;i++)
    // {
    //     deletebtn[i].addEventListener('click', removeFromGrid);
    //     updatebtn[i].addEventListener('click', updateInGrid);
    // }

}

function takeActionInsideGrid(event)
{
    if(event.target.matches('button.deletebtn'))
    {
        removeFromGrid(event);
    }
    if(event.target.matches('button.updatebtn'))
    {
        updateInGrid(event);
    }
    // deletebtn = document.querySelectorAll('button.deletebtn');
    // updatebtn = document.querySelectorAll('button.updatebtn');
    // for(let i=0;i<deletebtn.length;i++)
    // {
    //     deletebtn[i].addEventListener('click', removeFromGrid);
    //     updatebtn[i].addEventListener('click', updateInGrid);
    // }

}
function replaceObjectInPlaces(placeObject)
{
    for(let i=0;i<places.length;i++)
    {
        if  (  fromObject.name    === places[i].name
            && fromObject.address === places[i].address
            && fromObject.rating  === places[i].rating ) 
        {
            places[i]=placeObject;
        }
    }
}
function validateFormValues(event)
{
    event.preventDefault();

    let imagefile= picture.value;
    let parts = imagefile.split('.');
    let extension=parts[parts.length-1].toLowerCase();

    let valid = false;

    console.log(extension);
    if(extension==="jpeg" || extension==="jpg" || extension==="png")
    {
        let placeObject = {
            name     : name.value,
            address  : address.value,
            rating   : rating.value,
            picture  : picture.files[0].name
        };
        if(update===false)
            places.push(placeObject);
        if(update===true)
            replaceObjectInPlaces(placeObject);
        update=false;
        makeListVisible(event);
    }
    else
    {
        alert("Invalid file type. please select image only");
    }

}

let gotolistpage = document.querySelector('.gotolistpage');
gotolistpage.addEventListener('click',makeListVisible);

let gotoformpage = document.querySelector('.gotoformpage');
gotoformpage.addEventListener('click',makeFormVisible);

let form = document.querySelector('#form');
form.addEventListener('submit', validateFormValues);

gridContainer.addEventListener('click', takeActionInsideGrid);

