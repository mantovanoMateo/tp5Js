/*
 se conocen los siguientes endpoints:
▪ GET /api/Company
▪ GET /api/Employee
▪ POST /api/Employee
▪ DELETE /api/Employee/employeeId
*/

//declaro expresiones regulares const para usarlas en todo el dom
const regExp=new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+");
const regExpId=new RegExp("[0-9]");

function getData(url){
    return new Promise(function(resolve,reject){
        var request=new XMLHttpRequest();
        request.open("GET",url);
        request.onload=()=>{
            if (request.readyState == 4 && request.status == 200) {
                const data = request.response;
                resolve(data);
              } else {
                reject(`Error: ${request.status}`);
              }
        }
        request.send();
    });
}

function postData(url){
  return new Promise(function(resolve,reject){
      var request=new XMLHttpRequest();
      request.open("POST",url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      const body=JSON.stringify({
        "employeeId": 0,
        "companyId": 1,
        "firstName": "Mateo Francesco",
        "lastName": "Mantovano",
        "email": "mantovanoMateo16@gmail.com"
      });
      request.onload=()=>{
          if(request.readyState == 4 && request.status == 200){
            resolve(request.responseText);
            
          } else{
            reject(`Error: ${request.status}`);
          }
      };
      request.send(body);
  });
}

function deleteData(url){
    return new Promise(function(resolve,reject){
      var request=new XMLHttpRequest();
      request.open("DELETE",url);
      request.onload=()=>{
        if(request.readyState == 4 && request.status == 200){
          resolve(request.responseText);
        }else{
          reject(`Error: ${request.status}`);
        }
      };
      request.send();
    });
}

//esta function viene a reemplazar todas las anteriores ya que al tener diferentes parametros nos permite ejecutar 
//diferentes metodos http sin la necesidad de ejecutar diferentes funciones

function apiInteraction(HTTPMethod,url,body){
    return new Promise((resolve,reject)=>{
      var request=new XMLHttpRequest();
      request.open(HTTPMethod,url);
      request.onload=()=>{
        if(request.readyState == 4 && request.status == 200){
          if(request.responseText!=''){
            resolve(JSON.parse(request.responseText))
          }else{
            resolve(request.responseText);
          }
        }else{
          reject(`Error: ${request.status}`);
        }
      }
      if(HTTPMethod=='POST'){
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(body);
      }else{
        request.send();
      }
    })
}

/*
apiInteraction('GET',"https://utn-lubnan-api-1.herokuapp.com/api/Company",null)
      .then((response)=>{
        console.log(response);
    })
    .catch((reason)=>{
        console.log(Error(reason));
})

apiInteraction('GET',"https://utn-lubnan-api-1.herokuapp.com/api/Employee",null)
      .then((response)=>{
        console.log(response);
    })
    .catch((reason)=>{
        console.log(Error(reason));
})

apiInteraction('POST',"https://utn-lubnan-api-1.herokuapp.com/api/Employee",JSON.stringify({"employeeId": 0,"companyId": 1,"firstName": "Mateo Francesco","lastName": "Mantovano","email": "mantovanoMateo16@gmail.com"}))
      .then((response)=>{
        console.log(response);
    })
    .catch((reason)=>{
        console.log(Error(reason));
})

apiInteraction('DELETE',"https://utn-lubnan-api-1.herokuapp.com/api/Employee/567",null)
      .then((response)=>{
        console.log(response);
    })
    .catch((reason)=>{
        console.log(Error(reason));
})



getData("https://utn-lubnan-api-1.herokuapp.com/api/Company")
    .then((response)=>{
        console.log(response);
    })
    .catch((reason)=>{
        console.log(Error(reason));
})

setTimeout(() => {
  console.log('Now we show employees');
}, "1000");


getData("https://utn-lubnan-api-1.herokuapp.com/api/Employee")
    .then((response)=>{
        console.log(response);
    })
    .catch((reason)=>{
        console.log(Error(reason));
})

setTimeout(() => {
  console.log('Now we show the response ow delete an employee');
}, "2000");

postData("https://utn-lubnan-api-1.herokuapp.com/api/Employee")
.then((response)=>{
  console.log(response);
})
.catch((reason)=>{
  console.log(Error(reason));
})


deleteData("https://utn-lubnan-api-1.herokuapp.com/api/Employee/1001")
.then((response)=>{
  console.log(response);
})
.catch((reason)=>{
  console.log(Error(reason));
})*/

// aqui se encuentran los metodos que serviran para llenar el html con los datos obtenidos por la api
function showEmployees(){

  let oldTable=document.getElementById('dataTable');
  if(oldTable!=null){oldTable.remove();}

  let daddy=document.getElementById('tableDaddy');

  let newTable=document.createElement('table');
  newTable.className='table table-striped';
  newTable.id='dataTable';
  newTable.innerHTML=`
  <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">E-mail</th>
        <th scope="col">Company</th>
    </tr>
  </thead>
  `
apiInteraction('GET',"https://utn-lubnan-api-1.herokuapp.com/api/Employee",null)
      .then((response)=>{
        newTable.appendChild(loadTableEmployee(response));
        daddy.appendChild(newTable);
    })
    .catch((reason)=>{
        console.log(Error(reason));
  })

}

//carga los datos en una tabla
function loadTableEmployee(data){
  let tableBody=document.createElement('tbody');
  data.forEach(employee => {
      tableBody.innerHTML+=`
      <tr>
      <th scope="row">${employee.employeeId}</th>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.email}</td>
      <td>${employee.companyId}</td>
      </tr> 
      `
  });
  return tableBody;
}

async function showEmployeesAsync(){

  let oldTable=document.getElementById('dataTable');
  if(oldTable!=null){oldTable.remove();}

  let daddy=document.getElementById('tableDaddy');

  let newTable=document.createElement('table');
  newTable.className='table table-striped';
  newTable.id='dataTable';
  newTable.innerHTML=`
  <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">E-mail</th>
        <th scope="col">Company</th>
    </tr>
  </thead>
  `
let response= await apiInteraction('GET',"https://utn-lubnan-api-1.herokuapp.com/api/Employee",null)

  newTable.appendChild(loadTableEmployee(response));
  daddy.appendChild(newTable);

}

// esta funcion nos permitira cargar las companias
function showCompanies(){

  let oldTable=document.getElementById('dataTable');
  if(oldTable!=null){oldTable.remove();}

  let daddy=document.getElementById('tableDaddy');

  let newTable=document.createElement('table');
  newTable.id='dataTable';
  newTable.className='table table-striped';
  newTable.innerHTML=`
  <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Company Name</th>
    </tr>
  </thead>
  `
  apiInteraction('GET',"https://utn-lubnan-api-1.herokuapp.com/api/Company",null)
      .then((response)=>{
        newTable.appendChild(loadTableCompany(response));
        
        daddy.appendChild(newTable);
    })
    .catch((reason)=>{
        console.log(Error(reason));
  })

}

// esta funcion llama carga los datos en un table body
function loadTableCompany(data){
  let tableBody=document.createElement('tbody');
  data.forEach(company => {
      tableBody.innerHTML+=`
      <tr>
      <th scope="row">${company.companyId}</th>
      <td>${company.name}</td>
      </tr>
      `
  });
  return tableBody;
}

//esta funcion se encarga de crear un  Json de un empleado y hacer el post de los datos a la API
function postEmployee(){
  let employeeData=[
    document.getElementById('firstName').value,
    document.getElementById('lastName').value,
    document.getElementById('mail').value,
    document.getElementById('selectedCompanyId').value
  ]

  let p=document.getElementById('addedEmployee');
  p.innerText='';

  if(regExp.test(employeeData[2])==true){
    let newEmployee=JSON.stringify({
      "companyId": Number.parseInt(employeeData[3]),
      "firstName": employeeData[0],
      "lastName": employeeData[1],
      "email": employeeData[2],
    });
  
    apiInteraction('POST',"https://utn-lubnan-api-1.herokuapp.com/api/Employee",newEmployee)
        .then((response)=>{
          p.innerText='Employee ' + employeeData[0]+' '+ employeeData[1] + ', added succesfuly';
          p.style.color="green";
      })
      .catch((reason)=>{
          console.log(Error(reason));
          p.innerText='Cannot add employee, please try later';
          p.style.color="red";
    })

  }else{
          p.innerText='invalid email';
          p.style.color="red";
  }

}

function deleteEmployee(){
  let id=document.getElementById("firedEmployeeId").value;
  let p=document.getElementById("afterFireComunication");
  p.innerText='';
  if(regExpId.test(id)==true){
      let apiLink="https://utn-lubnan-api-1.herokuapp.com/api/Employee/"+id;
      apiInteraction('DELETE',apiLink,null)
      .then((response)=>{
      console.log(response);
      p.innerText='Succesfully fired';
      p.style.color="green";
      })
      .catch((reason)=>{
        console.log(Error(reason));
        p.innerText='the sindicate has show up, you cant fire this employee, at least for now...';
        p.style.color="red";
      })
    }else{
      p.innerText='please only put numbers in the box';
      p.style.color="red";
    }



}