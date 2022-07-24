import config from './config';

export default class Data {

  // api function sends GET and POST requests to REST API
  // contains default values for parameters
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null)
  {
    // configures request path using base URL defined in config.js
    const url = config.apiBaseUrl + path;

    // options object used to apply settings to request
    const options = {
      method, 
      headers: { // indicates type of resource (JSON)
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    // if body is not null...
    if (body !== null) {
      
      // ...add body to options, and convert into a JSON string
      options.body = JSON.stringify(body);
    }

    // if endpoint/route requires user authentication...
    if (requiresAuth) {

      // create a base-64 ASCII string from stringified data 
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      // set Authorization header on each requests that requires authentication
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // performs async operations that get an authenticated user
  async getUser(emailAddress, password) {

    // constant awaits response from sending a GET request to /users endpoint
    const response = await this.api('/users', 'GET', null, true, {emailAddress, password});

    // if response status is '200 OK'...
    if (response.status === 200) {

      // ...return a JSON object containing user credentials
      return response.json().then(data => data);

      // if response status is '401 Unauthorized'...
    } else if (response.status === 401) {

      // ...return null
      return null;
    } else {
      throw new Error();
    }
  } 

  // performs async operations that create an authenticated user
  async createUser(user) {

    // constant awaits response from sending a POST request to /users endpoint
    const response = await this.api('/users', 'POST', user);

    // if response status is 'OK Created'
    if (response.status === 201) {

      // return an empty array
      return [];

      // if response status is '400 Bad Request'...
    } else if (response.status === 400) {

      // ...return errors
      return response.json().then(data => {
        return data.errors;
      });

    } else {
      throw new Error();
    }
  }

  // performs async operations that retrieve all courses
  async getCourses() {

    const response = await this.api('/courses');

    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    } 
  }

  // performs async operations that create a new course
  async createCourse(course) {
    const { emailAddress, password } = course;
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password} );

    if (response.status === 201 ) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }


  // https://stackoverflow.com/questions/62278438/how-do-i-redirect-to-error-page-after-receiving-status-404-from-api-call-in-reac
  // performs async operations to retrieve course details 
  async courseDetail(id) {
    const response = await this.api(`/courses/${id}`);

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 404) {

      // user redirected to /notfound page if error code 404
      return window.location.href = '/notfound';
    } else {
      throw Error();
    }
  }

  // performs async operations that delete a course
  async deleteCourse(id, user) {
    const {emailAddress, password } = user;
    const response = await this.api(`/courses/${id}`, 'DELETE', {}, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
     else {
      throw new Error();
      
    }
  } 

  // performs async operations that update a course
  async updateCourse(course, user) {

    // extracts user credentials needed for private route
    const { emailAddress, password } = user;

    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204 ) {
      return [];
    } else if (response.status === 400) {

      // returns validation errors if error code 400
      return response.json().then(data =>{
        return data.errors;
      });
    } else if (response.status === 404) {

      // user redirected to /notfound page if error code 404
      window.location.href = '/notfound';
      
    } else {
      throw new Error();
    }
  }


}

