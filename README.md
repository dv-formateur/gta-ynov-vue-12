# gta

###Lien
```
https://gta-ynov-cours.herokuapp.com
```

###Compte
```
salarie : salarie@gta.com/P@ssw0rd
responsable : responsable@gta.com/P@ssw0rd
drh : drh@gta.com/P@ssw0rd
```

###TODO
```
Set up RBAC routing (Salarié, DRH, Reponsable d'équipe)
Salarié:
  Profil (date de naissance, adresse, numéros de téléphone, adresse email)
  Planning (horaires de travail, congés, absence, etc…)
  Affiche pour chaque jour :
  Horaires (1-n)
  Le type de d’occupation (absence, congé, travail)
  Affichage du compteur d’heures/ j/s/a
  Il faut tenir compte de la date de fin de contrat
  Accéder au tableau de bord personnel:
  Informations de base relatives à son contrat en cours :
  Date de début, date de fin (si existante) et ,nombre d’heures/semaine
  Bilan d’annualisation pour le contrat en cours ?
  Solde de congés pour le contrat en cours
  Filtrer pour différents contrats
  Demander des modifications (congé payé, récupération de temps de travail, aménagement d’horaire) de planning à son responsable d’équipe. Les demandes doivent être validées. 
  Imprimer un document récapitulatif de ses congés (acquis, pris, solde) et dates associées.
  
Responsable d’équipe: 
  /!\ Le responsable d’équipe est aussi un salarié pour son propre planning
  mobile ou tablette
  Ajouter un salarié et compléter sa fiche avec les informations 
  nom, prénom, date de naissance, adresse, numéros de téléphone, adresse email
  Contrat : date de début, date de fin, motif, nombre d’heures hebdomadaires et ETP (calculé à partir du nombre d’heures hebdomadaires), poste occupé
  Planning des membre de l’équipe (synthétisé), sélection de salariés et périodes (jour/semaine/mois/année/date to date)
  Avoir un affichage récapitulatif des non-respects de la durée de temps de travail. Pouvoir modifier la/les journée en question. Des filtres sont disponibles pour réduire l’affichage en fonction d’une période choisie et/ou d’un salarié spécifique. 
  Imprimer un planning hebdomadaire de son équipe, reprenant le compteur d’heures et le solde d’annualisation et le solde de congés
  Traitement des demandes de congés
  Modifier le planning des salariés qu’il gère (horaires, pose d’absences et congés)
  Création d’un planning prévisionnel pour un salarié sur la base d’une semaine type (potentiellement spécifique à chaque salarié)
  Pouvoir poser un jour de congé sur tout les jours fériés de l’année
  
DRH: 
  mobile ou tablette
  Paramétrer les motifs d’absence
```

###TODO / DONE
```
08/11/2018:
- Création du projet
- Mise en place de l'authentification
- Mise en place de la gestion de role

09/11/2018 :
- Mise en place de la navbar adaptative et réflexion sur la structure du projet


15/11/2018: 
- 

16/11/2018:
- Gestion des motifs d'absences (drh)

22/11/2018 :
- 

```
