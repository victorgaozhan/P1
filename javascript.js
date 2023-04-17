let tablinks = document.getElementsByClassName("ratelink");
let tabcontents = document.getElementsByClassName("ratecard");
let sidemenu = document.getElementById("sidemenu");
let lang = document.getElementById("language");
let button = document.getElementById("loan_submit");
let report = document.getElementById("report-contents");

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
    { tagName: "a", values: ["Home", "About", "Rates", "Service", "Application", "Contact","A.I. Evaluation<span class='nav-new'>New!</span>"]},
  ]),
  new Translation("header", "id", null, 
  [
    { tagName: "p", values: ["Australia Mortgage"]},
    { tagName: "h1", values: ["I am <span>Sally. </span><br>Your Mortgage Broker"]},
  ]),    
  new Translation("sub-title", "class", 
  ["Why do you trust me?", "Interest Rates", "Five Star Financial Service", "Application", "Contacts", "A.I. Evaluation"], null),   
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
  new Translation("report-title","class",["Reported by Chat-GPT"], null),
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
  let lang = "";
  const queryString = window.location.search;
  if(queryString.length > 0)
  {
    let urlParams = new URLSearchParams(queryString);
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
                let tags = element[i].getElementsByTagName(tag.tagName);
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
  
  const uri = "https://sallychatgpt20230322160345.azurewebsites.net/api/ChatGPT";//"https://localhost:7246/api/ChatGPT";
  const salary1 = document.getElementById("salary1").value.trim();

  const salary1Period = document.getElementById("salary1_period").selectedOptions[0].value;
  const salary2 = document.getElementById("salary2").value.trim();
  const salary2Period = document.getElementById("salary2_period").selectedOptions[0].value;
  const other1 = document.getElementById("other1").value.trim();
  const other1Period = document.getElementById("other1_period").selectedOptions[0].value;
  const other2 = document.getElementById("other2").value.trim();
  const other2Period = document.getElementById("other2_period").selectedOptions[0].value;
  const other3 = document.getElementById("other3").value.trim();
  const other3Period = document.getElementById("other3_period").selectedOptions[0].value;

  const expenses = document.getElementById("expenses").value.trim();
  const expensesPeriod = document.getElementById("expenses_period").selectedOptions[0].value;
  const rent = document.getElementById("rent").value.trim();
  const rentPeriod = document.getElementById("rent_period").selectedOptions[0].value;
  const carloans = document.getElementById("carloans").value.trim();
  const carloansPeriod = document.getElementById("carloans_period").selectedOptions[0].value;
  const loans = document.getElementById("loans").value.trim();
  const loansPeriod = document.getElementById("loans_period").selectedOptions[0].value;
  const loans_outstanding = document.getElementById("loans_outstanding").value.trim();
  const loans_term = document.getElementById("loans_term").value.trim();
  const card_limit = document.getElementById("card_limit").value.trim();
  const children = document.getElementById("children").selectedOptions[0].value;
  const term = document.getElementById("term").value.trim();

  const incomeType = document.getElementsByClassName("incomelink active-link")[0].id;
  const loanType = document.getElementsByClassName("loanlink active-link")[0].id;
  
  const item = {
    language: lang.selectedIndex,
    salary1: ConvertToAnnually(salary1, salary1Period),
    salary2: ConvertToAnnually(salary2, salary2Period),
    otherIncome: ConvertToAnnually(other1, other1Period) 
      + ConvertToAnnually(other2, other2Period) 
      + ConvertToAnnually(other3, other3Period),

    expenses: ConvertToAnnually(expenses, expensesPeriod)
      + ConvertToAnnually(rent, rentPeriod)
      + ConvertToAnnually(carloans, carloansPeriod),

    loans: ConvertToAnnually(loans, loansPeriod),
    loans_outstanding: loans_outstanding,
    loans_term: loans_term,
    card_limit: card_limit,
    children: children,
    term: term,
    incomeType: incomeType,
    loanrate: (loanType == "loan_type1" ? "5.38" : "5.58"),
    IsInvestment: (loanType == "loan_type1" ? false : true),
  }

  let results = document.getElementById("chatGPT-report");
  results.style.display = "grid";


  report.style.height = "auto";
  report.innerText = item.language == 0 ? "Thank you for your submit, Chat-GPT is connecting. Please wait about 1 minute": "感谢您的提交, Chat-GPT连接中, 约1分钟左右。请稍候";
  report.classList.add("loading");

  let reportNotice = document.getElementById("report-notice");
  reportNotice.innerText = "";

  button.disabled = true;

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
    handle(data, true);
  })
  .catch(error=> handle(error, false));

}

function handle(data, success){
  //let report = document.getElementById("report-contents");
  report.style.height = "auto";

  let reportNotice = document.getElementById("report-notice");
  if(success){
    report.innerText = data;
    reportNotice.innerText = lang.selectedIndex == 0 ? "The content of the above assessment report comes from Chat-GPT, and the content of the assessment is for reference only. If you want to get a more accurate assessment of loan capacity, please contact Sally Gong, thank you.": "以上评估报告内容来自Chat-GPT, 评估内容仅供参考, 不能作为贷款依据。想要获得更准确的贷款能力评估, 敬请联系Sally Gong, 谢谢。";
  }
  else{
    report.innerText = (lang.selectedIndex == 0 ? "Sorry, System Error. Please try it later. " : "抱歉，系统提交失败，请稍候再试。 ") + data;
  }

  button.disabled = false;
  report.classList.remove("loading");
 
}

function ConvertToAnnually(amount, period){
  switch (period)
  {
      case "Monthly":
      case "/月":
          return amount * 12;
      case "Weekly":
      case "/周":
          return amount * 52;
      case "Fortnightly":
      case "/双周":
          return amount * 26;
      case "Annually":
      case "/年":
      default:
          return Number(amount);
  }
}
