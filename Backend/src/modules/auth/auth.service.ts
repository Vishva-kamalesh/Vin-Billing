import { prisma } from '../../lib/prisma';
import { LoginDto } from './auth.dto';
import bcrypt from 'bcrypt';
import { generateToken } from '../../lib/jwt';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  async login(data: LoginDto) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.identifier },
          { phone: data.identifier }
        ],
      }
    });

    if (!user || !user.is_active) {
      throw new Error('Invalid credentials or inactive user');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateToken({ id: user.id, role: user.role }, '15m');
    const refreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        token: refreshToken,
        expires_at: expiresAt,
      }
    });

    return { 
      accessToken, 
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    };
  }

  async refresh(oldRefreshToken: string) {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: oldRefreshToken },
      include: { user: true }
    });

    if (!tokenRecord || tokenRecord.expires_at < new Date()) {
      throw new Error('Invalid or expired refresh token');
    }

    // Delete old token
    await prisma.refreshToken.delete({
      where: { id: tokenRecord.id }
    });

    const accessToken = generateToken({ id: tokenRecord.user.id, role: tokenRecord.user.role }, '15m');
    const newRefreshToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        user_id: tokenRecord.user.id,
        token: newRefreshToken,
        expires_at: expiresAt,
      }
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });
  }

  async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        is_active: true,
        avatar_url: true,
        created_at: true,
      }
    });
  }
}
