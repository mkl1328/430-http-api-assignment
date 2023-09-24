// HTML page
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  if (type === 'application/json') {
    const contentJSON = JSON.stringify(content);
    response.write(contentJSON);
  } else {
    response.write(content);
  }
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
      responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
      responseXML = `${responseXML}</response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    return respond(request, response, 400, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
      responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
      responseXML = `${responseXML}</response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    return respond(request, response, 401, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  return respond(request, response, 403, responseJSON, 'application/json');
};

const internalServerError = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  return respond(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  return respond(request, response, 501, responseJSON, 'application/json');
};

const resourceNotFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseJSON.message}</message>`;
    responseXML = `${responseXML}<id>${responseJSON.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  return respond(request, response, 404, responseJSON, 'application/json');
};

const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const getStyles = (request, response) => {
  respond(request, response, 200, styles, 'text/css');
};

module.exports = {
  getIndex,
  getStyles,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalServerError,
  notImplemented,
  resourceNotFound,
};
