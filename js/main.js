let title = document.getElementById("title");
let cost = document.querySelectorAll("#cost input");
let count = document.getElementById("count");
let department = document.getElementById("department");
let btncreate = document.getElementById("btncreate");
let tablebody = document.getElementById("tablebody");
let deleteallbtn = document.getElementById("deleteallbtn");
let spancount = document.querySelector("#deleteallbtn span");
let span = document.getElementById("algded");

let alldata;

let mood = "create";
let globalid;

if (localStorage.product != null) {
  alldata = JSON.parse(localStorage.product);
} else {
  alldata = [];
}

let gettotal = () => {
  let price = cost[0].value,
    tax = cost[1].value,
    tcost = cost[2].value,
    discound = cost[3].value;
  let taxprice = +price * (+tax / 100);
  let totalcost = +price + +taxprice + +tcost;
  let discoundprice = +totalcost * (+discound / 100);
  let netprice = +totalcost - +discoundprice;
  cost[4].value = Math.ceil(+netprice);
  //////////////////////////////////////////////////////////////////////
};

for (let i = 0; i < cost.length; i++) {
  cost[i].addEventListener("keyup", gettotal);
}

let createobject = () => {
  let producrobject = {
    title: title.value,
    price: cost[0].value,
    tax: cost[1].value,
    tcost: cost[2].value,
    discound: cost[3].value,
    total: cost[4].value,
    count: count.value,
    department: department.value,

    
  };
  ////////////////////////////////////
  if ((+cost[0].value<0 || +cost[1].value<0 || +cost[2].value<0 || +cost[4].value<=0 || +cost[3]<0 || +cost[3]>=100 || title.value.length==0  || title.value.trim()==''|| department.value==0 || Number.isInteger(+cost[0].value) == false || Number.isInteger(+cost[1].value) == false || Number.isInteger(+cost[2].value) == false || Number.isInteger(+cost[3].value) == false) || Number.isInteger(+count.value) == false  ) 
  {

   mood = "create";
      btncreate.innerHTML = "create";
      btncreate.classList.replace("btn-warning", "btn-info");
    New.alert({
        status: 'error',
        title: 'Invalid Data',
        content: 'this data has a mathematical error or invalid title or no Image url',

        
      })
       

      
        
  }
  else{
    if (mood == "create") {
    if (producrobject.count > 1 ) {
      for (let i = 0; i < producrobject.count; i++) {
        alldata.push(producrobject);
      }
    } else {
      alldata.push(producrobject);
    }
  } else {
    alldata[globalid] = producrobject;
    mood = "create";
    btncreate.innerHTML = "create";
    btncreate.classList.replace("btn-warning", "btn-info");
    count.classList.remove("none");
    showdata();
  }
  }
  //////////////////////////////////// 
  
  

  showdata();
//   clearinputs(); //////////////////////////////////////////////////////////////////////////////////////////////////////
  localStorage.setItem("product", JSON.stringify(alldata));
};

let showdata = () => {
  let tablerow = "";

  for (let i = 0; i < alldata.length; i++) {
    tablerow += `
        <tr>
            <td> ${i + 1} </td>
            <td> ${alldata[i].title} </td>
            <td> ${alldata[i].price} </td>
            <td> ${alldata[i].tax} </td>
            <td> ${alldata[i].tcost} </td>
            <td> ${alldata[i].discound} </td>
            <td> ${alldata[i].total} </td>
            <td> ${alldata[i].count} </td>
            <td> <img style="width:150px;" src=" ${
              alldata[i].department
            }" alt="Error"> </td>
            <td> <button class='btn btn-danger' onclick="removeitem(${i})">Remove</button> </td>
            <td> <button class='btn btn-info' onclick="updatedata(${i})" >Update</button> </td>
        </tr>
        `;
  }
  tablebody.innerHTML = tablerow;

  if (alldata.length > 0) {
    deleteallbtn.classList.remove("none");
    spancount.innerHTML = alldata.length;
  } else {
    deleteallbtn.classList.add("none");
  }
};
showdata();

