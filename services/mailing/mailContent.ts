import { FormikContactProps } from "@/types/formulaire";

export const contentMailContact = (formValue: FormikContactProps) => {
  const subject = formValue.subject;

  const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p style="margin-bottom: 15px;"><strong>Nom :</strong> ${formValue.lastname}</p>
        <p style="margin-bottom: 15px;"><strong>Prénom :</strong> ${formValue.firstname}</p>
        <p style="margin-bottom: 15px;"><strong>Tel :</strong> ${formValue.phone}</p>
        <p style="margin-bottom: 15px;"><strong>Compagnie :</strong> ${formValue.companyName}</p>
        <p style="margin-bottom: 15px;"><strong>Sujet :</strong> ${subject}</p>
        <p style="margin-bottom: 15px;"><strong>Message :</strong></p>
        <div style="background-color: #f5f5f5; padding: 10px 20px; border-radius: 5px;">
          <p>${formValue.message}</p>
        </div>
      </div>
    `;

  return { htmlContent, subject };
};
