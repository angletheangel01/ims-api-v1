// const roleModel = require("../model/role.model")
// require(`../database/init.mongoDB`)
//   const db=[
//     {
//       role_name: 'System Admin'.toUpperCase(),
//       role_slug: 'sad001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Manage the entire system, set system parameters, manage users, and decentralize.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Warehouse Manager'.toUpperCase(),
//       role_slug: 'wh001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Manage inventory in the warehouse, including imports, exports, inventories, and inventory quantity adjustments.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Store Manager'.toUpperCase(),
//       role_slug: 'sm001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Manage in-store inventory, including warehouse imports, exports, and product displays.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Inventory Clerk'.toUpperCase(),
//       role_slug: 'ic001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Perform tasks related to warehouse goods management, including import, export, inventory, and transportation of goods.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Sales Associate'.toUpperCase(),
//       role_slug: 'sa001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Manage sales orders, process transactions, and take care of customers.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Purchasing Manager'.toUpperCase(),
//       role_slug: 'purm001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Manage purchase orders, track suppliers, and generate purchase reports.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Customer Service Representative'.toUpperCase(),
//       role_slug: 'csrep001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Customer support, order status updates, and customer inquiry processing.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Finance Manager'.toUpperCase(),
//       role_slug: 'finm001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Manage financial activities related to inventory, including cost and revenue tracking.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Auditor'.toUpperCase(),
//       role_slug: 'autdit001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Inspect and evaluate the operation of the warehouse management system to ensure accuracy and regulatory compliance.',
//       role_grants:[],
//     },
//     {
//       role_name: 'Supplier'.toUpperCase() ,
//       role_slug: 'supply001'.toUpperCase(),
//       role_status: 'active',
//       role_description: 'Update order status and shipping information.',
//       role_grants:[],
//     }


//   ]
//   const insertRole=async()=>{
//     await roleModel.insertMany(db)
//   }
//   insertRole()

// const userModel=require(`../model/user.model`)
// require(`../database/init.mongoDB`)
// const roleModel=require(`../model/role.model`)
// const { convertToObjectIdMongoDB } = require("../utils")
// const { default: mongoose } = require("mongoose")
// const roleService = require("../service/rbac/role.service")
// let userListRoles=[]
// const getUser=async()=>{
//     const id=convertToObjectIdMongoDB("6670fbea594956b59c37f2b3")
//     console.log(id)
//     const result= await userModel.aggregate([{ $match: { _id: id } },
//         { $project: { _id: 0, roles: `$user_roles` } },
//          { $lookup: { from: "Roles", localField: "roles", foreignField: "role_name", as: "grants" } },
//           { $project: { roles: 0 } },
//            { $unwind: "$grants" }, { $unwind: "$grants.role_grants" },
//            { $lookup: { from: "Resources", localField: "grants.role_grants.resource", foreignField: "_id", as: "resource" } },
//             { $unwind: "$resource" },
//              { $project: {role:"$grants.role_name",resource_name: "$resource.resource_name", actions: "$grants.role_grants.actions", attributes: "$grants.role_grants.attributes" } },
//              { $group:{ _id:"$resource_name", actions:{$first:"$actions"}, attributes:{$first:"$attributes"},role:{$first:"$role"}}},
//              { $project:{ _id:0,role:"$role", resource:"$_id", action: "$actions", attribute:"$attributes"}},
//              {$unwind:"$action"}
//    ])
//    return result
// }
// const RoleCheck=async()=>{
//     const userRoleList=await getUser()
//     const roleList=await roleService.listRoles()
//     const largeSet=new Set(roleList.map(item=>JSON.stringify({
//         role:item.role,
//         resource:item.resource,
//         action:item.action ,
//         attribute:item.attribute
//     })))
//     console.log(largeSet)
//     const exists = userRoleList.some(smallItem => 
//         largeSet.has(JSON.stringify({
//             role:smallItem.role,
//             resource:smallItem.resource,
//             action:smallItem.action ,
//             attribute:smallItem.attribute
        
//         })));
        
//     console.log(exists)    
    
// }
// RoleCheck()
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'Promise 1 resolved');
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(reject, 200, 'Promise 2 rejected');
// });

// const promise3 = new Promise((resolve, reject) => {
//     setTimeout(reject, 300, 'Promise 3 rejected');
// });

// const handlePromises = promises => {
//     return Promise.all(promises.map(p => p.catch(e => e)));
// };

// handlePromises([promise1, promise2, promise3])
//     .then(results => {
//         const errors = results.filter(result => result instanceof Error);
//         if (errors.length > 0) {
//             console.error('Some promises were rejected:', errors);
//         } else {
//             console.log('All promises resolved:', results);
//         }
//     });