# Out of Dysarthria

> Parcours guidé de récupération vocale pour personnes souffrant de dysarthrie épisodique

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Djamchid/out_of_dysarthria)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📋 Description

**Out of Dysarthria** est une application web progressive (PWA) conçue pour aider les personnes confrontées à des épisodes de dysarthrie à retrouver progressivement leur parole. L'application propose un parcours structuré en 8 étapes, allant des voyelles simples aux phrases complètes.

### Fonctionnalités V1.0

✅ Parcours standard linéaire de 8 étapes
✅ Interface minimaliste et intuitive
✅ Chronomètre par étape
✅ Sauvegarde automatique de la progression
✅ Reprise après interruption
✅ Fonctionnement 100% offline
✅ Installable sur mobile (PWA)
✅ Historique des 10 dernières sessions

## 🚀 Installation

### Option 1 : Utilisation directe (PWA)

1. Ouvrez l'application dans votre navigateur
2. Sur iOS : Appuyez sur "Partager" → "Sur l'écran d'accueil"
3. Sur Android : Appuyez sur "Installer l'application" dans le menu du navigateur

### Option 2 : Développement local

```bash
# Cloner le repository
git clone https://github.com/Djamchid/out_of_dysarthria.git
cd out_of_dysarthria

# Lancer un serveur local
# Option 1 : Python 3
python -m http.server 8000

# Option 2 : Node.js (avec npx)
npx http-server -p 8000

# Option 3 : PHP
php -S localhost:8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

## 📱 Utilisation

### Démarrage

1. Ouvrez l'application
2. Appuyez sur "Commencer le parcours"
3. Suivez les étapes une par une

### Parcours standard

Le parcours comprend 8 étapes :

1. **Voyelles isolées** : a, e, i, o, u, é, è, ou, on, an
2. **Consonnes simples** : m, n, p, b, t, d
3. **Syllabes CV** : ma, me, mi, pa, pe, pi, etc.
4. **Chuchotements** : répétition des syllabes en chuchotant
5. **Consonnes complexes** : ch, j, s, f, v, z, r, l
6. **Syllabes complexes** : cha, je, si, fa, etc.
7. **Mots courts** : maman, papa, bonjour, merci, etc.
8. **Phrase de validation** : "Je retrouve ma voix progressivement"

### Contrôles

- **C'est fait** : Passer à l'étape suivante
- **Répéter** : Recommencer l'étape actuelle (reset le timer)
- **Abandonner** : Sauvegarder et revenir à l'accueil
- **Reprendre** : Continuer depuis la dernière étape (si parcours interrompu)

### Navigation clavier

- **Espace** : Valider l'étape courante
- **Échap** : Fermer la modale d'abandon

## 🏗️ Architecture

### Structure des fichiers

```
out_of_dysarthria/
├── index.html              # Point d'entrée
├── manifest.json           # Configuration PWA
├── service-worker.js       # Cache offline
├── README.md
├── css/
│   ├── reset.css          # Normalisation
│   ├── variables.css      # Design tokens
│   ├── layout.css         # Structure
│   └── components.css     # Composants UI
├── js/
│   ├── app.js            # Contrôleur principal
│   ├── parcours.js       # Définition du parcours
│   ├── ui.js             # Manipulation DOM
│   ├── storage.js        # Gestion localStorage
│   └── timer.js          # Chronométrage
└── assets/
    └── icons/
        ├── icon.svg
        ├── icon-192.png
        └── icon-512.png
```

### Modules JavaScript

#### `app.js` - Contrôleur principal
Orchestre l'application, gère la navigation entre écrans et coordonne les modules.

#### `parcours.js` - Gestion du parcours
- Définition des 8 étapes
- Navigation (suivant/précédent)
- Calcul de progression

#### `ui.js` - Interface utilisateur
- Manipulation du DOM
- Rendu des étapes selon le mode d'affichage
- Gestion des modales

#### `storage.js` - Persistance des données
- Wrapper localStorage avec gestion d'erreurs
- Sauvegarde des sessions
- Historique
- Formatage des durées

#### `timer.js` - Chronométrage
- Chronomètre par étape
- Callbacks (onTick, onStart, onPause)
- Formatage du temps

### Stockage des données

L'application utilise `localStorage` avec 3 clés principales :

```javascript
// Session en cours
currentSession: {
  id: "session_xxx",
  startedAt: "2025-11-13T10:00:00Z",
  currentStepIndex: 2,
  stepsCompleted: [...],
  isActive: true
}

