import { getDb } from "@/lib/db";

const OTP_EXPIRES_IN = 10 * 60 * 1000; // 10 minutes in milliseconds
const OTP_CODE_LENGTH = 6;

export function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOTP(email: string) {
  const db = await getDb();
  const otpCollection = db.collection("otps");

  // Delete any existing OTP for this email
  await otpCollection.deleteMany({ email });

  const code = generateOTPCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRES_IN);

  const otp = await otpCollection.insertOne({
    email,
    code,
    expiresAt,
    verified: false,
    createdAt: new Date()
  });

  return { code, expiresAt };
}

export async function verifyOTP(email: string, code: string) {
  const db = await getDb();
  const otpCollection = db.collection("otps");
  const otp = await otpCollection.findOne({ email, code });

  if (!otp) {
    return { valid: false, message: "Invalid OTP code" };
  }

  if (otp.expiresAt < new Date()) {
    // Delete expired OTP
    await otpCollection.deleteOne({ _id: otp._id });
    return { valid: false, message: "OTP has expired" };
  }

  if (otp.verified) {
    return { valid: false, message: "OTP has already been used" };
  }

  // Mark OTP as verified
  await otpCollection.updateOne(
    { _id: otp._id },
    { $set: { verified: true } }
  );

  return { valid: true, message: "OTP verified" };
}

export async function sendOTPEmail(email: string, code: string) {
  // For now, just log to console
  // In production, integrate with services like SendGrid, AWS SES, etc.
  console.log(`📧 OTP Email would be sent to ${email}: ${code}`);
  console.log(`⏰ Valid for 10 minutes`);

  // Placeholder - in real implementation, use email service
  // await emailService.send({
  //   to: email,
  //   subject: 'Your OTP Code',
  //   html: `<p>Your OTP code is: <strong>${code}</strong></p><p>Valid for 10 minutes</p>`
  // });

  return true;
}
