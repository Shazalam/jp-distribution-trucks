import nodemailer from "nodemailer";

// Using a basic fallback setup. For production, the user will need to configure these in .env.local
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "your_email@gmail.com",
    pass: process.env.SMTP_PASS || "your_app_password",
  },
});

export async function sendNewLeadEmailAlert(lead: any) {
  const mailOptions = {
    from: process.env.SMTP_USER || "your_email@gmail.com",
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER || "admin@example.com",
    subject: `New Lead Alert: ${lead.requestId} - ${lead.formType}`,
    html: `
      <h2>New Lead Received: ${lead.requestId}</h2>
      <p><strong>Status:</strong> ${lead.status}</p>
      <p><strong>Priority:</strong> ${lead.priority}</p>
      
      <h3>Customer Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${lead.customerName}</li>
        <li><strong>Email:</strong> ${lead.email}</li>
        <li><strong>Phone:</strong> ${lead.phone}</li>
        <li><strong>Country:</strong> ${lead.country || "N/A"}</li>
      </ul>

      <h3>Source Information:</h3>
      <ul>
        <li><strong>Form Type:</strong> ${lead.formType}</li>
        <li><strong>Page:</strong> ${lead.sourcePage || "N/A"}</li>
        <li><strong>Selected Vehicle/Build:</strong> ${lead.selectedVehicle || lead.selectedBuild || lead.selectedPart || "N/A"}</li>
      </ul>

      <p><strong>Message:</strong></p>
      <blockquote>${lead.message || "No message provided."}</blockquote>

      <p><a href="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/admin/requests/${lead._id}">Click here to view full details in the CRM Dashboard</a></p>
    `,
  };

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`Email alert sent for lead ${lead.requestId}`);
    } else {
      console.log("SMTP credentials missing, skipping email alert for:", lead.requestId);
    }
  } catch (error) {
    console.error("Failed to send email alert:", error);
  }
}
