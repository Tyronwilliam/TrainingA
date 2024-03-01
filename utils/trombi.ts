export const options = {
  page: {
    margin: 10,
    format: "letter",
    orientation: "landscape",
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
      useCORS: true,
    },
  },
};