let clearinputs = () => {
  title.value = "";
  cost[0].value = "";
  cost[1].value = "";
  cost[2].value = "";
  cost[3].value = "";
  cost[4].value = "";
  count.value = "";
  department.value = "";
};

btncreate.addEventListener("click", createobject);

let removeitem = (index) => {
  alldata.splice(index, 1);
  localStorage.product = JSON.stringify(alldata);
  showdata();
};

let deletealldata = () => {
    
    New.alert({
        status: 'info',
        title: 'All things Will Be Deleted',
        content: 'Do you really want to delete all things?',
        confirmbtn: true
      });
      
       
      
      
      
    ///////////////////////////////////////////////////////////////////////////
  
};


deleteallbtn.addEventListener("click", deletealldata);

let updatedata = (i) => {
  mood = "update";
  title.value = alldata[i].title;
  cost[0].value = alldata[i].price;
  cost[1].value = alldata[i].tax;
  cost[2].value = alldata[i].tcost;
  cost[3].value = alldata[i].discound;
  cost[4].value = alldata[i].total;
  department.value = alldata[i].department;
  globalid = i;
  count.classList.add("none");
  btncreate.innerHTML = "Update";
  btncreate.classList.replace("btn-info", "btn-warning");
};

//dark light mode

let inpreplace = document.getElementsByClassName("inpreplace");
let card = document.getElementsByClassName("card");
let newbody = document.getElementsByClassName("newbody");
let newtable = document.getElementsByClassName("newtable");
let mark = document.getElementsByClassName("markbt3na");

document.body.style = "background-color: var(--dark);transition: 0.5s;";
const sun =
  "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
const moon =
  "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";

var theme = "dark";
const root = document.querySelector(":root");
const container = document.getElementsByClassName("theme-container")[0];
const themeIcon = document.getElementById("theme-icon");
container.addEventListener("click", setTheme);

function setTheme() {
  switch (theme) {
    case "dark":
      setLight();
      theme = "light";
      break;
    case "light":
      setDark();
      theme = "dark";
      break;
  }
}

function setLight() {
  root.style.setProperty("--dark", "#e9e6dd");
  container.classList.remove("shadow-dark");
  setTimeout(() => {
    container.classList.add("shadow-light");
    themeIcon.classList.remove("change");
  }, 300);
  themeIcon.classList.add("change");
  themeIcon.src = sun;
  for (f = 0; f < inpreplace.length; f++) {
    inpreplace[f].classList.replace("inputd", "inputl");
  }
  for (f = 0; f < card.length; f++) {
    card[f].classList.replace("darkc", "lightc");
  }
  for (f = 0; f < newbody.length; f++) {
    newbody[f].classList.replace("darkb", "lightb");
  }
  for (f = 0; f < newtable.length; f++) {
    newtable[f].classList.replace("table-dark", "table-light");
  }
  for (f = 0; f < mark.length; f++) {
    mark[f].classList.replace("markcolord", "markcolorl");
  }
}

function setDark() {
  root.style.setProperty("--dark", "#111");
  container.classList.remove("shadow-light");
  setTimeout(() => {
    container.classList.add("shadow-dark");
    themeIcon.classList.remove("change");
  }, 300);
  themeIcon.classList.add("change");
  themeIcon.src = moon;
  for (f = 0; f < inpreplace.length; f++) {
    inpreplace[f].classList.replace("inputl", "inputd");
  }
  for (f = 0; f < card.length; f++) {
    card[f].classList.replace("lightc", "darkc");
  }
  for (f = 0; f < newbody.length; f++) {
    newbody[f].classList.replace("lightb", "darkb");
  }
  for (f = 0; f < newtable.length; f++) {
    newtable[f].classList.replace("table-light", "table-dark");
  }

  for (f = 0; f < mark.length; f++) {
    mark[f].classList.replace("markcolorl", "markcolord");
  }
}

//   alert//



