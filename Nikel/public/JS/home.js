const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = { transactions:[] };
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", 
function(){
    window.location.href = "transactions.html" 
});

// ADICIONAR UM LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit",
function(e){
    e.preventDefault();   
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;
    data.transactions.unshift({ //adiciona o valor sempre no topo da lista
        value: value, type: type, description: description, date: date
    });
    saveData(data);
    e.target.reset();
    myModal.hide();
    getCashIn();
    getCashOut();
    getTotal();
    alert("Lançamento adicionado com sucesso!");
});

// CHECAR SE ESTÁ LOGADO
checkLogged();
function checkLogged(){
    if(session){
        sessionStorage.setItem("logged",session);
        logged = session;
    }
    else{
        if(!logged){
            window.location.href = "index.html";
            //alert("Você deve realizar o login!");
        }
    }
    const dataUser = localStorage.getItem(logged);
    if (dataUser){
        data = JSON.parse(dataUser);
    }
    getCashIn();
    getCashOut();
    getTotal();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getCashIn(){
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type === "1");
    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;     
        if(cashIn.length > 5){
            limit = 5;
        } else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            let valor = typeof cashIn[index].value === 'number' ? cashIn[index].value.toFixed(2) : cashIn[index].value;
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${valor}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-6 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-6 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut(){
    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => item.type === "2");
    if(cashOut.length){
        let cashOutHtml = ``;
        let limit = 0;     
        if(cashOut.length > 5){
            limit = 5;
        } else {
            limit = cashOut.length;
        }
        for (let index = 0; index < limit; index++) {
            let valor = typeof cashOut[index].value === 'number' ? cashOut[index].value.toFixed(2) : cashOut[index].value;
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${valor}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-6 col-md-8">
                                <p>${cashOut[index].description}</p>
                            </div>
                            <div class="col-6 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;
    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });
    document.getElementById("total").innerHTML = `R$${total.toFixed(2)}`;
}