import { prisma } from './src/lib/prisma';

async function test() {
  try {
    const user = await prisma.user.findFirst();
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}
test();
