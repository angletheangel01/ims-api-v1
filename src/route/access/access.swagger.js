/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         user_name:
 *           type: string
 *         user_password:
 *           type: string
 *         user_email:
 *           type: string
 *         user_phone_number:
 *           type: string
 *         user_first_name:
 *           type: string
 *         user_last_name:
 *           type: string
 *         user_profile_picture:
 *           type: string
 *         user_roles:
 *           type: array
 *           items:
 *             type: string
 *         user_status:
 *           type: string
 *         user_last_login:
 *           type: string
 */

/**
 * @swagger
 * v1/api/access/signup:
 *   post:
 *     tags:
 *       - Access
 *   summary: Create a new user
 *   requireBody:
 *     required: true
 *     content: 
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Users'
 *   responses:
 *     201:
 *       description: Create user success
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *       examples:    
 *             example1:
 *               value:
 *                 {
 *                  "username":"ungirl01",
 *                  "password":"Abc123456",
 *                  "email":"truongminhtien9@gmail.com",
 *                  "phone_number":"0858619800",
 *                  "first_name":"Minh Tien",
 *                  "last_name":"Truong",
 *                  "profile_picture":"",
 *                  "roles":["Auditor","Finance Manager"]
 *                 }
 *     400:    
 *       description: Request wrong somewhere.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   x-exceptions:
 *     - code: 400
 *       description: Bad Request.
 */