// Historique (10 dernières sessions)
sessionsHistory: [
  {
    id: "session_xxx",
    startedAt: "...",
    completedAt: "...",
    totalDuration: 1125,
    completed: true,
    stepsCount: 8
  }
]

// Préférences
preferences: {
  darkMode: false,
  version: "1.0.0"
}
```

## 🎨 Design

### Palette de couleurs

- **Primaire** : `#2C3E50` (Bleu marine)
- **Secondaire** : `#27AE60` (Vert)
- **Danger** : `#E74C3C` (Rouge)
- **Fond clair** : `#FAFAFA`
- **Fond sombre** : `#1E1E1E` (mode sombre)

### Principes

- **Mobile-first** : Optimisé pour smartphones
- **Accessibilité** : WCAG 2.1 niveau AA
- **Minimalisme** : Interface sobre et professionnelle
- **Performance** : < 500 KB, chargement < 2s

## 🔧 Compatibilité

### Navigateurs supportés

- **iOS** : Safari 14+ (iPhone 8+)
- **Android** : Chrome 90+
- **Desktop** : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Prérequis techniques

- JavaScript ES6+
- localStorage (10 MB)
- Service Worker (pour PWA)

## 📊 Performance

### Lighthouse scores cibles

- **Performance** : > 90
- **Accessibility** : > 90
- **Best Practices** : > 90
- **PWA** : 100
- **SEO** : > 80

### Métriques

- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Total Bundle Size** : < 500 KB

## 🛣️ Roadmap

### V1.1 (prochaine version mineure)
- Mode sombre automatique
- Export CSV des sessions
- Amélioration du feedback utilisateur

### V2.0 (parcours adaptatifs)
- Points de bifurcation selon les blocages
- Parcours alternatifs pré-définis
- Mémorisation des parcours réussis
- Statistiques avancées

### V3.0 (intelligence contextuelle)
- Checkpoints sensoriels (miroir caméra)
- Apprentissage des patterns
- Suggestions proactives
- Bibliothèque d'exercices enrichie

### V4.0+ (intégration écosystème)
- Context-awareness (calendrier, lieu, météo)
- Mode urgence avec widget
- Intégration wearables
- Télé-rééducation

## 🧪 Tests

### Tests manuels

```bash
# Checklist V1.0
- [ ] Installation PWA sur iOS
- [ ] Installation PWA sur Android
- [ ] Fonctionnement offline complet
- [ ] Sauvegarde automatique
- [ ] Reprise après interruption
- [ ] Tous les boutons fonctionnels
- [ ] Responsive mobile/tablette/desktop
- [ ] Navigation clavier (Espace, Échap)
- [ ] Historique des sessions
```

### Tests de performance

```bash
# Lighthouse CI
npx lighthouse http://localhost:8000 --view
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

### Workflow

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Djamchid**

- GitHub: [@Djamchid](https://github.com/Djamchid)

## 🙏 Remerciements

- Utilisateurs testeurs pour leurs retours précieux
- Communauté des personnes vivant avec la dysarthrie
- Orthophonistes ayant contribué à la validation du parcours

## 📞 Support

Pour toute question ou problème :

- Ouvrir une [issue](https://github.com/Djamchid/out_of_dysarthria/issues)
- Consulter la [documentation](https://github.com/Djamchid/out_of_dysarthria/wiki)

---

**Note** : Cette application ne remplace pas un suivi médical professionnel. En cas de dysarthrie persistante, consultez un orthophoniste ou un médecin.
