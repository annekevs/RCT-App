const DEMANDE_STATUT = {
  nouveau: {
    valeur: 0,
    description: "Nouvelle demande",
  },
  en_attente: {
    valeur: 1,
    description: "Demande en attente",
  },
  accepte: {
    valeur: 2,
    description: "Demande acceptée",
  },
  rejete: {
    valeur: 3,
    description: "Demande rejetée",
  },
};

const DEMANDE_TYPE = {
  adhesion: {
    valeur: 1,
    description: "Demande d'adhésion",
  },
  statistique: {
    valeur: 2,
    description: "Demande de statistiques",
  },
};

exports.INFO_DEMANDES = {
  type: DEMANDE_TYPE,
  statut: DEMANDE_STATUT,
};

exports.USER_ROLES = {
  admin: "1111", // super admin
  praticien: "0110", // super praticien
  assitant: "0011", // super assistant
  gerant: "0111", //super assistant
};
