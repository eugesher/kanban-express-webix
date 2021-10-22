import { join } from 'path';
import { Request, Response } from 'express';
import { User } from '../entities/user.entity';

export function getHomePage(req: Request, res: Response): void {
  res.sendFile(join(__dirname, '../static/index.html'));
}

export function getLoginPage(req: Request, res: Response): void {
  res.sendFile(join(__dirname, '../static/login.html'));
}

export function getDashboardPage(req: Request, res: Response): void {
  const user = req.user as User;
  res.send(
    `Hello ${user.username}. Your session ID is ${req.sessionID} and your session expires in ${req.session.cookie.maxAge} milliseconds.<br><br><a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`,
  );
}

export function getSecretPage(req: Request, res: Response): void {
  res.sendFile(join(__dirname, '../static/secret-page.html'));
}

export function onLogin(req: Request, res: Response): void {
  res.redirect('/dashboard');
}

export function onLogout(req: Request, res: Response): void {
  req.logout();
  res.redirect('/login');
}
