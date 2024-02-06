import {
  promisesUpload,
  uploadFileInCandidat,
} from "@/services/formulaire/photo";
import { sendStepFourAndFive } from "@/services/formulaire/stepFour";
import { createCandidat, createUser } from "@/services/formulaire/stepOne";
import { sendStepThreeData } from "@/services/formulaire/stepThree";
import { sendStepTwoData } from "@/services/formulaire/stepTwo";
import { FormikInscriptionProps } from "@/types/formulaire";
import { handleResponse } from "@/utils/apiObject";
import { sendToast } from "@/utils/toast";
import cookieCutter from "@boiseitguru/cookie-cutter";

// Gerer le cas ou l'user existe deja
// Connecter l'user + renvoyer JWt + id
// FInd User avant de creér l'user

export const handleApi = async (
  step: number,
  values: FormikInscriptionProps
) => {
  try {
    const candidatIdCookie = cookieCutter.get("candidatId");
    const jwt = cookieCutter.get("jwt");
    const candidatId = candidatIdCookie && parseInt(candidatIdCookie);

    switch (step) {
      case 1:
        const responseCreateUser = await createUser(values);
        await handleResponse(responseCreateUser);
        const userId = await responseCreateUser?.data?.user?.id;
        let jwtRes = await responseCreateUser?.data?.jwt;
        cookieCutter.set("jwt", jwtRes);
        const responseCreateCandidat = await createCandidat(values, userId);
        const candidatIdRes = await responseCreateCandidat.data.data.id;
        cookieCutter.set("candidatId", candidatIdRes);
        return await handleResponse(responseCreateCandidat);
        break;
      case 2:
        if (jwt && candidatId) {
          const responseStepTwo = await sendStepTwoData(
            values,
            candidatId,
            jwt
          );
          return await handleResponse(responseStepTwo);
        }

        break;
      case 3:
        if (jwt && candidatId) {
          const responseStepThree = await sendStepThreeData(
            values,
            candidatId,
            jwt
          );
          return await handleResponse(responseStepThree);
        }
        break;
      case 5:
        if (jwt && candidatId) {
          const responseStepFourAndFive = await sendStepFourAndFive(
            values,
            candidatId,
            jwt
          );
          await handleResponse(responseStepFourAndFive);
          const promises = await promisesUpload(
            values?.photodepresentation,
            jwt
          );
          const promisesResolved = await Promise.all(promises);
          const responseStepFive = await uploadFileInCandidat(
            promisesResolved,
            candidatId,
            "photodepresentation",
            jwt
          );
          return await handleResponse(responseStepFive);
        }
        break;
      case 6:
        if (jwt && candidatId) {
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
          return await handleResponse(responseStepSixFile);
        }
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    sendToast(true, "An error occurred");
    return error;
  }
};
