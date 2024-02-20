import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
const contratPath = "/CONTRATFIGURANT.pdf";
type CandidateAttributes = {
  attributes: {
    candidats: {
      data: any; // Define the correct type for 'data'
    };
  };
};
export const generateContract = async (
  candidates: CandidateAttributes,
  data: Record<string, any>
) => {
  const zip = new JSZip();
  const allCandidat = candidates?.attributes?.candidats?.data;
  for (const candidate of allCandidat) {
    const response = await getCandidatById(candidate?.id, session?.user?.jwt);
    if (response?.status === 200) {
      const {
        Infos_Administrative,
        Data_intermittent,
        Location,
        Lieu_de_Naissance,
        Nom_de_naissance,
        Date_de_naissance,
        Telephone,
        Prenom,
        Nom,
        Email,
      } = response?.data?.data?.attributes || {};
      try {
        const response = await fetch(contratPath);
        const formPdfBytes = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();
        const nameField = form.getTextField("Nom");
        const prodNameField = form.getTextField("Boitedeproduction");
        const siretField = form.getTextField("siret");
        const adresseField = form.getTextField("adresse");
        const assedicField = form.getTextField("assedic");
        const apecField = form.getTextField("apec");
        const nomDeNaissanceField = form.getTextField("nomdenaissance");
        const adresseCandidatField = form.getTextField("adresseCandidat");
        const codePostalVilleField = form.getTextField("codePostalVille");
        const telField = form.getTextField("tel");
        const emailField = form.getTextField("email");
        const neeLeField = form.getTextField("neeLe");
        const lieuDeField = form.getTextField("lieude");
        const secuField = form.getTextField("secu");
        const congeSpectacleField = form.getTextField("congeSpectacle");
        const nationaliteField = form.getTextField("nationalite");
        const visiteMedField = form.getTextField("visitemed");
        const carteSejourField = form.getTextField("carteSejour");
        const situationFamilleField = form.getTextField("situationFamille");
        const retraiteField = form.getTextField("retraite");
        const qualiteDeField = form.getTextField("qualiteDe");
        const qualiteDeField2 = form.getTextField("qualiteDe2");
        const nomDuFilmField = form.getTextField("Nom du film");
        const nomDuFilmField2 = form.getTextField("Nom du film2");
        const realiseParField = form.getTextField("realisePar");
        const dureeField = form.getTextField("duree");
        const lieuDeTravailField = form.getTextField("LieuDetravail");
        const faitLeField = form.getTextField("faitLe");
        const nombreDeJours = form.getTextField("jours");
        const heureTravailField = form.getTextField("heureTravail");
        const remunerationField = form.getTextField("remuneration");
        nameField.setText(`${Prenom} ${Nom}`);
        prodNameField.setText(data.prodNameField);
        siretField.setText(data.siret);
        adresseField.setText(data.adresse);
        heureTravailField.setText(data.heureTravail.toString());
        remunerationField.setText(data.remuneration.toString());
        assedicField.setText(data.assedic);
        apecField.setText(data.apec);
        Nom_de_naissance !== null
          ? nomDeNaissanceField.setText(Nom_de_naissance)
          : null;
        adresseCandidatField.setText(Location?.adresse || "");
        codePostalVilleField.setText(Location?.Code_postal || "");
        telField.setText(Telephone || "");
        emailField.setText(Email || "");
        neeLeField.setText(Date_de_naissance || "");
        lieuDeField.setText(Lieu_de_Naissance?.Ville || "");
        secuField.setText(Infos_Administrative?.Securite_sociale || "");

        if (Infos_Administrative?.Intermittent === true) {
          congeSpectacleField.setText(
            Data_intermittent?.Numero_conges_spectacle || ""
          );
          visiteMedField.setText(Data_intermittent?.Visite_medicale || "");
        }
        if (
          Infos_Administrative?.Titre_de_Sejour !== null &&
          Infos_Administrative?.Titre_de_Sejour !== undefined
        ) {
          carteSejourField.setText(Infos_Administrative?.Titre_de_Sejour || "");
        }
        nationaliteField.setText(Infos_Administrative?.Nationalite || "");
        situationFamilleField.setText(Infos_Administrative?.Statut || "");
        Infos_Administrative?.Retraite
          ? retraiteField.setText("Oui")
          : retraiteField.setText("Non");
        qualiteDeField.setText(data.role);
        qualiteDeField2.setText(data.role);
        nomDuFilmField.setText(data.nameOfFilm);
        nomDuFilmField2.setText(data.nameOfFilm);
        realiseParField.setText(data.realisateur);
        dureeField.setText(data.duree);
        lieuDeTravailField.setText(data.lieuDeTravail);
        faitLeField.setText(data.faitLe);
        nombreDeJours.setText(data.jours.toString());
        const modifiedPdfBytes = await pdfDoc.save();

        zip.file(`${Prenom}_contract.pdf`, modifiedPdfBytes);
      } catch (error) {
        console.error(error);
      }
    }
  }
  const zipContent = await zip.generateAsync({ type: "blob" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(zipContent);
  downloadLink.download = "all_contracts.zip";
  downloadLink.click();
};
