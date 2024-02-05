import {
  promisesUpload,
  uploadFileInCandidat,
} from "@/services/formulaire/photo";
import { createCandidat, createUser } from "@/services/formulaire/stepOne";
import { sendStepThreeData } from "@/services/formulaire/stepThree";
import { sendStepTwoData } from "@/services/formulaire/stepTwo";
import { FormikInscriptionProps } from "@/types/formulaire";

const handleApi = async (step: number, values: FormikInscriptionProps) => {
  switch (step) {
    case 0:
      const responseCreateUser = await createUser(values);
      const userId = await responseCreateUser?.data?.user?.id;
      let jwt = await responseCreateUser?.data?.jwt;
      const responseCreateCandidat = await createCandidat(values, userId);
      const candidatId = await responseCreateCandidat.data.data.id;

      break;
    case 1:
      const response = await sendStepTwoData(values, candidatId, jwt);

      break;
    case 2:
      const responseStepThree = await sendStepThreeData(
        values,
        candidatId,
        jwt
      );
      break;
    case 4:
      const responseStepFourAndFive = await sendStepThreeData(
        values,
        candidatId,
        jwt
      );
      const promises = await promisesUpload(values?.photodepresentation , jwt);
      const promisesResolved = await Promise.all(promises);
      const responseStepFive = await uploadFileInCandidat(
        promisesResolved,
        candidatId,
        "photodepresentation",
        jwt
      );
      break;

    default:
      break;
  }
};
