// смена темы тёмная/светлая (светлая по умолчанию)

document.getElementById("toggle-theme").addEventListener("click", function (e) {
  e.stopPropagation();
  e.preventDefault;
  document.getElementById("page").classList.toggle("dark");
});

// междонатный инпут по клику
function createNewElement() {
  if (!this.classList.contains("active-input")) {
    var txtNewInputBox = document.createElement('div');
    this.classList.remove("with-text");
    txtNewInputBox.innerHTML = "<input type='text' class='input-box' maxlength='50'>";
    txtNewInputBox.childNodes[0].value = this.innerHTML.trim();
    this.innerHTML = "";
    this.classList.add("active-input");
    this.appendChild(txtNewInputBox);
    txtNewInputBox.childNodes[0].focus();
  }
  if (!this.classList.contains("with-text")) {
    this.onkeyup = function (e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13) {
        if (e.target.value.trim() != "") {
          this.classList.remove("active-input");
          this.classList.add("with-text");
          this.innerHTML = e.target.value.trim();
        }
        else {
          this.classList.remove("active-input");
          this.innerHTML = "";
        }
      }
    }
  }
}
function firstHideSecondShow(elToHide, elToShow) {
  var elemToShow = document.getElementById(elToShow);
  var elemToHide = document.getElementById(elToHide);
  elemToHide.style.display = 'none';
  elemToShow.style.display = 'block';
}
var dynamicCommentElements = document.getElementsByClassName("donates-between-container");
var i;
for (i = 0; i < dynamicCommentElements.length; i++) {
  dynamicCommentElements[i].addEventListener("click", createNewElement);
}

// кастомный селект, тестируем

var x, i, j, l, ll, selElmnt, a, b, c, att;

/* Look for any elements with the class "custom-slct": */
x = document.getElementsByClassName("custom-slct");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];



  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  a.setAttribute("data-sort", selElmnt.options[selElmnt.selectedIndex].attributes.value.nodeValue);
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.setAttribute("data-sort", selElmnt.options[j].attributes.value.nodeValue);
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling; 
      /* показ скрытых донатов */
      if (this.dataset.sort == "hidd") {
        firstHideSecondShow("js-col_to-display", "js-col_to-hide");
      } else {
        firstHideSecondShow("js-col_to-hide", "js-col_to-display");
      }
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i; 
          h.setAttribute("data-sort", this.dataset.sort);
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("is-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "is-selected");
          break;
        } 
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelectAndInputs(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-active");
    document.body.classList.toggle("opened-filter");
  });
}

function closeAllSelectAndInputs(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, z, i, xl, yl, zl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  z = document.getElementsByClassName("active-input");
  xl = x.length;
  yl = y.length;
  zl = z.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
  // inputs close  
  if (elmnt.target != undefined) { 
    var i = zl
    while (i--) {
      if ((elmnt.target != z[i]) && (elmnt.target.offsetParent != z[i]) && (elmnt.target.offsetParent.offsetParent != z[i])) {
        if (z[i].childNodes[0].childNodes[0].value.trim() != "") {
          z[i].classList.add("with-text");
          z[i].innerHTML = z[i].childNodes[0].childNodes[0].value.trim();
          z[i].classList.remove("active-input");
        }
        else {
          z[i].innerHTML = "";
          z[i].classList.remove("active-input");
        }
      }
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelectAndInputs);