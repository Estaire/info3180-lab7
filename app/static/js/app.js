/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <router-link to="/" class="navbar-brand">Lab 7</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/upload" class="nav-link">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

const UploadForm = Vue.component('upload-form', {
    template: `
    <form @submit.prevent="uploadPhoto" id="uploadForm" role="form" method="POST" name="form">
        <div v-if="errors == 0" class="yes">
          <p> {{response.message}} </p>
        </div>
        <div v-else-if="errors == 1" class="no">
          <p v-for="error in response" > {{error}} </p>
        </div>
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="4" cols="50"></textarea>
        <label for="pllabel">Photo Upload</label>
        <label for="photo" class="plabel" name="pllabel">Browse...</label>
        <input type="file" name="photo"  id="photo" class="form-control mb-2 mr-sm-2">
        <button  class="btn btn-primary mb-2">Submit</button>
    </form>
    `,
    data: ()=>{
      return{
        response: [],
        errors: 0 
      }
    },
    methods: {
      uploadPhoto: function(){
        let self = this;
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);
        let description = document.forms["form"]["description"].value;
        let photo = document.forms["form"]["photo"].value;
        fetch("/api/upload", {
          method: "POST",
          body: form_data,
          headers: {
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
        })
        .then(function(response){
          return response.json();
        })
        .then(function(jsonResponse){
          self.response = jsonResponse.response;
          if(description == "" || photo == null)
            self.errors = 1;
          else
            self.errors = 0;
          console.log(jsonResponse);
        });
      }
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        {path: "/upload", component: UploadForm},
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});