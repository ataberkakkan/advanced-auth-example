import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrap, sender } from "./mailtrap.js";

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrap.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationToken}",
        verificationToken
      ),
      category: "Email Verification",
    });

    return response;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrap.send({
      from: sender,
      to: recipient,
      template_uuid: "7630bc72-e239-490a-9a24-780bd7d83905",
      template_variables: {
        company_info_name: "Auth System",
        name: name,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

export { sendVerificationEmail, sendWelcomeEmail };
