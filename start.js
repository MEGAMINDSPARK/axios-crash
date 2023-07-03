// Axios Globals
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' //json web token, from https://jwt.io/  ye sbk lie hogya

// GET REQUEST
function getTodos() {
  console.log('GET Request');

  /*
  This is long way of doing this 
  axios({
      method:'get',
      // use this to use https://jsonplaceholder.typicode.com/ fake api
      url:'https://jsonplaceholder.typicode.com/todos', //pass _limit=5 so u'll get only 5 data like https://jsonplaceholder.typicode.com/todos?_limit=4 , u have to pass param for adding in last yaad kro geeky shows me last me add ho jata hai param ka value url k 
      params:{
          _limit:5 ///only 5 data will shows
      }
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err))
}
*/
  // axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}}) //to make this even shorter we can also do this
  axios('https://jsonplaceholder.typicode.com/todos?_limit=5') //.get by default hota hai in axios
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  /*
  axios({
      method:'post',
      
      url:'https://jsonplaceholder.typicode.com/todos',
      // we don't need param bc we are sending data
      data:{
          //hit on post u'll see the new data or following data
          title:'New Todo',
          completed:false
      }
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err))
  */
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false

  })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}


// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  //put is usually use to replace the entire resourse and patch will kind of update incremently
  //so for put request we need to include the id in the url todos/1 we are updating todo with the id of 1 and thensame thing update title
  /*
   axios.put('https://jsonplaceholder.typicode.com/todos/1', {
      // https://jsonplaceholder.typicode.com/todos last me 1 islie kie die hai (/1) qki sbka user id 1 hai wo ht jaega
       title: 'Updated Todo',
       completed: true
   })
       .then(res => showOutput(res))
       .catch(err => console.log(err))
   */
  // in case of patch data include user id but in case of put user id goes
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'Updated Todo',
    completed: true
  }
  )
    .then(res => showOutput(res))
    .catch(err => console.log(err))


}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios
    // everything goes inside the data , it'll retrun blank object
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  //let's say we want to get  from (https://jsonplaceholder.typicode.com/) both post and todos at the same time, we could make a request to make post and then inside the .then we can pass todos, but that's not the idea to do that to wait on post and than get the todos, we can use the method call axios.all which will actually taken a array of request and once all those request are fulfilled , all those promises are fulfilled than we get our response to handle it 

  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    /*.then(res=>{
      console.log(res[0]); //for first one
      console.log(res[1]);//for second one
      // donno array me print ho gya, we can make it cleaner also , by using spreadoperator(axios.spread)      
    })*/
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.log(err))

}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  }

  // lot of time u have to send the data in headers a good example is when u have authentication like json web token, u request to log in it validate ur login and then it get back the token and then u have to send the token in the header to access protective routes
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false

  }, config)
    .then(res => showOutput(res))
    .catch(err => console.log(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  // transformresponse or transformrequest both are same
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
    // simple it's a kind of tricky request
  }
  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios.get('https://jsonplaceholder.typicode.com/todoss')
  .then(res => showOutput(res))
  .catch(error => {
    if (error.response) {
      // server responded with a status other than 200 range
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if(error.response.status === 404){
        alert("Error: Page Not Found");
      }
      else if(error.request){
        // Request was made but no response
        console.log(error.request);
      }
      else{
        console.log(error.message);
      }

    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
  const source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
  .then(res => showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log("Request Canceled",thrown.message);
    }
  });
  if(true){
    source.cancel('Request Canceled')
  }
}

// INTERCEPTING REQUESTS & RESPONSES
// create intercepter: which kind of run some kind of functionality
axios.interceptors.request.use(config => {
  // anything method or url
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

  return config;
}, error => {
  return Promise.reject(error);
});

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL:'https://jsonplaceholder.typicode.com' //COMMENTS ADD HO GYA LAST ME , OTHER CUSTOM SETTING 
});
axiosInstance.get('/comments').then(res =>showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
