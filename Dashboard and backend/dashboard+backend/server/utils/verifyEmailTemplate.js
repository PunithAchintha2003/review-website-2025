const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.5;">
      <p>Dear ${name},</p>
      <p>Thank you for registering at <strong>Green-Grass</strong>.</p>
      <p>Please verify your email by clicking the button below:</p>
      <p>
        <a href="${url}" style="
          display: inline-block;
          background-color: #00FF00;
          color: black;
          text-decoration: none;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 6px;
          margin-top: 10px;
        ">
          Verify Email
        </a>
      </p>
      <p>If you did not sign up for Green-Grass, please ignore this message.</p>
    </div>
  `;
};

export default verifyEmailTemplate;