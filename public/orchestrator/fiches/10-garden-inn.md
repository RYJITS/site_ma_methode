# Garden Inn

## Liens vers l'application
- Lien public: [https://bukitlawang-garden-inn.com](https://bukitlawang-garden-inn.com)
- GitHub: [https://github.com/RYJITS/garden-inn](https://github.com/RYJITS/garden-inn)

## A quoi sert le projet
Garden Inn est le site vitrine de Bukit Lawang Garden Inn. Il presente l'hebergement, les chambres, le restaurant, les excursions, les transferts, les packages et les informations de contact pour convertir les visiteurs en reservations.

## Fonctionnement de l'application ou du projet
L'application React affiche les sections principales et suit la section active pendant le scroll. Les donnees de chambres, excursions, transferts et packages sont traduites selon la langue choisie. Les prix en roupies peuvent etre convertis dans plusieurs devises. Les liens de reservation directe, email, itineraire Google Maps et notes Google Places guident l'utilisateur vers l'action.

## Comment le projet a ete construit
Le site a ete concu comme une vitrine touristique orientee reservation. Le contenu est structure par parcours visiteur: decouvrir le lieu, comprendre les offres, filtrer les transferts ou excursions, puis reserver ou contacter.

## Installation et utilisation
### Installation
Installation locale standard pour la version partageable du projet:

```powershell
npm install
npm run build
npm run dev
```

### Utilisation
Lancer le serveur de developpement, ouvrir l'adresse locale indiquee par l'outil, puis utiliser l'interface principale du projet.

## Fonctions disponibles dans l'application
- Presenter les chambres
- Presenter restaurant, excursions et packages
- Afficher les transferts
- Changer de langue
- Changer de devise
- Convertir les prix
- Ouvrir la reservation directe
- Creer un itineraire Google Maps
- Afficher une note Google Places avec fallback

## Outils, IA et moteurs en arriere-plan
- Fichiers de traduction
- Convertisseur de devise
- Frankfurter exchange rates
- Google Maps route URL
- Google Places rating
- Lien booking direct
- Fallback image
- Navigation active au scroll

## Automatisations integrees
- Chargement automatique des traductions avec fallback anglais
- Sauvegarde langue/devise en localStorage
- Conversion dynamique des prix IDR vers EUR/USD/GBP/AUD/SGD/CHF
- Detection de section active par IntersectionObserver
- Cache-busting des images avec APP_VERSION
- Fallback image en cas d'erreur
- Rating Google Places avec fallback
- Generation de routes Google Maps pour les transferts

## Captures d'ecran
![Capture 1 - garden-inn](../captures/10-garden-inn/10-garden-inn-2026-06-25_03-17-59-desktop.png)

![Capture 2 - garden-inn](../captures/10-garden-inn/10-garden-inn-2026-06-25_03-17-59-mobile.png)

## Mises a jour
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
