

'use strict';

const e = React.createElement;
const apiKey = "PMAK-601b945dd62907003bbb537b-d68daf44950a881daf3cf4151f029878cd";
let monitorUID = "11516962-1eb91687-5e85-49c0-a7e6-8a6947cb671c";

async function getListOfMonitors(apiKey){
  var myHeaders = new Headers();
  myHeaders.append("X-API-Key", apiKey);

  var myList = document.querySelector('ul');

  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
  };

  fetch(`https://api.getpostman.com/monitors`, requestOptions)
  .then( response => response.json())
  .then(result => {
    result.monitors.forEach(monitor => {
      var myHeaders = new Headers();
      myHeaders.append("X-API-Key", apiKey);

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };

      fetch(`https://api.getpostman.com/monitors/${monitor.uid}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        var listItem = document.createElement('li');
        listItem.innerHTML = ' <strong>Name: </strong>  ' + result.monitor.name;
        listItem.innerHTML +=' <strong>Ran at:</strong>  '+ result.monitor.lastRun.finishedAt + '';
        if(result.monitor.lastRun.status === "success"){
          listItem.classList.add('success')
          listItem.innerHTML +=' <strong>Status:</strong> ' + result.monitor.lastRun.status + '';
        }else{
          listItem.classList.add('failed');
          listItem.innerHTML +=' <strong>Status:</strong> ' + result.monitor.lastRun.status + '';
        }
        
        myList.appendChild(listItem);
      })
    })
  })
}


/*const domContainer = document.querySelector('#monitor_status');
ReactDOM.render(e(LikeButton), domContainer); */
getListOfMonitors(apiKey);

