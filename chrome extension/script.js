
let myLead = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const leadlocalstorage = JSON.parse(localStorage.getItem("myLead"));
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById('tab-btn');

if (leadlocalstorage) {
    myLead = leadlocalstorage;
    renderLeads(myLead);
}



deleteBtn.addEventListener('dblclick', function () {
    localStorage.clear();
    myLead = [];
    renderLeads(myLead);
});

tabBtn.addEventListener("click", function () {
    

    //calling the API for current tab link
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
       myLead.push(tabs[0].url);
    localStorage.setItem("myLead", JSON.stringify(myLead));
      renderLeads(myLead);
    })
  
})
inputBtn.addEventListener("click", function () {
    myLead.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLead", JSON.stringify(myLead));

    console.log(localStorage.getItem(myLead));
    renderLeads(myLead);
});

// const tabs = [
//     {
//         url: "http://www.linkdin.com/in/per-harald-borgen"
    
//     }
// ]

function renderLeads(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        // ulEl.innerHTML += "<li>"+ myLead[i] + "</li>";

        // const li = document.createElement('li');
        // li.textContent = myLead[i];
        // // ulEl.append(li);
        listItems += `<li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                     </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

console.log(document.location.href);



