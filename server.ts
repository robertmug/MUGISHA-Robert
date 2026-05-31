import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const dotenvResult = dotenv.config({ override: true });
console.log("⚙️ Dotenv Load Result Error Status:", dotenvResult.error ? dotenvResult.error.message : "None");
console.log("⚙️ Dotenv parsed keys:", dotenvResult.parsed ? Object.keys(dotenvResult.parsed) : "None");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const cleanEnvValue = (val: string | undefined): string => {
    if (!val) return "";
    return val.replace(/^["']|["']$/g, "").trim();
  };

  const debugUser = cleanEnvValue(process.env.EMAIL_USER);
  const debugPass = cleanEnvValue(process.env.EMAIL_PASS);
  console.log(`📡 [BOOT DIAGNOSTICS] Loaded EMAIL_USER: "${debugUser || "MISSING"}"`);
  console.log(`📡 [BOOT DIAGNOSTICS] Loaded EMAIL_PASS length: ${debugPass ? debugPass.length : 0} characters`);

  // Diagnostics route to evaluate SMTP connectivity in-depth
  app.get("/api/smtp-diagnostics", async (req, res) => {
    const emailUser = cleanEnvValue(process.env.EMAIL_USER);
    const emailPass = cleanEnvValue(process.env.EMAIL_PASS);
    const smtpHost = cleanEnvValue(process.env.SMTP_HOST) || "smtp.gmail.com";
    const smtpPortStr = cleanEnvValue(process.env.SMTP_PORT);
    const smtpPort = smtpPortStr ? parseInt(smtpPortStr, 10) : 465;

    const results: any[] = [];

    if (!emailUser || !emailPass) {
      return res.status(400).json({
        error: "SMTP credentials not defined in environment",
        EMAIL_USER: emailUser || "MISSING",
        EMAIL_PASS: emailPass ? "PRESENT" : "MISSING"
      });
    }

    const passwordVariants = [emailPass];
    const strippedPass = emailPass.replace(/\s+/g, "");
    if (strippedPass && strippedPass !== emailPass) {
      passwordVariants.push(strippedPass);
    }

    const testConfigurations = [];
    const isGmail = smtpHost === "smtp.gmail.com" || emailUser.endsWith("@gmail.com");

    for (const passVar of passwordVariants) {
      const maskedPass = `${passVar.slice(0, 3)}...${passVar.slice(-3)} (length: ${passVar.length})`;
      if (isGmail) {
        testConfigurations.push({
          name: `Gmail SMTP Port 465 (SSL) [pass: ${passVar.includes(" ") ? "spaces" : "no-spaces"}]`,
          config: {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: emailUser, pass: passVar },
            tls: { rejectUnauthorized: false }
          },
          maskedPass
        });
        testConfigurations.push({
          name: `Gmail SMTP Port 587 (STARTTLS) [pass: ${passVar.includes(" ") ? "spaces" : "no-spaces"}]`,
          config: {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: { user: emailUser, pass: passVar },
            tls: { rejectUnauthorized: false }
          },
          maskedPass
        });
        testConfigurations.push({
          name: `Nodemailer Service Gmail helper [pass: ${passVar.includes(" ") ? "spaces" : "no-spaces"}]`,
          config: {
            service: "gmail",
            auth: { user: emailUser, pass: passVar }
          },
          maskedPass
        });
      } else {
        testConfigurations.push({
          name: `Custom SMTP ${smtpHost}:${smtpPort} (Secure: ${smtpPort === 465})`,
          config: {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: emailUser, pass: passVar },
            tls: { rejectUnauthorized: false }
          },
          maskedPass
        });
      }
    }

    for (const test of testConfigurations) {
      try {
        const transporter = nodemailer.createTransport(test.config as any);
        await transporter.verify();
        results.push({
          name: test.name,
          status: "SUCCESS",
          message: "SMTP connection handshaked and verified successfully!",
          maskedPass: test.maskedPass
        });
      } catch (err: any) {
        results.push({
          name: test.name,
          status: "FAILED",
          error: err.message || String(err),
          code: err.code || "N/A",
          response: err.response || "N/A",
          command: err.command || "N/A",
          maskedPass: test.maskedPass
        });
      }
    }

    return res.json({
      timestamp: new Date().toISOString(),
      emailUser,
      receiverEmail: cleanEnvValue(process.env.RECEIVER_EMAIL),
      smtpHost,
      smtpPort,
      results
    });
  });

  // High-speed API status check for UI badges (non-blocking)
  app.get("/api/smtp-status", (req, res) => {
    const emailUser = cleanEnvValue(process.env.EMAIL_USER);
    const emailPass = cleanEnvValue(process.env.EMAIL_PASS);
    
    if (!emailUser || !emailPass) {
      return res.json({ status: "simulated" });
    }
    
    return res.json({ 
      status: "ready", 
      user: emailUser,
      host: cleanEnvValue(process.env.SMTP_HOST) || "smtp.gmail.com"
    });
  });

  // API Route for sending OTP validation PIN directly via Nodemailer
  app.post("/api/send-otp", async (req, res) => {
    try {
      const { email, pin } = req.body;

      if (!email || !pin) {
        return res.status(400).json({ error: "Missing required fields (email, pin)" });
      }

      const emailUser = cleanEnvValue(process.env.EMAIL_USER);
      const emailPass = cleanEnvValue(process.env.EMAIL_PASS);
      const smtpHost = cleanEnvValue(process.env.SMTP_HOST) || "smtp.gmail.com";
      const smtpPortStr = cleanEnvValue(process.env.SMTP_PORT);
      const smtpPort = smtpPortStr ? parseInt(smtpPortStr, 10) : 465;

      if (!emailUser || !emailPass) {
        console.warn("⚠️ SMTP Credentials not configured yet! PIN simulation active.");
        return res.status(200).json({
          status: "simulated",
          message: "No SMTP configuration available. Sent to virtual terminal.",
          pin: pin
        });
      }

      const mailOptions = {
        from: `"Mugisha Robert Gateway" <${emailUser}>`,
        to: email, // Direct verification code back to sender
        subject: `[Portfolio PIN] Secure verification code to unlock inbox gateway: ${pin}`,
        text: `Your portfolio gateway clearance code is: ${pin}

Please specify this verification PIN in the form to confirm your email credibility and unlock gateway transmissions.

Best regards,
Mugisha Robert Technical Gateway Server`,
        html: `
          <div style="font-family: sans-serif; padding: 25px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0; font-family: system-ui, sans-serif;">Security PIN Verification</h2>
            <p style="font-size: 14px; line-height: 1.5; color: #475569;">You requested a secure communication path to <strong>Mugisha Robert</strong>. Use the clearance code below to authenticate your sender email address:</p>
            <div style="background-color: #e0e7ff; color: #4338ca; font-size: 28px; font-weight: 800; letter-spacing: 5px; padding: 18px; text-align: center; border-radius: 8px; border: 1px solid #c7d2fe; margin: 24px 0; font-family: monospace;">
              ${pin}
            </div>
            <p style="font-size: 13px; line-height: 1.5; color: #64748b; margin-bottom: 0;">This transmission is audited by a full-stack secure gateway layer. If you did not trigger this dispatch, you can ignore this automated notice.</p>
          </div>
        `,
      };

      // Define password variants to handle potential spacing typos
      const passwordVariants = [emailPass];
      const strippedPass = emailPass.replace(/\s+/g, "");
      if (strippedPass && strippedPass !== emailPass) {
        passwordVariants.push(strippedPass);
      }

      const attempts = [];
      const isGmail = smtpHost === "smtp.gmail.com" || emailUser.endsWith("@gmail.com");

      for (const passVar of passwordVariants) {
        if (isGmail) {
          attempts.push({
            name: `Gmail SMTP Port 465 (SSL) - Pass: [${passVar.includes(" ") ? "with spaces" : "no spaces"}]`,
            config: {
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: { user: emailUser, pass: passVar },
              tls: { rejectUnauthorized: false }
            }
          });
          attempts.push({
            name: `Gmail SMTP Port 587 (STARTTLS) - Pass: [${passVar.includes(" ") ? "with spaces" : "no spaces"}]`,
            config: {
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              auth: { user: emailUser, pass: passVar },
              tls: { rejectUnauthorized: false }
            }
          });
        } else {
          attempts.push({
            name: `Custom SMTP ${smtpHost}:${smtpPort} (SSL: ${smtpPort === 465})`,
            config: {
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: { user: emailUser, pass: passVar },
              tls: { rejectUnauthorized: false }
            }
          });
        }
      }

      let lastError: any = null;
      let success = false;

      for (const attempt of attempts) {
        try {
          console.log(`📡 Dispatched OTP request via method: ${attempt.name}...`);
          const transporter = nodemailer.createTransport(attempt.config);
          await transporter.verify();
          await transporter.sendMail(mailOptions);
          console.log(`🚀 Real Validation PIN successfully sent to ${email} via ${attempt.name}!`);
          success = true;
          break;
        } catch (err: any) {
          console.error(`⚠️ Method ${attempt.name} failed during OTP validation:`, err.message || err);
          lastError = err;
        }
      }

      if (!success) {
        throw lastError || new Error("SMTP authentication credentials or connection rejected.");
      }

      return res.status(200).json({
        status: "success",
        message: `Clearance code securely routed to ${email}. Check your inbox/spam folder!`
      });

    } catch (error: any) {
      console.error("❌ Nodemailer failed to transmit OTP validation:", error);
      return res.status(500).json({
        status: "error",
        error: "OTP delivery failed.",
        details: error?.message || String(error)
      });
    }
  });

  // API Route for sending email
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, phone, type, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields (name, email, subject, message)" });
      }

      const emailUser = cleanEnvValue(process.env.EMAIL_USER);
      const emailPass = cleanEnvValue(process.env.EMAIL_PASS);
      const smtpHost = cleanEnvValue(process.env.SMTP_HOST) || "smtp.gmail.com";
      const smtpPortStr = cleanEnvValue(process.env.SMTP_PORT);
      const smtpPort = smtpPortStr ? parseInt(smtpPortStr, 10) : 465;
      const receiverEmail = cleanEnvValue(process.env.RECEIVER_EMAIL) || "robertmugisha908@gmail.com";

      if (!emailUser || !emailPass) {
        console.warn("⚠️ SMTP Credentials (EMAIL_USER & EMAIL_PASS) are not configured in system environment variables!");
        return res.status(200).json({
          status: "simulated",
          message: "SMTP Credentials NOT configured. Logged to server console.",
          warning: "To receive actual emails to your inbox, please configure EMAIL_USER and EMAIL_PASS environment variables.",
          payload: { name, email, phone, type, subject, message }
        });
      }

      // Construct email content
      const mailOptions = {
        from: `"${name}" <${emailUser}>`, // Send via verified SMTP user, but list sender's name
        to: receiverEmail,
        replyTo: email, // reply directly to original sender
        subject: `[Portfolio Gateway] ${subject}`,
        text: `You received a new message from your portfolio contact form:
        
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Preferred Dispatch: ${type}
Subject: ${subject}

Message:
------------------------------------------
${message}
------------------------------------------

This email was sent securely via your full-stack portfolio gateway server.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #059669; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Portfolio Dispatch</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Preferred Dispatch:</strong> <span style="text-transform: uppercase; font-size: 11px; background-color: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${type}</span></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #059669; margin-top: 20px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #666; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 10px;">
              Sent via your portfolio's integrated full-stack gateway server.
            </p>
          </div>
        `,
      };

      // Define password variants (to prevent spacer glitches)
      const passwordVariants = [emailPass];
      const strippedPass = emailPass.replace(/\s+/g, "");
      if (strippedPass && strippedPass !== emailPass) {
        passwordVariants.push(strippedPass);
      }

      // Define multiple configurations to try sequentially (very resilient)
      const attempts = [];
      const isGmail = smtpHost === "smtp.gmail.com" || emailUser.endsWith("@gmail.com");

      for (const passVar of passwordVariants) {
        if (isGmail) {
          // Attempt A: Secure Port 465 standard SMTP (recommended for Gmail App Passwords)
          attempts.push({
            name: `Direct SMTP Port 465 (SSL) - PassVar: [${passVar.includes(" ") ? "spaces" : "no-spaces"}]`,
            config: {
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: { user: emailUser, pass: passVar },
              tls: { rejectUnauthorized: false }
            }
          });

          // Attempt B: Port 587 STARTTLS (works well if port 465 is blocked / throttled)
          attempts.push({
            name: `Direct SMTP Port 587 (STARTTLS) - PassVar: [${passVar.includes(" ") ? "spaces" : "no-spaces"}]`,
            config: {
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              auth: { user: emailUser, pass: passVar },
              tls: { rejectUnauthorized: false }
            }
          });

          // Attempt C: Nodemailer built-in "gmail" service helper
          attempts.push({
            name: `Nodemailer Service: gmail - PassVar: [${passVar.includes(" ") ? "spaces" : "no-spaces"}]`,
            config: {
              service: "gmail",
              auth: { user: emailUser, pass: passVar }
            }
          });
        } else {
          // Custom SMTP
          attempts.push({
            name: `Custom SMTP ${smtpHost}:${smtpPort} (Secure: ${smtpPort === 465})`,
            config: {
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: { user: emailUser, pass: passVar },
              tls: { rejectUnauthorized: false }
            }
          });

          // Fallback for custom SMTP on alternative common port
          if (smtpPort === 465) {
            attempts.push({
              name: `Custom SMTP port fallback ${smtpHost}:587 (STARTTLS)`,
              config: {
                host: smtpHost,
                port: 587,
                secure: false,
                auth: { user: emailUser, pass: passVar },
                tls: { rejectUnauthorized: false }
              }
            });
          }
        }
      }

      let lastError: any = null;
      let success = false;

      // Try each strategy in sequence
      for (const attempt of attempts) {
        try {
          console.log(`📡 Trying email gateway via method: ${attempt.name}...`);
          const transporter = nodemailer.createTransport(attempt.config);
          
          // Verify connection configuration
          await transporter.verify();
          console.log(`✅ SMTP Verification complete via ${attempt.name}. Sending mail...`);
          
          // Send mail
          await transporter.sendMail(mailOptions);
          console.log(`🚀 Real Email successfully sent from ${email} to ${receiverEmail} using ${attempt.name}!`);
          success = true;
          break; // Exited successfully
        } catch (error: any) {
          console.error(`⚠️ Method ${attempt.name} failed:`, error.message || error);
          lastError = error;
        }
      }

      if (!success) {
        throw lastError || new Error("All SMTP connection attempts failed.");
      }

      return res.status(200).json({
        status: "success",
        message: `Email dispatched successfully to ${receiverEmail}`
      });

    } catch (error: any) {
      console.error("❌ Nodemailer failed to transmit email:", error);
      return res.status(500).json({
        status: "error",
        error: "Nodemailer transmission failure.",
        details: error?.message || String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
