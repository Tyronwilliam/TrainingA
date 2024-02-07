import { FormikProfilProps } from "@/types/formulaire";
import React from "react";

const useServeInitialValueProfil = (candidat: any) => {
  const {
    Email,
    Infos_Administrative,
    Physionomie,
    Data_intermittent,
    Photo_Candidature,
    Portfolio,
    Location,
    Lieu_de_Naissance,
    Photo_de_presentation,
    Nom_de_naissance,
    Date_de_naissance,
    Role_Candidat,
    Telephone,
    Instagram,
    Experience_tournage,
    Age,
    Video_Presentation,
    Bande_Demo,
    Agence,
    Nom,
    Prenom,
  } = candidat || {};

  // IL faut typer correctement les initial values
  const profilInitialValues: any = {
    nomDeNaissance: Nom_de_naissance ? Nom_de_naissance : "",
    firstname: Prenom,
    email: Email,
    phone: Telephone ? `0${Telephone}` : "",
    dateOfBirth: Date_de_naissance ? Date_de_naissance : "",
    age: Age ? Age : "",
    birthCity: Lieu_de_Naissance?.Ville ? Lieu_de_Naissance?.Ville : "",
    birthCountry: Lieu_de_Naissance?.Pays ? Lieu_de_Naissance?.Pays : "",
    birthPostal: Lieu_de_Naissance?.Code_postal
      ? Lieu_de_Naissance?.Code_postal.trim()
      : "",
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
    defile: Role_Candidat?.Competence?.Defile_de_mode
      ? Role_Candidat?.Competence?.Defile_de_mode
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
    //   unique: Role_Candidat?.Unique ? Role_Candidat?.Unique : false,
    acteur: Role_Candidat?.Acteur ? Role_Candidat?.Acteur : false,
    modele: Role_Candidat?.Modele ? Role_Candidat?.Modele : false,
    figuration: Role_Candidat?.Figurant ? Role_Candidat?.Figurant : false,
    silhouette: Role_Candidat?.Silhouette ? Role_Candidat?.Silhouette : false,
    bandeDemo: Bande_Demo ? Bande_Demo : [],
    videodepresentation: Video_Presentation ? Video_Presentation : null,
    autresphotos: Portfolio?.Portfolio ? Portfolio?.Portfolio : [],
    photodepresentation: Photo_de_presentation ? Photo_de_presentation : null,
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
    cmb: Data_intermittent?.CMB ? Data_intermittent?.CMB : "",
    agenceInfos: Agence?.Agence_Infos ? Agence?.Agence_Infos : "",
    agence: Agence?.En_Agence ? Agence?.En_Agence : false,
  };

  return { profilInitialValues };
};

export default useServeInitialValueProfil;
