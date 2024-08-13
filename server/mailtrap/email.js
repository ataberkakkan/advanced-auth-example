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

export default sendVerificationEmail;
