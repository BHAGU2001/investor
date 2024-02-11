document.addEventListener("DOMContentLoaded", function() {
    const investorList = document.getElementById("investor-list");
    const addInvestorBtn = document.getElementById("add-investor-btn");
    const addInvestorForm = document.getElementById("add-investor-form");
    const submitInvestorBtn = document.getElementById("submit-investor-btn");
    const investorNameInput = document.getElementById("investor-name-input");
    const investorInfoInput = document.getElementById("investor-info-input");

    // Load investors from local storage
    const investors = JSON.parse(localStorage.getItem("investors")) || [];

    // Display existing investors
    investors.forEach(function(investor) {
        addInvestorToList(investor);
    });

    addInvestorBtn.addEventListener("click", function() {
        addInvestorForm.classList.remove("hidden");
    });

    submitInvestorBtn.addEventListener("click", function() {
        const investorName = investorNameInput.value.trim();
        const investorInfo = investorInfoInput.value.trim();
        if (investorName && investorInfo) {
            addInvestor(investorName, investorInfo);
            addInvestorForm.classList.add("hidden");
            investorNameInput.value = "";
            investorInfoInput.value = "";
        }
    });

    function addInvestor(name, info) {
        const investor = { name: name, info: info };
        investors.push(investor);
        localStorage.setItem("investors", JSON.stringify(investors));
        addInvestorToList(investor);
    }

    function addInvestorToList(investor) {
        const li = document.createElement("li");
        li.classList.add("card");
        li.innerHTML = `<h2 class="card-name">${investor.name}</h2>
                        <p class="card-info">${investor.info}</p>
                        <button class="delete-btn" onclick="deleteInvestor(this)">Delete</button>`;
        investorList.appendChild(li);
    }

    window.deleteInvestor = function(element) {
        const investorName = element.previousElementSibling.previousElementSibling.textContent;
        const investorIndex = investors.findIndex(investor => investor.name === investorName);
        if (investorIndex !== -1) {
            investors.splice(investorIndex, 1);
            localStorage.setItem("investors", JSON.stringify(investors));
            investorList.removeChild(element.parentElement);
        }
    }
});
