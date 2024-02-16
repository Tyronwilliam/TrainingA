export const combineArrays = (bandeDemo: any, videoPresentation: any) => {
  let resultArray: any[] = [];

  if (bandeDemo && bandeDemo.length > 0) {
    // If bandeDemo has elements, add videoPresentation to it
    resultArray = [...bandeDemo];

    if (videoPresentation) {
      // If videoPresentation is defined, add it to resultArray
      resultArray.push(videoPresentation);
    }
  } else if (videoPresentation) {
    // If bandeDemo is empty and videoPresentation is defined, use videoPresentation as an array
    resultArray = [videoPresentation];
  }

  // If both bandeDemo and videoPresentation are undefined, resultArray will be an empty array

  return resultArray;
};
