filterObjects("all");

function clearFilter() {
    filterObjects("all");
}


function filterObjects(c) {
    var x, i;
    x = document.getElementsByClassName("game");
    if (c == "all") {
        c = "";
        showClearFilterButton(false); // Hide the button when "All" is selected
    } else {
        showClearFilterButton(true);
    }
    for (i = 0; i < x.length; i++) {
        if (x[i].className.indexOf(c) > -1) {
            x[i].style.display = "block";
        } else {
            x[i].style.display = "none";
        }
    }
}


function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            element.className += " " + arr2[i];
        }
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) !== -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function showClearFilterButton(show) {
    var clearFilterButton = document.querySelector('.clear-filter');
    if (show) {
        clearFilterButton.style.display = 'inline-block';
    } else {
        clearFilterButton.style.display = 'none';
    }
}