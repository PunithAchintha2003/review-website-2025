import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API){
    console.log("Provide RESEND_API inside the .env file")
}

const resend = new Resend(process.env.RESEND_API);

                // Send Email

const sendEmail = async({ sendTo, subject, html })=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'GreenGrass <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });

          if (error) {
            console.error("Resend error:", error);
            throw new Error(error.message || "Failed to send email");
          }
          
          return data

    } catch (error) {
        console.log(error)
    }
}

export default sendEmail