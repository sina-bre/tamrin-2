
const container1 = document.querySelector('.container1')
const paginationNumbers = document.getElementById('pagination-numbers')
let arrayUsers = [];
let numberOfitems = 6;
let itemsInPage = 3;

const request = function(url){
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET' , url)
        xhr.send()
        xhr.onload = () => {
            resolve(xhr.responseText)
        }
    })
}

request(`https://reqres.in/api/users?page=2`)
.then((response1) => {
    console.log(response1);
    return response1;
}).then((response2) => {
    const firstData = JSON.parse(response2)

    // console.log(firstData.data);
    arrayUsers = firstData.data
    console.log(arrayUsers);
    arrayUsers.forEach(el => {
        container1.insertAdjacentHTML('beforeend', renderData(el))
    });
    for(let i=0 ;i<calculatePageNumbers(numberOfitems,itemsInPage) ; i++){
        paginationNumbers.insertAdjacentHTML('beforeend' , createPgaeNumbers(i))
    }
}).catch(err => console.log(err))

const postRequest = function(url , index){
    axios.post(url, {
        email : 'ssd',
        first_name : 'sina',
        last_name : 'Br',
        avatar :''
    }).then(function (response) {
        console.log(response);
        arrayUsers.push(response.data);
        container1.insertAdjacentHTML('beforeend', renderData(arrayUsers[index]));
        console.log(arrayUsers);
        numberOfitems ++;
        pagination(arrayUsers , itemsInPage)
    }).catch(function (error) {
        console.log(error);
    });
}

postRequest(`https://reqres.in/api/users?page=1`,2)
postRequest(`https://reqres.in/api/users?page=1`,4)
postRequest(`https://reqres.in/api/users?page=1`,7)


const renderData = function(element){
    const html = `
    <div class="section">
        <div class="left">
            <div class="div-img">
                <img class="img" src="${element.avatar}" alt="">
            </div>
            <div class="texts">
                <div class="topic">${element.first_name} ${element.last_name}</div>
                <div class="email">${element.email}</div>
            </div>
        </div>
        <button class="moreBtn">&bull;&bull;&bull;</button>
    </div>`;
    return html;

    // const emailDiv = document.createElement('div');
    // const topicDiv = document.createElement('div');
    // const textsDiv = document.createElement('div');
    // const img = document.createElement('img');
    // const imgDiv = document.createElement('div');
    // const leftSection = document.createElement('div')
    // const raquoBtn = document.createElement('button');
    // const sectionDiv = document.createElement('div');

    // img.src = `${element.avatar}`;
    // img.classList.add('img');
    // imgDiv.appendChild(img);
    // imgDiv.classList.add('.img-div');
    // leftSection.appendChild(imgDiv);
    // topicDiv.textContent = `${element.first_name} ${element.last_name}`;
    // topicDiv.classList.add('topic');
    // textsDiv.appendChild(topicDiv);
    // emailDiv.textContent = `${element.email}`;
    // emailDiv.classList.add('email');
    // textsDiv.appendChild(emailDiv);
    // textsDiv.classList.add('texts');
    // leftSection.appendChild(textsDiv);
    // leftSection.classList.add('left')
    // sectionDiv.appendChild(leftSection)
    // raquoBtn.innerHTML = '+';
    // sectionDiv.appendChild(raquoBtn);
    // sectionDiv.classList.add('section')
    // container1.appendChild(sectionDiv)
}
const createPgaeNumbers = function(page){
    const html = `<button>${page+1}</button>`
    return html;
}
const calculatePageNumbers = function(numberOfitems,itemsInPage){
    let numberOfPages = Math.ceil(numberOfitems / itemsInPage);
    return numberOfPages;
}
const pagination = function(array , number){
    
    let numberOfitems = array.length
    let itemsInPage = number;
    // createPgaeNumbers(numberOfPages);
    let curentPage = 1;

    let items = document.querySelectorAll('.section')
    
    const showItems = function(startIndex , endIndex){
        for(let i=startIndex ; i<endIndex ; i++){
            items[i].classList.remove('hidden')
        }
    }
    const showpage = function(pageNumber){
        items.forEach((el) => {
            el.classList.add('hidden')
        })
        let endIndex = ((pageNumber) * itemsInPage)
        let startIndex = ((pageNumber) * itemsInPage) - itemsInPage
        if(endIndex > numberOfitems) showItems(startIndex , numberOfitems) 
        else  showItems(startIndex , endIndex)
        console.log(startIndex, endIndex);
    }

    showpage(1)
}




