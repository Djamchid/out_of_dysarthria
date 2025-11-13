# Prochaines étapes - Out of Dysarthria V1.0

## ⚠️ Actions requises avant déploiement

### 1. Générer les icônes PNG (REQUIS)

Les icônes PWA doivent être générées pour que l'application soit installable :

```bash
# Option 1 : Avec ImageMagick (recommandé)
brew install imagemagick  # macOS
# ou
sudo apt-get install imagemagick  # Ubuntu/Debian

./generate-icons.sh

# Option 2 : En ligne (plus simple)
# 1. Aller sur https://realfavicongenerator.net/
# 2. Uploader assets/icons/icon.svg
# 3. Télécharger les icônes générées
# 4. Copier icon-192.png et icon-512.png dans assets/icons/
```

### 2. Tests fonctionnels

Suivre le guide complet dans [TESTING.md](TESTING.md)

```bash
# Lancer le serveur de test
python3 -m http.server 8000

# Ouvrir http://localhost:8000
# Suivre la checklist de tests
```

### 3. Validation Lighthouse

```bash
# Installer Lighthouse
npm install -g lighthouse

# Lancer l'audit
lighthouse http://localhost:8000 --view
```

**Scores cibles :**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- PWA: 100
- SEO: > 80

## 🚀 Déploiement

### Option 1 : Netlify (Recommandé)

1. **Créer un compte** sur [netlify.com](https://netlify.com)

2. **Déployer depuis GitHub**
   ```bash
   # Pousser le code sur GitHub
   git add .
   git commit -m "Release V1.0.0"
   git push origin claude/brainstorming-session-011CV5mubCKXsTuPSgPjFHyr

   # Créer une PR ou merger vers main
   ```

3. **Configurer Netlify**
   - Connecter le repo GitHub
   - Build command: (vide - pas de build)
   - Publish directory: `/`
   - Déployer

4. **HTTPS automatique** : Netlify fournit un certificat SSL gratuit

### Option 2 : GitHub Pages

```bash
# Dans les settings du repo GitHub
# Settings > Pages > Source > Branch: main

# L'app sera disponible sur :
# https://djamchid.github.io/out_of_dysarthria/
```

⚠️ **Important** : Modifier le `start_url` et `scope` dans `manifest.json` :

```json
{
  "start_url": "/out_of_dysarthria/",
  "scope": "/out_of_dysarthria/"
}
```

### Option 3 : Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

## 📱 Tests post-déploiement

### 1. Test sur iOS (iPhone)

1. Ouvrir l'URL de prod dans Safari
2. Appuyer sur "Partager" → "Sur l'écran d'accueil"
3. Vérifier l'icône sur l'écran d'accueil
4. Ouvrir l'app (doit s'ouvrir en standalone)
5. Activer le mode avion
6. Vérifier que l'app fonctionne offline
7. Compléter un parcours complet

### 2. Test sur Android

1. Ouvrir l'URL de prod dans Chrome
2. Appuyer sur "Installer l'application" (bannière ou menu)
3. Vérifier l'icône dans le drawer d'apps
4. Ouvrir l'app
5. Activer le mode avion
6. Vérifier fonctionnement offline
7. Compléter un parcours complet

### 3. Test Desktop

1. Ouvrir dans Chrome desktop
2. Icône d'installation dans la barre d'adresse
3. Installer
4. Ouvrir comme app native
5. Tester la navigation clavier

## 🐛 Debug en production

### Service Worker ne s'installe pas

```javascript
// Dans DevTools > Console
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Service Workers:', regs);
});

// Forcer la mise à jour
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.update());
});
```

### localStorage ne fonctionne pas

```javascript
// Tester la disponibilité
console.log('localStorage disponible:', 'localStorage' in window);

// Voir le contenu
console.log('Session actuelle:', localStorage.getItem('currentSession'));
console.log('Historique:', localStorage.getItem('sessionsHistory'));
```

### Icônes ne s'affichent pas

1. Vérifier que les fichiers PNG existent dans `assets/icons/`
2. Vérifier le cache du navigateur
3. Vider le cache et recharger
4. Vérifier la console pour les erreurs 404

## 📊 Analytics (optionnel)

Pour suivre l'utilisation (respectant la vie privée) :

### Option 1 : Plausible (Respectueux de la vie privée)

```html
<!-- Dans index.html, avant </head> -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Option 2 : Simple Analytics

```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

⚠️ **Note** : Pas de Google Analytics (trop intrusif pour une app santé)

## 🔄 Mises à jour futures

### Pour déployer une mise à jour

1. **Modifier le code**
2. **Incrémenter la version** dans :
   - `manifest.json` (name ou version si ajouté)
   - `service-worker.js` (CACHE_NAME: 'out-of-dysarthria-v1.0.1')
3. **Tester localement**
4. **Pousser sur GitHub**
5. **Déploiement automatique** (Netlify/Vercel)
6. **Vérifier en production**

### Gestion du cache utilisateur

Quand une nouvelle version est déployée :

1. Le Service Worker détecte la nouvelle version
2. Les utilisateurs verront la mise à jour au prochain chargement
3. Possibilité d'ajouter une notification "Nouvelle version disponible"

## 📣 Partage et feedback

### Beta testeurs

1. **Créer une liste** de 5-10 beta testeurs
2. **Partager l'URL de prod**
3. **Fournir un questionnaire** :
   - L'app vous a-t-elle aidé ?
   - Temps moyen par parcours ?
   - Fonctionnalités manquantes ?
   - Bugs rencontrés ?

### Formulaire de feedback (V1.1)

Remplacer le `prompt()` par un vrai formulaire :
- Intégration avec Formspree, Netlify Forms, ou Google Forms
- Questions : Efficacité (1-5), Commentaires, Bugs

## 🎯 Objectifs de lancement

- [ ] 10 beta testeurs pendant 2 semaines
- [ ] Taux de complétion > 70%
- [ ] Aucun bug critique
- [ ] Feedback positif (>4/5 en moyenne)
- [ ] Décision go/no-go pour V2.0

## 📅 Timeline suggéré

**Semaine 1** : Tests et génération d'icônes
- Jour 1-2 : Générer icônes, tests fonctionnels
- Jour 3-4 : Tests multi-devices
- Jour 5 : Corrections de bugs

**Semaine 2** : Déploiement beta
- Jour 1 : Déploiement production
- Jour 2 : Tests post-déploiement
- Jour 3-7 : Beta test avec 5 utilisateurs

**Semaine 3-4** : Feedback et itérations
- Recueil feedback
- Corrections bugs V1.0.1
- Décision features V1.1

**Semaine 5+** : Déploiement public ou V2.0

---

**Version du document** : 1.0
**Dernière mise à jour** : 2025-11-13
