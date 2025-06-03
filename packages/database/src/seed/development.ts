import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

import { Role, prisma } from '../client.js';

export default async function seedDev() {
  // Create 20 test users with realistic fake data
  const users = Array.from({ length: 20 }, (_, index) => ({
    password: bcrypt.hashSync('passer'),
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    role: index === 0 ? Role.ADMIN : index === 1 ? Role.MODERATOR : Role.USER,
    code: (100000 + index).toString(),
  }));

  await prisma.user.createMany({
    data: users,
  });
}
