# Pour Flore ♡

Une expérience d'anniversaire interactive, créée spécialement pour une personne exceptionnelle.

## Expérience incluse

- accueil avec prénom animé et pétales
- cadeau virtuel à ouvrir
- lettre avec enveloppe interactive
- dix cartes retournables et personnalisables
- galerie artistique pour les souvenirs
- surprise secrète émotionnelle
- grand final avec célébration
- musique facultative, lancée seulement après un clic
- navigation clavier avec les touches gauche/droite
- préférences de mouvement réduit prises en compte
- mise en page adaptée aux mobiles, tablettes et ordinateurs

## Ajouter la musique

Placez un fichier MP3 dans :

```text
assets/music.mp3
```

Puis cliquez sur le bouton rond « Notre mélodie » sur le site.

## Ajouter des photos

Placez les images dans `assets/`, puis remplacez les blocs `.photo-placeholder` dans `index.html` par :

```html
<img src="assets/photo-1.jpg" alt="Notre souvenir">
```

Ajoutez ensuite une légende dans l'élément `<span>` suivant.

## Modifier les textes

- Le message principal se trouve dans `index.html`.
- Les dix raisons sont dans le tableau `reasons` de `script.js`.
- Les couleurs principales sont dans les variables au début de `styles.css`.

## Publication

Activez GitHub Pages depuis **Settings → Pages**, puis choisissez la branche `main` et le dossier `/ (root)`.
