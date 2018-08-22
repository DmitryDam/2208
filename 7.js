'use strict';

const tableAll = document.querySelector("#tableAll");
const tableID = document.querySelector("#tBodyID");
const userID = document.querySelector("#userID");
const formID = document.querySelectorAll("#idForm");
const out1GetUsers = document.querySelector("#out1GetUsers");
const outGetUserById = document.querySelector("#outGetUserById");

const clearAll = document.querySelector("#clearAll");
const clearById = document.querySelector("#clearById");
const out2AddUser = document.querySelector("#out2AddUser");
const out3RemoveUser = document.querySelector("#out3RemoveUser");
const removeId = document.querySelector("#removeId");

const updateID = document.querySelector("#changeUserId");
const changeUserName = document.querySelector("#changeUserName");
const changeUserScore =  document.querySelector("#changeUserScore")

const htmlTpl = document.querySelector("#table-row").textContent.trim();
const htmlTp2 = document.querySelector("#table-rowID").textContent.trim();
const compiled1 = _.template(htmlTpl);
const compiled2 = _.template(htmlTp2);
const mainUrl = 'https://test-users-api.herokuapp.com/users/';

const renderResult = users => {
  let htmlString1 = "";
  users.map(user => {
    htmlString1 += compiled1(user);
  });
  tableAll.innerHTML = htmlString1;
};

const clearAllusers = () => {
  tableAll.innerHTML = '';
};

const renderResultID = users => {
  let htmlString2 = "";
    htmlString2 += compiled2(users);
  tableID.innerHTML = htmlString2;
};
const clearIDtable = () => {
  tableID.innerHTML = '';
};

function getUser(evt){
    evt.preventDefault(); 
  fetch(mainUrl)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      console.log(data);
      renderResult(data.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });

};
out1GetUsers.addEventListener("click", getUser);
clearAll.addEventListener("click", clearAllusers);


function getUserById(evt){
    evt.preventDefault();
    const userIdVal = userID.value;
  fetch(`${mainUrl}${userIdVal}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      console.log(data);
      renderResultID(data.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  idForm.reset();
};
outGetUserById.addEventListener("click", getUserById);

  function addUser(evt) {
    evt.preventDefault();
    const newUser = {
      name: userName.value,
      age: userScore.value,
    };

    fetch(mainUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error fetching data');
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    document.querySelector("#user").reset();
  }
  out2AddUser.addEventListener("click", addUser);
  out2AddUser.addEventListener("click", getUser);
  function removeUser(id) {
    id.preventDefault();
    console.log(removeId.value);
    console.log(removeId);
    fetch(mainUrl + removeId.value, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('removed');
      })
      .catch(error => console.log('ERROR' + error));
  }

out3RemoveUser.addEventListener("click", removeUser);

  function updateUser(evt) {
    evt.preventDefault();

    const newUser = {
      name: changeUserName.value,
      age: changeUserScore.value,
    };

    fetch(mainUrl + updateID.value, {
      method: 'PUT',
      body: JSON.stringify(newUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log('ERROR' + error));
    document.querySelector("#change").reset();
  }

out4UpdateUser.addEventListener("click", updateUser);
