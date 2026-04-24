import random
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def generate_otp(length=6):
    """Generate a random numeric OTP."""
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])

def send_verification_email(receiver_email, otp_code):
    """
    Send a verification email with the OTP code.
    Requires SMTP configuration in environment variables.
    """
    sender_email = os.environ.get("SMTP_SENDER_EMAIL")
    sender_password = os.environ.get("SMTP_SENDER_PASSWORD")
    smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))

    if not sender_email or not sender_password:
        print("Error: SMTP_SENDER_EMAIL and SMTP_SENDER_PASSWORD must be set.")
        return False

    message = MIMEMultipart("alternative")
    message["Subject"] = "VoiceBridge - Verification Code"
    message["From"] = f"VoiceBridge <{sender_email}>"
    message["To"] = receiver_email

    text = f"Your verification code is: {otp_code}\n\nPlease enter this code in the app to continue."
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #080b14; color: #f0f4ff; padding: 20px;">
        <div style="max-width: 400px; margin: 0 auto; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; text-align: center;">
          <h1 style="color: #7c3aed; margin-bottom: 20px;">VoiceBridge</h1>
          <p style="font-size: 16px; color: #8b9cc8;">Your verification code is:</p>
          <div style="font-size: 42px; font-weight: 800; letter-spacing: 10px; color: #ffffff; padding: 20px; background: rgba(124,58,237,0.1); border-radius: 14px; margin: 20px 0;">
            {otp_code}
          </div>
          <p style="font-size: 14px; color: #4a5580;">This code will expire in 10 minutes.</p>
        </div>
      </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        print(f"Success: Verification email sent to {receiver_email}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

if __name__ == "__main__":
    # Example usage
    target_user = "user@example.com"
    code = generate_otp()
    print(f"Generated OTP: {code} for {target_user}")
    
    # Uncomment below to actually send if you have environment variables set
    # send_verification_email(target_user, code)
