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
      
      // ...add body to options, and convert into a string
      options.body = JSON.stringify(body);
    }

    // if endpoint/route requires user authentication...
    if (requiresAuth) {

      // create a base-64 ASCII string from stringified data 
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      // set Authorization header on each requests that requires authentication
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // performs async operations that get an authenticated user
  async getUser(username, password) {

    // constant awaits response from sending a GET request to /users endpoint
    const response = await this.api('/users', 'GET', null, true, {username, password});

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


}

