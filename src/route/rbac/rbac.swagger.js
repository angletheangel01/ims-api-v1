/**
* @swagger
* /v1/api/rbac/listresources:
*  get:
*    tags:
*      - Resources
*    summary: List All Resources
*    responses:
*      200:
*        description: List resources success
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Resources'    
*            examples:
*               example1:
*                 value: 
*                   {
*                     "resource_name": "Sample Resource",
*                     "resource_slug": "sample-resource",
*                     "resource_description": "This is a description for Sample Resource."
*                   }
*      400:
*        description: Error while list resources
*/ 

/**
* @swagger
* /v1/api/rbac/listroles:
*  get:
*    tags:
*      - Roles
*    summary: List All Roles
*    responses:
*      200:
*        description: List roles success
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Roles'    
*            examples:
*              example1:
*                 value: 
*                   {
*                     "role": "INVENTORY MANAGER",
*                     "action": "create:any",
*                     "resource": "PRODUCT",
*                     "attribute": "'*'"
*                   }
*      400:
*        description: Error while list roles
*/

/**
 * @swagger
 * /v1/api/rbac/addrole:
 *  post:
 *    tags:
 *      - Roles
 *    summary: Create a new role 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewRole'
 *    responses:
 *      201:
 *        description: Create a new role.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewRole'
 *            examples:
 *              example1:
 *                value: 
 *                  {
 *                    "name":"Inventory Manager",
 *                    "slug":"im001",
 *                    "status":"active",
 *                    "description":"Inventory management, including imports, shipments, and inventory quantity adjustments.",
 *                    "grants":[
 *                        {
 *                            "resource":"66697081fae97923440547d3",
 *                            "actions":["create:any","read:any","update:any","delete:any"],
 *                            "attributes": "'*'"
 *                        }
 *                    ]
 *                  }
 *      400:    
 *        description: Request wrong somewhere.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      409:
 *        description: Data already exist in database.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *    x-exceptions:
 *      - code: 400
 *        description: Bad Request.
 *      - code: 409
 *        description: Conflict.
 */
/**
 * @swagger
 * /v1/api/rbac/addresource:
 *   post:
 *     tags:
 *       - Resources
 *     summary: Create a new resource.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resources'
 *     responses:
 *       201:
 *         description: create a new resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resources'
 *         examples:
 *               example1:
 *                 value: 
 *                   {
 *                     "name":"PROFILE",
 *                     "slug":"wh0004",
 *                     "description":"",
 *                   }
 *       400:    
 *         description: Request wrong somewhere.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Data already exist in database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     x-exceptions:
 *      - code: 400
 *        description: Bad Request.
 *      - code: 409
 *        description: Conflict.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *         message:
 *           type: string
 *         stack:
 *           type: object
 *           nullnable: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resources:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "PROFILE"
 *         slug:
 *           type: string
 *           example: "wh0004"
 *         description:
 *           type: string
 *           example: ""
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     RoleGrants:
 *       type: object
 *       properties:
 *         resource:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         actions:
 *           type: array,
 *           items:
 *             type: string
 *           description: List of actions allowed on the resource
 *           example: ["create:any", "read:any", "update:own", "delete:own"]
 *         attributes:
 *           type: string
 *           example: "'*'"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewRole:
 *       type: object
 *       properties:   
 *         name:
 *           type: string
 *           example: "Procurement Manager"
 *         slug:
 *           type: string
 *           example: "pm001"
 *         status:
 *           type: string
 *           example: "active"
 *         description:
 *           type: string
 *           example: "Manage purchasing activities, including ordering from suppliers, tracking orders, and ensuring goods are stocked on time." 
 *         grants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RoleGrants'
 *           description: List of role grants
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Roles:
 *       type: object
 *       properties:
 *         role: 
 *           type: string,
 *           example: "INVENTORY MANAGER"
 *         action:
 *           type: string,
 *           example: "create:any"
 *         resource: 
 *           type: string,
 *           example: "PRODUCT"
 *         attribute: 
 *           type: string,
 *           example: "'*'"
 */
