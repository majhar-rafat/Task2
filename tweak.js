let deletebtn,updatebtn;
let rowString       =  "50px";
let places          =  [];
let sortedPlace     =  [];
let gridShown       =  false;
let gridContainer   =  document.querySelector('.grid-container')
let name            =  document.querySelector('input.name');
let address         =  document.querySelector('input.address');
let rating          =  document.querySelector('input.rating');
let picture         =  document.querySelector('input.picture');
let submit          =  document.querySelector('button.submit');
let update          =  false;
let fromObject      =  {};
let searchedName    =  "";
let sortedby        =  "none";

function dummyData()
{
    places.push({
        name:"Sundarban",
        address: "Khulna",
        rating: "5",
        picture: "tiger.jpg"
    });

    places.push({
        name:"Hill View",
        address: "Khagrachari",
        rating: "2",
        picture: "hill.jpg"
    });

}
function resetToDefault()
{
    name.value       =  "" ;
    address.value    =  "" ;
    rating.value     =  "" ;
    picture.value    =  "" ;
}

function makeListVisible(event)
{
    if(document.querySelector('a.gotolistpage')===event.target){
        event.preventDefault();
    }
    else if(document.querySelector('button#submit.submit')===event.target){
        event.preventDefault();
    }
    else if(document.querySelector('input.searched-name')===event.target){
        searchedName                 =   event.target.value;
    }

    let grid                         =   document.querySelector('.list-view');
    let formbox                      =   document.querySelector('.formbox');

    formbox.style.visibility         =   'hidden';
    formbox.style.display            =   'none';
    grid.style.visibility            =   'visible';
    grid.style.display               =   'block';
    addToGridView(event);
}

function makeFormVisible(event)
{
    if( document.querySelector('a.gotoformpage') === event.target ){
        resetToDefault();
        event.preventDefault();
    }
    let grid                         =    document.querySelector('.list-view');
    let formbox                      =    document.querySelector('.formbox');
    grid.style.visibility            =    'hidden';
    grid.style.display               =    'none';
    formbox.style.visibility         =    'visible';
    formbox.style.display            =    'block';
    gridShown                        =    false;
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
}
function getDataFromGrid(event)
{
    let listOfClass=event.target.classList;
    let data=[];
    let id=1;

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

    update              =   true;
    let data            =   getDataFromGrid(event);

    rating.value        =   data[2];

    address.value       =   data[1];

    name.value          =   data[0];

    picture.value       =   "";

    fromObject.name     =   data[0];

    fromObject.address  =   data[1];

    fromObject.rating   =   data[2];

    makeFormVisible(event);

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

function makeTheSort()
{
    sortedPlace = [];
    for(let i=0; i<places.length; i++)
    {
        sortedPlace[i] = {};
        for(let prop in places[i])
        {
            sortedPlace[i][prop]=places[i][prop];
        }
    }
    if(sortedby==="Low to High")
        sortedPlace.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
    else if(sortedby==="High to Low")
        sortedPlace.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
}
function addPlacesToGrid(event)
{
    while(!gridContainer.lastChild.classList.contains("heading"))
    {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    if(document.querySelector('select.sorted-by') === event.target){
        sortedby            =   event.target.options[event.target.selectedIndex].text;
    }

    makeTheSort();

    let storePlaces = places;
    places          = sortedPlace;

    let rowString = '50px';
    for(let i=0;i<places.length;i++)
    {
        let placeName       =    places[i].name.toLowerCase();
        if(!placeName.includes(searchedName.toLowerCase()))
            continue;
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

    places = storePlaces;
}

function addHeadingToGrid()
{
    let divNameHead      =    addElementToParent( 'div', ["heading", "heading-name"], 'NAME', [], gridContainer );

    let divAddressHead   =    addElementToParent( 'div', ["heading", "heading-address"], 'ADDRESS', [], gridContainer );

    let divRatingHead    =    addElementToParent( 'div', ["heading", "heading-rating"], 'RATING', [], gridContainer );

    let divImageHead     =    addElementToParent( 'div', ["heading", "heading-picture"], 'PICTURE', [], gridContainer );

    let divActionHead    =    addElementToParent( 'div', ["heading", "heading-action"], 'ACTIONS', [], gridContainer );

    let selectHead       =    addElementToParent( 'select', ["sorted-by"], "", [], divRatingHead );

    let selectValues     =    ['None', 'Low to High', 'High to Low'];

    for( let i=0; i<selectValues.length ; i++ )
    {
        let selectOptions      =    addElementToParent( 'option', [], selectValues[i], ['value', selectValues[i]], selectHead );
    }
}

function placesExistVisibilityToggle(gridVisibility, gridDisplay, headDisplay, headVisibility, searchVisibility)
{
    document.querySelector('.grid-container').style.visibility  =  gridVisibility;
    document.querySelector('.grid-container').style.display     =  gridDisplay;
    document.querySelector('.no-places').style.display          =  headDisplay;
    document.querySelector('.no-places').style.visibility       =  headVisibility;
    document.querySelector('.searched-name').style.visibility   =  searchVisibility;
}

function addToGridView(event)
{
    while(gridContainer.childElementCount)
    {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    if(places.length === 0)
    {
        placesExistVisibilityToggle('hidden','none','block','visible','hidden');
        return;
    }
    else
    {
        placesExistVisibilityToggle('visible','grid','none','hidden','visible');
    }

    addHeadingToGrid();

    addPlacesToGrid(event);
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
}

function listenToGridInput(event)
{
    if(event.target.matches('select.sorted-by'))
    {
        addPlacesToGrid(event);
    }
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

dummyData();

let gotolistpage = document.querySelector('.gotolistpage');
gotolistpage.addEventListener('click',makeListVisible);

let gotoformpage = document.querySelector('.gotoformpage');
gotoformpage.addEventListener('click',makeFormVisible);

let form = document.querySelector('#form');
form.addEventListener('submit', validateFormValues);

gridContainer.addEventListener('click', takeActionInsideGrid);

let inputSearch = document.querySelector('input.searched-name');
inputSearch.addEventListener('input',makeListVisible);

gridContainer.addEventListener('input', listenToGridInput);