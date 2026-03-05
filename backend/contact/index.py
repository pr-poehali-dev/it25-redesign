"""
Обработка заявок с сайта ITSPB.
Отправляет письмо на roman@itspb.com и уведомление в Telegram @roman_levanov.
"""
import json
import os
import smtplib
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "roman_levanov")
TO_EMAIL = "roman@itspb.com"
FROM_EMAIL = "roman@itspb.com"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


def send_telegram(token: str, message: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req, timeout=10)


def send_email(password: str, subject: str, body: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(body, "html", "utf-8"))
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(FROM_EMAIL, password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    service = body.get("service", "").strip()
    message = body.get("message", "").strip()

    if not name or not email:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Name and email are required"})}

    tg_text = (
        f"📩 <b>Новая заявка с сайта ITSPB</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone or '—'}\n"
        f"📧 <b>Email:</b> {email}\n"
        f"🔧 <b>Услуга:</b> {service or '—'}\n"
        f"💬 <b>Сообщение:</b> {message or '—'}"
    )

    email_html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0D1B2E, #0f3d6e); padding: 30px; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0;">Новая заявка с сайта ITSPB</h2>
      </div>
      <div style="background: #F4F7FA; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e0e7ef;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #666; width: 120px;">Имя</td><td style="padding: 10px 0; font-weight: bold;">{name}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Телефон</td><td style="padding: 10px 0;">{phone or '—'}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0;"><a href="mailto:{email}">{email}</a></td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Услуга</td><td style="padding: 10px 0;">{service or '—'}</td></tr>
          <tr><td style="padding: 10px 0; color: #666; vertical-align: top;">Сообщение</td><td style="padding: 10px 0;">{message or '—'}</td></tr>
        </table>
      </div>
    </body></html>
    """

    tg_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    errors = []

    if tg_token:
        try:
            send_telegram(tg_token, tg_text)
        except Exception as e:
            errors.append(f"Telegram: {e}")

    if smtp_password:
        try:
            send_email(smtp_password, f"Заявка с сайта ITSPB от {name}", email_html)
        except Exception as e:
            errors.append(f"Email: {e}")

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "errors": errors}),
    }