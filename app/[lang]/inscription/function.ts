import {
  promisesUpload,
  uploadFileInCandidat,
} from "@/services/formulaire/photo";
import { createCandidat, createUser } from "@/services/formulaire/stepOne";
import { sendStepThreeData } from "@/services/formulaire/stepThree";
import { sendStepTwoData } from "@/services/formulaire/stepTwo";
import { FormikInscriptionProps } from "@/types/formulaire";
import cookieCutter from "@boiseitguru/cookie-cutter";

export const handleApi = async (
  step: number,
  values: FormikInscriptionProps
) => {
  const candidatIdCookie = cookieCutter.get("candidatId");
  const jwt = cookieCutter.get("jwt");
  const candidatId = candidatIdCookie && parseInt(candidatIdCookie);

  switch (step) {
    case 0:
      const responseCreateUser = await createUser(values);
      const userId = await responseCreateUser?.data?.user?.id;
      let jwtRes = await responseCreateUser?.data?.jwt;
      const responseCreateCandidat = await createCandidat(values, userId);
      const candidatIdRes = await responseCreateCandidat.data.data.id;
      cookieCutter.set("candidatId", candidatIdRes);
      cookieCutter.set("jwt", jwtRes);

      return { responseCreateUser, responseCreateCandidat };
      break;
    case 1:
      if (jwt && candidatId) {
        const responseStepTwo = await sendStepTwoData(values, candidatId, jwt);
        return { responseStepTwo };
      }

      break;
    case 2:
      if (jwt && candidatId) {
        const responseStepThree = await sendStepThreeData(
          values,
          candidatId,
          jwt
        );
        return { responseStepThree };
      }
      break;
    case 4:
      if (jwt && candidatId) {
        const responseStepFourAndFive = await sendStepThreeData(
          values,
          candidatId,
          jwt
        );
        const promises = await promisesUpload(values?.photodepresentation, jwt);
        const promisesResolved = await Promise.all(promises);
        const responseStepFive = await uploadFileInCandidat(
          promisesResolved,
          candidatId,
          "photodepresentation",
          jwt
        );
        return { responseStepFive, responseStepFourAndFive };
      }
      break;
    case 5:
      if (jwt && candidatId) {
        const responseStepSix = await sendStepThreeData(
          values,
          candidatId,
          jwt
        );
        const promisesSix = await promisesUpload(
          values?.videodepresentation,
          jwt
        );
        const promisesResolvedSix = await Promise.all(promisesSix);
        const responseStepSixFile = await uploadFileInCandidat(
          promisesResolvedSix,
          candidatId,
          "videodepresentation",
          jwt
        );
        return { responseStepSixFile, responseStepSix };
      }
      break;

    default:
      break;
  }
};
