// import { Prisma } from '@prisma/client';
// import { prisma } from './pooler.js';
// export default async function insertQuery(name,email,query){
//     if(!name||!email||!query){
//         console.error('Missing required fields');
//         throw new Error('All fields are required');
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         console.error('Invalid email format');
//         throw new Error('Invalid email format');
//     }
//     try{
//         const newQuery=await prisma.query.create({
//             data:{
//                 name:name,
//                 email:email,
//                 query:query
//             }
//         });
//         return newQuery
//     }
// }