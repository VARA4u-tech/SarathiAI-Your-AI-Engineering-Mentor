import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is not set. Server cannot start.");
}

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_CLIENT_SECRET";
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleAuthRedirect = (req: Request, res: Response) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
    prompt: "consent"
  });
  res.redirect(authUrl);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    if (!tokens.id_token) {
      throw new Error("No ID token returned from Google");
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid payload");
    }

    // Here you would typically look up the user in your database by payload.email
    // and create one if they don't exist. For now, we'll just create a token.

    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

    // Set token as HttpOnly cookie — prevents exposure in logs, referrer headers, and XSS
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    // Redirect to frontend without the token in the URL
    res.redirect(`${FRONTEND_URL}/auth/callback`);
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
  }
};
