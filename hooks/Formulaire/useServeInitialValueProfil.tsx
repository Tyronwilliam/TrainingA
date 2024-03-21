import { FormikInscriptionWithoutExcluded } from "@/types/formulaire";

const useServeInitialValueProfil = (candidat: any) => {
  const {
    Infos_Administrative,
    Physionomie,
    Data_intermittent,
    Photo_Candidature,
    Location,
    Role_Candidat,
    Telephone,
    Instagram,
    Experience_tournage,
    Age,
    Video_Presentation,
    Bande_Demo,
    Agence,
    Photo_de_presentation,
    Date_de_naissance,
    Lieu_de_Naissance,
  } = candidat || {};
  const profilInitialValues: FormikInscriptionWithoutExcluded = {
    dateOfBirth: Date_de_naissance ? Date_de_naissance : null,
    birthCity: Lieu_de_Naissance?.Ville ? Lieu_de_Naissance?.Ville : null,
    birthPostal: Lieu_de_Naissance?.Code_postal
      ? Lieu_de_Naissance?.Code_postal
      : null,
    birthCountry: Lieu_de_Naissance?.Pays ? Lieu_de_Naissance?.Pays : null,
    photodepresentation:
      Photo_de_presentation !== null ? Photo_de_presentation : null,
    phone: Telephone ? `0${Telephone}` : "",
    age: Age ? Age : "",
    address: Location?.adresse ? Location?.adresse : "",
    city: Location?.Ville ? Location?.Ville : "",
    postalCode: Location?.Code_postal ? Location?.Code_postal.trim() : "",
    country: Location?.Pays ? Location?.Pays : "",
    socialNumber: Infos_Administrative?.Securite_sociale
      ? Infos_Administrative?.Securite_sociale.trim()
      : undefined,
    children:
      Infos_Administrative?.Enfant_a_charges ||
      Infos_Administrative?.Enfant_a_charges === 0
        ? Infos_Administrative.Enfant_a_charges
        : 0o0,
    statut: Infos_Administrative?.Statut ? Infos_Administrative?.Statut : "",
    retired: Infos_Administrative?.Retraite
      ? Infos_Administrative?.Retraite
      : false,
    intermittent: Infos_Administrative?.Intermittent
      ? Infos_Administrative?.Intermittent
      : false,
    residencePermit: Infos_Administrative?.Titre_de_Sejour
      ? Infos_Administrative?.Titre_de_Sejour
      : "",
    nationality: Infos_Administrative?.Nationalite
      ? Infos_Administrative?.Nationalite
      : "",
    mannequinPro: Role_Candidat?.Competence?.Mannequin_Pro
      ? Role_Candidat?.Competence?.Mannequin_Pro
      : false,
    danseClassique: Role_Candidat?.Competence?.Danse_Classique
      ? Role_Candidat?.Competence?.Danse_Classique
      : false,
    danseContemporaine: Role_Candidat?.Competence?.Danse_Contemporaine
      ? Role_Candidat?.Competence?.Danse_Contemporaine
      : false,
    hipHop: Role_Candidat?.Competence?.HipHop
      ? Role_Candidat?.Competence?.HipHop
      : false,
    sportif: Role_Candidat?.Competence?.Sportif
      ? Role_Candidat?.Competence?.Sportif
      : false,
    skate: Role_Candidat?.Competence?.Skate
      ? Role_Candidat?.Competence?.Skate
      : false,
    ski: Role_Candidat?.Competence?.Ski
      ? Role_Candidat?.Competence?.Ski
      : false,
    autres: Role_Candidat?.Competence?.Autres
      ? Role_Candidat?.Competence?.Autres
      : "",
    //
    humoristeStandUp: Role_Candidat?.Competence?.humoriste_Stand_up
      ? Role_Candidat?.Competence?.humoriste_Stand_up
      : false,
    chant: Role_Candidat?.Competence?.Chant
      ? Role_Candidat?.Competence?.Chant
      : false,
    rap: Role_Candidat?.Competence?.Rap
      ? Role_Candidat?.Competence?.Rap
      : false,
    guitare: Role_Candidat?.Competence?.Guitare
      ? Role_Candidat?.Competence?.Guitare
      : false,
    batterie: Role_Candidat?.Competence?.Batterie
      ? Role_Candidat?.Competence?.Batterie
      : false,
    piano: Role_Candidat?.Competence?.Piano
      ? Role_Candidat?.Competence?.Piano
      : false,
    violon: Role_Candidat?.Competence?.Violon
      ? Role_Candidat?.Competence?.Violon
      : false,
    autreInstrument: Role_Candidat?.Competence?.Autre_instrument
      ? Role_Candidat?.Competence?.Autre_instrument
      : false,
    circassien: Role_Candidat?.Competence?.Circassien
      ? Role_Candidat?.Competence?.Circassien
      : false,
    poleDance: Role_Candidat?.Competence?.Pole_dance
      ? Role_Candidat?.Competence?.Pole_dance
      : false,
    foot: Role_Candidat?.Competence?.Foot
      ? Role_Candidat?.Competence?.Foot
      : false,
    tennis: Role_Candidat?.Competence?.Tennis
      ? Role_Candidat?.Competence?.Tennis
      : false,
    basket: Role_Candidat?.Competence?.Basket
      ? Role_Candidat?.Competence?.Basket
      : false,
    equitation: Role_Candidat?.Competence?.Equitation
      ? Role_Candidat?.Competence?.Equitation
      : false,
    boxe: Role_Candidat?.Competence?.Boxe
      ? Role_Candidat?.Competence?.Boxe
      : false,
    yoga: Role_Candidat?.Competence?.Yoga
      ? Role_Candidat?.Competence?.Yoga
      : false,
    //
    experiencesTournage: Experience_tournage ? Experience_tournage : "",
    instagram: Instagram ? Instagram : "",
    cheveux: Physionomie?.Cheveux ? Physionomie?.Cheveux : "",
    yeux: Physionomie?.Yeux ? Physionomie?.Yeux : "",
    confectionHaut: Physionomie?.Confection_Haut
      ? Physionomie?.Confection_Haut
      : "",
    confectionBas: Physionomie?.Confection_Bas
      ? Physionomie?.Confection_Bas
      : "",
    chaussures: Physionomie?.Chaussures ? Physionomie?.Chaussures : "",
    origine: Physionomie?.Origin ? Physionomie?.Origin : "",
    taille: Physionomie?.Taille ? Physionomie?.Taille : "",
    unique: Role_Candidat?.Unique ? Role_Candidat?.Unique : false,
    acteur: Role_Candidat?.Acteur ? Role_Candidat?.Acteur : false,
    modele: Role_Candidat?.Modele ? Role_Candidat?.Modele : false,
    figuration: Role_Candidat?.Accepte_Figuration
      ? Role_Candidat?.Accepte_Figuration
      : false,
    silhouette: Role_Candidat?.Accepte_Silhouette
      ? Role_Candidat?.Accepte_Silhouette
      : false,
    bandeDemo: Bande_Demo ? Bande_Demo : [],
    videodepresentation: Video_Presentation ? Video_Presentation : null,
    newPhotos: Photo_Candidature?.Nouvelle_photos
      ? Photo_Candidature?.Nouvelle_photos
      : [],
    congeSpectacle: Data_intermittent?.Numero_conges_spectacle
      ? Data_intermittent?.Numero_conges_spectacle
      : "",
    lastMedicVisite: Data_intermittent?.Visite_medicale
      ? Data_intermittent?.Visite_medicale
      : "",
    abattement: Data_intermittent?.Abattement
      ? Data_intermittent?.Abattement
      : false,
    cmb: Data_intermittent?.CMB ? Data_intermittent?.CMB : null,
    agenceInfos: Agence?.Agence_Infos ? Agence?.Agence_Infos : "",
    agence: Agence?.En_Agence ? Agence?.En_Agence : false,
  };

  return { profilInitialValues };
};

export default useServeInitialValueProfil;