const New = {
    status: 'success',
    title: '',
    content: '',
    alert: function ({ status, title, content, confirmbtn = true }) {
      var title;
      var status;
      var content;
      var modal = document.createElement('section');
      modal.setAttribute('class', 'alert_modal');
      document.body.append(modal);
      var alert = document.createElement('div');
      alert.setAttribute('class', 'alert_container');
      modal.appendChild(alert);
      if (title == '' || title == null) {
        title = this.title;
      } else {
        title = title
      }
      if (status == '' || status == null) {
        status = this.status;
      } else {
        status = status;
      }
      if (content == '' || content == null) {
        content = this.content;
      } else {
        content = content
      }
      alert.innerHTML = `
               <div class="alert_heading"></div>
          <div class="alert_details">
              <h2>
                ${title}
              </h2>
              <p>
                  ${content}

              </p>
          </div>
          <div class="alert_footer"></div>
               ` ;



      var alert_heading = document.querySelector('.alert_heading');
      var alert_footer = document.querySelector('.alert_footer');
      if (status == '' || status == 'success') {
        alert_heading.innerHTML = `
                  <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
                  `;
        alert_footer.innerHTML = `
               <span class="close" title="Ok">
                Ok
              </span>
               `;
        alert_heading.style = 'background: linear-gradient(80deg, #67FF86, #1FB397);';
        document.querySelector('.alert_details > h2').style.color = '#1FB397';
      } else if (status == 'danger' || status == 'error') {
        alert_heading.innerHTML = `
                  <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                  `;
        alert_footer.innerHTML = `
               <span class="close" title="Ok">
                Ok
              </span>
               `;
        alert_heading.style = ' background: linear-gradient(80deg, #FF6767, #B31F1F);';
        document.querySelector('.alert_details > h2').style.color = '#B31F1F';
      } else if (status == 'info' || status == 'confirm') {
        alert_heading.innerHTML = `
                  <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M8.99999 10C8.99999 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 10.9814 14.5288 11.8527 13.8003 12.4C13.0718 12.9473 12.5 13 12 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="20;0"/></path></g><circle cx="12" cy="17" r="1" fill="white" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.2s" values="0;1"/></circle></svg>
                  `;
        confirmbtn == true ?
          alert_footer.innerHTML = `
               <span class="accept" id="algded" title="I approve">
                I approve
              </span>
              <span class="close" title="I refuse">
                I refuse
              </span>
               `
          :
          alert_footer.innerHTML = `
              <span class="close" title="Ok">
             Ok
              </span>
               `
          ;
        alert_heading.style = 'background: linear-gradient(80deg, #7ED1FF, #484B95);';
        document.querySelector('.alert_details > h2').style.color = '#484B95';
      }
      document.querySelector('.alert_footer .close').addEventListener('click', function () {
        alert.remove();
        modal.remove();
      })
      document.querySelector('.alert_footer .accept').addEventListener('click', function () {
        alert.remove();
        modal.remove();
        localStorage.clear();
      alldata.splice(0);
      showdata();
      })
      document.querySelector('.alert_footer .accept').onclick = accept;

    }
  }
function show_confirm_alert(){
New.alert({
      status: 'info',
      title: 'Site administrator account',
      content: 'This account is the administrator of the site and not everyone has access to it !!!',
      confirmbtn: false
    });
}
  function show_info_alert() {
    New.alert({
      status: 'info',
      title: 'You confirm to delete this account',
      content: 'Do you really want to delete this account forever?',
      confirmbtn: true
    });
  }
  function accept() {
    New.alert({
      status: 'success',
      title: 'successful',
      
    });
    
  }

  function show_Err_alert() {
    New.alert({
      status: 'error',
      title: 'Server side error',
      content: 'A server side error, try again later, or contact site support',
    })
  }
  function show_success_alert() {
    New.alert({
      status: 'success',
      title: 'Update successful',
      content: 'Your account information has been successfully updated',
    })
  }
  

// msh 3yzen 3//

// my alert function//













