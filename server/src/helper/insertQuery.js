import { prisma } from './pooler.js';
export default async function insertQuery(name, email, query) {
  if (!name || !email || !query) {
    console.error('Missing required fields');
    throw new Error('All fields are required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('Invalid email format');
    throw new Error('Invalid email format');
  }

  try {
    const newQuery = await prisma.query.create({
      data: {
        name,
        email,
        query
      }
    });

    console.log('Query inserted successfully:', newQuery.id);
    return newQuery;
  } catch (error) {
    console.error('Database insertion error:', error.message);
    throw new Error('Failed to insert query. Please try again later.');
  }
}