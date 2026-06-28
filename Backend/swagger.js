const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vin Technology ERP API',
    description: 'API Documentation for the Vin Technology Modular ERP Backend',
  },
  host: 'localhost:5000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token in the format **Bearer &lt;token>**'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const fs = require('fs');
  const data = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  
  // Post-process the generated swagger to add module tags
  for (const path in data.paths) {
    let tag = 'General';
    const moduleMatch = path.match(/^\/api\/([^\/]+)/);
    
    if (moduleMatch) {
      // Convert 'service-tickets' to 'Service Tickets'
      tag = moduleMatch[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else if (path === '/health') {
      tag = 'System';
    }

    // Add tag to all methods in this path
    for (const method in data.paths[path]) {
      data.paths[path][method].tags = [tag];
    }
  }

  // Define the tags in the doc for ordering/descriptions
  const tagsSet = new Set();
  for (const path in data.paths) {
    for (const method in data.paths[path]) {
      if (data.paths[path][method].tags) {
        data.paths[path][method].tags.forEach(t => tagsSet.add(t));
      }
    }
  }
  
  data.tags = Array.from(tagsSet).map(name => ({ name }));

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log('Swagger documentation generated successfully with module-wise tags.');
});
