var tablinks = document.getElementsByClassName("ratelink");
var tabcontents = document.getElementsByClassName("ratecard");
var sidemenu = document.getElementById("sidemenu");
var lang = document.getElementById("language");

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

// ----------------------------Multi Language ------------------------

class Translation{
  constructor(name, nameType, value, tags){
    this.name = name, //the value of element's id or class
    this.nameType = nameType;//type: id or class
    this.value = value; //Inner Text Array
    this.tags = tags; //tags Array
  }
}

const contents = [
  new Translation("title", "tag", ["Mortgage Broker: Sally"], null),
  new Translation("sidemenu", "id", null, 
  [
    { tagName: "a", values: ["Home", "About", "Rates", "Service", "Application", "Contact","AI Evaluation"]},
  ]),
  new Translation("header", "id", null, 
  [
    { tagName: "p", values: ["Australia Mortgage"]},
    { tagName: "h1", values: ["I am <span>Sally. </span><br>Your Mortgage Broker"]},
  ]),    
  new Translation("sub-title", "class", 
  ["Why do you trust me?", "Interest Rates", "Five Star Financial Service", "Application", "Contacts", "Chat-GPT"], null),   
  new Translation("about-list", "class", null, 
  [
    { tagName: "h2", values: ["10+ years", "100+ Million", "1000+", "50+","Qulification","Education"]},
    { tagName: "p", values: ["Rich experience in loan industry", "Personal loan scale", 
    "Successful customer cases", "Australian banks and financial institutions",""
    ,"Mortgage Finance Association Australia","Registered Broker","","Master of Accounting/International Finance","" ]},
  ]),  
  new Translation("ratetype", "class", ["Owner occupied", "Investment"], null),
  new Translation("ratelink", "class", ["Owner occupied", "Investment"], null),
  new Translation("ratecard", "class", null, [
    {tagName: "h3", values: ["Fixed", "Variable","Fixed", "Variable"]},
    {tagName: "p", values: ["<span>From </span>5.18%", 
    "<span>From </span>5.36%",
    "<span>From </span>5.49%", 
    "<span>From </span>5.64%"]},
  ]),
  new Translation("services-list", "class", null, [
    {tagName: "h2", values: ["$0 Fee", "Low rates","Customization", "Fast"]},
    {tagName: "li", values: ["Both of new or old customers", "Any kind of bank loan",
    "Consulting, application, tracking", "Management of the repayment","Totally $0 fee",
    "Ultra-low lending rates",
    "Include a full range of promotions<ul><li>Owner occupied and investment</li><li>Refinance</li><li>Busness loan</li><li>Car loan</li></ul>","","","","","",
    "Analyze your financial situation in detail","Avoid risks, mistakes and traps","Create your own loan package",
    "Application progress tracking","Closely match your property settling schedule","Cope with changes","Ensure secure and fast approval"
    ]},
  ]),
  new Translation("work-list", "class", null, [
    {tagName: "h3", values: ["Id Certificates", "Income Files","Liabilitis", "Assets", "Living expenses"]},
    {tagName: "li", values: ["Passport, or", "Visa letter", "Driver License", "Pay slip & Bank receipt","Tax bill & Tax record","Rent Income",
    "Home loan","Car loan & Personal loan", "Student loan","Credit Card bill","After pay bill",
    "Property council bills","Down payment & Stamp tax","Gift letter","Family status","Income", "Property Cost","Residence", "Medical insurance"
    ]},
  ]),
  new Translation("formrow-title", "class", ["Income", "Expenses","Personal Details"], null),
  new Translation("label", "tag", ["Net Income 1", "Net Income 2","Other net income1","Other net income2","Other net income3",
    "Living expenses","Home rent","Car loan","Home loan","Left to repay","Term","Credit card limits",
    "Dependants","", "","Loan terms"],null),
    new Translation("period", "class", null, [
      {tagName:"option", values: ["Annually","Monthly","Fortnightly","Weekly","Annually","Monthly","Fortnightly","Weekly","Annually","Monthly","Fortnightly","Weekly",
      "Annually","Monthly","Fortnightly","Weekly","Annually","Monthly","Fortnightly","Weekly","Annually","Monthly","Fortnightly","Weekly","Annually","Monthly","Fortnightly","Weekly",
      "Annually","Monthly","Fortnightly","Weekly","Annually","Monthly","Fortnightly","Weekly",]}]),       
  new Translation("custom_radio","class",null, [
    {tagName:"div", values:["Single","Joint Income","Owner occupied","Investment"]}
  ]),
  new Translation("button","tag",["Submit", "Submit"], null),
];

function change_lang(){
  let lang = "";
  if(event.currentTarget.selectedIndex == 1){
    lang = "?lang=zh";
  }
  else{
    lang = "?lang=en";
  }

  window.location.replace(location.protocol + '//' + location.host + location.pathname + lang);
}

function init_lang(){
  var lang = "";
  const queryString = window.location.search;
  if(queryString.length > 0)
  {
    var urlParams = new URLSearchParams(queryString);
    lang = urlParams.get('lang');
  }

  if((lang == "" && navigator.language.substring(0, 2) == "zh") || (lang=="zh"))
  {
    document.getElementById("language")[1].selected = true;
  }
  else{
    document.getElementById("language")[0].selected = true;

    contents.forEach(tran => {
      let element;
      switch(tran.nameType)
      {
        case "id":
          element = document.getElementById(tran.name);
        break;
        case "class":
          element = document.getElementsByClassName(tran.name);
        break;
        case "tag":
          element = document.getElementsByTagName(tran.name);
        break;
      }

      if(tran.value != null){
        if(Array.isArray(tran.value))
        {
          for (let i = 0; i < tran.value.length; i++)
            element[i].innerHTML = tran.value[i];
        }
        else
          element.innerHTML = tran.value;
      }

      if(tran.tags != null){
        tran.tags.forEach(tag=>{
          let tagNames = [];

          if(element.length > 0){
              for (let i = 0; i < element.length; i++) {
                var tags = element[i].getElementsByTagName(tag.tagName);
                for (let j = 0; j < tags.length; j++) {
                  tagNames.push(tags[j]);
                }
              }
          }
          else
            tagNames = element.getElementsByTagName(tag.tagName);

          for (let i = 0; i < tag.values.length; i++)
            tagNames[i].innerHTML = tag.values[i];
        });
      }
    });

  }
}

function sentApplication(){
  
  const uri = "https://localhost:7246/api/ChatGPT";
  const salary1Textbox = document.getElementById("salary1");

  const item = {
    salary1: salary1Textbox.value.trim(),
    age: 0,
    marriagestatus: "string",
    purpose: "string",
  }

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  .then(response => response.json())
  .then(data => {
    handle(data);
  })
  .catch(error=> console.error('', error));
}

function handle(data){

}