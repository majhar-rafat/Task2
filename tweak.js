$('document').ready(function () {
    let deletebtn, updatebtn;
    let rowString = "50px";
    let places = [];
    let sortedPlace = [];
    let gridShown = false;
    let name = $('input.name');
    let address = $('input.address');
    let rating = $('input.rating');
    let picture = $('input.picture');
    let submit = $('button.submit');
    let update = false;
    let fromObject = {};
    let searchedName = "";
    let sortedby = "none";
    let visibleProperty = { "visibility": "visible", "display": "block" };
    let hiddenProperty = { "visibility": "hidden", "display": "none" };
    let checker;

    function dummyData() {
        places.push({
            name: "Sundarban",
            address: "Khulna",
            rating: "5",
            picture: "tiger.jpg"
        });

        places.push({
            name: "Hill View",
            address: "Khagrachari",
            rating: "2",
            picture: "hill.jpg"
        });

    }
    function resetToDefault() {
        name.val("");
        address.val("");
        rating.val("");
        picture.val("");
        document.querySelector('canvas').getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    function makeListVisible(event) {
        if ($(event.target).is('a.gotolistpage')) {
            event.preventDefault();
        }
        else if ($(event.target).is('button#submit.submit')) {
            event.preventDefault();
        }
        else if ($(event.target).is('input.searched-name')) {
            searchedName = event.target.value;
        }
        let grid = $('.list-view');
        let formbox = $('.formbox');

        formbox.css(hiddenProperty);
        grid.css(visibleProperty);
        addToGridView(event);
    }

    function makeFormVisible(event) {
        if ($(event.target).is('a.gotoformpage')) {
            resetToDefault();
            event.preventDefault();
        }
        let grid = $('.list-view');
        let formbox = $('.formbox');
        grid.css(hiddenProperty);
        formbox.css(visibleProperty);
        gridShown = false;
    }

    function removeElementFromArray(item) {
        for (let i = 0; i < places.length; i++) {
            if (places[i].name === item) {
                places.splice(i, 1);
            }
        }
    }

    function getDataFromGrid(event) {
        let listOfClass = event.target.classList;
        let data = [];
        let id = 1;
        data.push($(`div.details-name.${listOfClass[id]}`).html());
        data.push($(`div.details-address.${listOfClass[id]}`).html());
        data.push($(`div.details-rating.${listOfClass[id]}`).html());
        data.push($(`img.${listOfClass[id]}`).attr('src'));
        return data;
    }

    function removeFromGrid(event) {
        let button = event.target;
        let count = 4;
        while (count--) {
            button.parentNode.previousSibling.remove();
            if (count === 1)
                removeElementFromArray(button.parentNode.previousSibling.textContent);
        }
        button.parentNode.remove();
        rowString.slice(0, -4);
        $('.grid-container').css("grid-template-rows", rowString);
        makeListVisible(event);
    }

    function getRowOfDetails(data) {
        for (let i = 0; i < places.length; i++) {
            if (places[i].name === data[0] && places[i].address === data[1] && places[i].rating === data[2]) {
                return i;
            }
        }
    }

    function updateInGrid(event) {
        update = true;
        let data = getDataFromGrid(event);
        rating.val(data[2]);
        address.val(data[1]);
        name.val(data[0]);
        picture.val("");
        fromObject.name = data[0];
        fromObject.address = data[1];
        fromObject.rating = data[2];
        makeFormVisible(event);

    }
    
    function addElementToParent(elementName, listOfClass, content, attribute, parent) {
        let newElement = $("<" + elementName + "></" + elementName + ">").html(content);
        newElement.addClass(listOfClass);
        if (attribute.length) {
            newElement.attr(attribute[0], attribute[1]);
        }
        parent.append(newElement);
        return newElement;
    }

    function nameClass(str) {
        str = str.replace(/\s/g, "");
        return str.toLowerCase();
    }

    function makeTheSort() {
        sortedPlace = [];
        for (let i = 0; i < places.length; i++) {
            sortedPlace[i] = {};
            for (let prop in places[i]) {
                sortedPlace[i][prop] = places[i][prop];
            }
        }
        if (sortedby === "Low to High")
            sortedPlace.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
        else if (sortedby === "High to Low")
            sortedPlace.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
    }

    function addPlacesToGrid(event) {
        while (!$('.grid-container').children().last().hasClass('heading')) {
            console.log("removed");
            $('.grid-container').children().last().remove();
        }
        if ($(event.target).is('select.sorted-by')) {
            sortedby = event.target.options[event.target.selectedIndex].text;
        }
        makeTheSort();
        let storePlaces = places;
        places = sortedPlace;
        let rowString = '50px';
        for (let i = 0; i < places.length; i++) {
            let placeName = places[i].name.toLowerCase();
            if (!placeName.includes(searchedName.toLowerCase()))
                continue;
            gridShown = true;
            rowString = rowString + ' 200px';
            $('.grid-container').css('grid-template-rows', rowString);
            let divName = addElementToParent('div', ["details", "details-name", nameClass(places[i].name)], places[i].name, [], $('.grid-container'));
            let divAddress = addElementToParent('div', ["details", "details-address", nameClass(places[i].name)], places[i].address, [], $('.grid-container'));
            let divRating = addElementToParent('div', ["details", "details-rating", nameClass(places[i].name)], places[i].rating, [], $('.grid-container'));
            let divImage = addElementToParent('div', ["details", "details-image", nameClass(places[i].name)], "", [], $('.grid-container'));
            let imgFile = addElementToParent('img', [nameClass(places[i].name)], "", ["src", places[i].picture], divImage);
            let divAction = addElementToParent('div', ["details", "details-action", nameClass(places[i].name)], "", [], $('.grid-container'));
            let deleteButton = addElementToParent('button', ["deletebtn", nameClass(places[i].name)], "Delete", ['type', 'button'], divAction);
            let updateButton = addElementToParent('button', ["updatebtn", nameClass(places[i].name)], "Update", ['type', 'button'], divAction);
        }
        places = storePlaces;
    }

    function addHeadingToGrid() {
        let divNameHead = addElementToParent('div', ["heading", "heading-name"], 'NAME', [], $('.grid-container'));
        let divAddressHead = addElementToParent('div', ["heading", "heading-address"], 'ADDRESS', [], $('.grid-container'));
        let divRatingHead = addElementToParent('div', ["heading", "heading-rating"], 'RATING', [], $('.grid-container'));
        let divImageHead = addElementToParent('div', ["heading", "heading-picture"], 'PICTURE', [], $('.grid-container'));
        let divActionHead = addElementToParent('div', ["heading", "heading-action"], 'ACTIONS', [], $('.grid-container'));
        let selectHead = addElementToParent('select', ["sorted-by"], "", [], divRatingHead);
        let selectValues = ['None', 'Low to High', 'High to Low'];
        for (let i = 0; i < selectValues.length; i++) {
            let selectOptions = addElementToParent('option', [], selectValues[i], ['value', selectValues[i]], selectHead);
        }
    }

    function placesExistVisibilityToggle(gridVisibility, gridDisplay, headDisplay, headVisibility, searchVisibility) {
        $('.grid-container').css('visibility', gridVisibility);
        $('.grid-container').css('display', gridDisplay);
        $('.no-places').css('display', headDisplay);
        $('.no-places').css('visibility', headVisibility);
        $('.searched-name').css('visibility', searchVisibility);
    }

    function addToGridView(event) {
        while ($('.grid-container').children().length > 0) {
            console.log($('.grid-container').children().first());
            $('.grid-container').children().first().remove();
        }
        console.log('grid view o aisi', places.length);
        if (places.length === 0) {
            placesExistVisibilityToggle('hidden', 'none', 'block', 'visible', 'hidden');
            return;
        }
        else {
            placesExistVisibilityToggle('visible', 'grid', 'none', 'hidden', 'visible');
        }
        addHeadingToGrid();
        addPlacesToGrid(event);
    }

    function replaceObjectInPlaces(placeObject) {
        for (let i = 0; i < places.length; i++) {
            if (fromObject.name === places[i].name
                && fromObject.address === places[i].address
                && fromObject.rating === places[i].rating) {
                places[i] = placeObject;
            }
        }
    }

    function validateFormValues(event) {
        event.preventDefault();
        let imagefile = picture.val();
        let parts = imagefile.split('.');
        let extension = parts[parts.length - 1].toLowerCase();
        let valid = false;
        if (extension === "jpeg" || extension === "jpg" || extension === "png") {
            let placeObject = {
                name: name.val(),
                address: address.val(),
                rating: rating.val(),
                picture: picture.val().split('\\').pop()
            };
            if (update === false)
                places.push(placeObject);
            if (update === true)
                replaceObjectInPlaces(placeObject);
            update = false;
            makeListVisible(event);
        }
        else {
            alert("Invalid file type. please select image only");
        }
    }

    dummyData();
    $('.gotolistpage').on('click', makeListVisible);
    $('.gotoformpage').on('click', makeFormVisible);
    $('#form').on('submit', validateFormValues);
    $('.grid-container').on('click', 'button.deletebtn', removeFromGrid);
    $('.grid-container').on('click', 'button.updatebtn', updateInGrid);
    $('input.searched-name').on('input', makeListVisible);
    $('.grid-container').on('input', 'select.sorted-by', addPlacesToGrid);
    $('button#reset').on('click',resetToDefault);
    // canvas drawing start //
    $('input.picture').on('change', function (event) {
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    });
});
