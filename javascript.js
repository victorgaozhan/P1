var tablinks = document.getElementsByClassName("ratelink");
var tabcontents = document.getElementsByClassName("ratecard");

var sidemenu = document.getElementById("sidemenu");

const scriptURL = 'https://script.google.com/macros/s/AKfycbwTPpuvZKNwGTpKVA44FpJsvBicwyugb1V79_cCkeG4Np4JxmWPHQW8qclrYU0EUeHygQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")


// -------------------------save contacts to google sheets ------------------
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML = "提交成功！我将尽快与您联系，谢谢！"
      setTimeout(function(){
        msg.innerHTML = ""
      }, 5000)
      form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

// -------------- rates radio buttons -----------------
function opentab(tabname){
  //remove lostfocus tab
  for(tablink of tablinks){
    tablink.classList.remove("active-link");
  }

  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active");
  }
  
  //add focus tab
  event.currentTarget.classList.add("active-link");
  
  document.getElementById(tabname+"1").classList.add("active");
  document.getElementById(tabname+"2").classList.add("active");
}

// ----------------- loans radio buttons ------------------------
function customradio(name){
  let radioNames = document.getElementsByClassName(name);
  for(radioName of radioNames){
    radioName.classList.remove('active-link')
  }
  event.currentTarget.classList.add("active-link");
}

// ---------------------- small screen nav -----------------------
function openmenu(){
  sidemenu.style.right = "0";
}
function closemenu(){
  sidemenu.style.right = "-200px";
}

if(navigator.language.substring(0, 2) != "zh"){
  let t = document.getElementById('sidemenu').getElementsByTagName('a');
  // t.innerText = 'Home';
}

