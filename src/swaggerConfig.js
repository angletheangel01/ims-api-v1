const swaggerJSDoc=require(`swagger-jsdoc`)
const options={
  definition:{
    openapi: "3.0.3",
    info: {
      title: "Inventory Management System For Nationwide Supermarket Chain",
      version: "1.0.0",
      description: "This is an Inventory Management Supermarket Server.\n\nIt contain any API that could have or important to an Inventory Management System\n\nYou can help me improve the API by reporting bugs via my email: truongminhtien9@gmail.com.\n\nThanks for stopping by.",
    },
    servers:[
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ]
  },   
  apis:['./src/route/*/*.js']
}
const swaggerSpec = swaggerJSDoc(options);
module.exports=swaggerSpec
