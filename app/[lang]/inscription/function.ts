import { getUserProfile, sendLoginRequest } from "@/services/auth/auth";
import {
  promisesUpload,
  uploadFileInCandidat,
} from "@/services/formulaire/photo";
import { sendStepFourAndFive } from "@/services/formulaire/stepFour";
import {
  createCandidat,
  createUser,
  getUserByEmail,
} from "@/services/formulaire/stepOne";
import { sendStepThreeData } from "@/services/formulaire/stepThree";
import { sendStepTwoData } from "@/services/formulaire/stepTwo";
import { addToSendinblue } from "@/services/mailing/mail";
import { FormikInscriptionProps } from "@/types/formulaire";
import { handleResponse } from "@/utils/apiObject";
import { sendToast } from "@/utils/toast";
import cookieCutter from "@boiseitguru/cookie-cutter";

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
        let userId: number;
        let jwtRes: string;
        const userExist = await getUserByEmail(values?.email.toLowerCase());
        if (userExist?.data?.length > 0) {
          sendToast(true, "You already have an account, please log in");
          return;
        } else {
          const responseCreateUser = await createUser(values);
          await handleResponse(responseCreateUser);
          await addToSendinblue(
            values.email,
            values?.nomDeNaissance,
            values.firstname
          );
          userId = await responseCreateUser?.data?.user?.id;
          jwtRes = await responseCreateUser?.data?.jwt;
          cookieCutter.set("jwt", jwtRes);
          const responseCreateCandidat = await createCandidat(values, userId);
          const candidatIdRes = await responseCreateCandidat.data.data.id;
          cookieCutter.set("candidatId", candidatIdRes);
          return await handleResponse(responseCreateCandidat);
        }
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
          if (values?.videodepresentation !== null) {
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
          } else {
            // Return a response with a status of 200
            return { res: { status: 200 } };
          }
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
