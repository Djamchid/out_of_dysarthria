# Tests et Validation - Out of Dysarthria V1.0

## ✅ Checklist de validation

### Structure du projet

- [x] Structure de dossiers créée (css/, js/, assets/icons/)
- [x] Tous les fichiers HTML/CSS/JS présents
- [x] manifest.json configuré
- [x] service-worker.js implémenté
- [x] README.md complet
- [x] .gitignore créé

### Validation du code

- [x] HTML valide (structure sémantique)
- [x] CSS valide (reset, variables, layout, components)
- [x] JavaScript syntaxiquement correct (tous les modules)
  - [x] parcours.js
  - [x] storage.js
  - [x] timer.js
  - [x] ui.js
  - [x] app.js

### Taille des fichiers

```
CSS Total:  ~17 KB
- reset.css:      1.5 KB
- variables.css:  2.5 KB
- layout.css:     8.0 KB
- components.css: 5.1 KB

JavaScript Total: ~41 KB
- parcours.js:  5.0 KB
- storage.js:   9.1 KB
- timer.js:     4.1 KB
- ui.js:       12.0 KB
- app.js:      11.0 KB

HTML: ~5 KB

TOTAL: ~63 KB (bien en dessous de l'objectif de 500 KB)
```

## 🧪 Tests fonctionnels à effectuer

### 1. Test d'installation (local)

```bash
# Lancer un serveur local
python3 -m http.server 8000
# Ou
npx http-server -p 8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

### 2. Tests d'écrans

- [ ] **Écran d'accueil**
  - [ ] Titre affiché correctement
  - [ ] Bouton "Commencer le parcours" visible et cliquable
  - [ ] Bouton "Reprendre" caché initialement
  - [ ] Info de dernière session cachée initialement

- [ ] **Écran d'exercice**
  - [ ] Header avec bouton "Abandonner" et timer
  - [ ] Numéro d'étape affiché (ex: "Étape 1/8")
  - [ ] Barre de progression fonctionnelle
  - [ ] Titre et instruction de l'étape affichés
  - [ ] Contenu de l'étape rendu correctement
  - [ ] Boutons "C'est fait" et "Répéter" fonctionnels

- [ ] **Écran de complétion**
  - [ ] Message "Parcours terminé" affiché
  - [ ] Durée totale correctement calculée
  - [ ] Bouton "Terminer" ramène à l'accueil
  - [ ] Lien feedback optionnel présent

### 3. Tests de navigation

- [ ] Clic sur "Commencer" → Écran d'exercice (étape 1)
- [ ] Clic sur "C'est fait" → Étape suivante
- [ ] Clic sur "Répéter" → Timer reset, même étape
- [ ] Clic sur "Abandonner" → Modale de confirmation
- [ ] Modale : "Annuler" → Ferme la modale
- [ ] Modale : "Abandonner" → Retour accueil
- [ ] Compléter 8 étapes → Écran de complétion
- [ ] Écran complétion : "Terminer" → Accueil

### 4. Tests du timer

- [ ] Timer démarre automatiquement à chaque étape
- [ ] Timer affiche le format MM:SS
- [ ] Timer se met en pause lors de l'abandon
- [ ] Timer se reset lors du clic sur "Répéter"
- [ ] Durée correctement enregistrée pour chaque étape

### 5. Tests de persistance (localStorage)

- [ ] **Session en cours**
  - [ ] Démarrer un parcours → session créée
  - [ ] Rafraîchir la page → Session persiste
  - [ ] Bouton "Reprendre" apparaît
  - [ ] Clic sur "Reprendre" → Retour à l'étape correcte

- [ ] **Historique**
  - [ ] Compléter un parcours → Ajouté à l'historique
  - [ ] Info "Dernière utilisation" affichée à l'accueil
  - [ ] Historique limité à 10 sessions

- [ ] **Sauvegarde automatique**
  - [ ] Progression sauvegardée toutes les 5 secondes
  - [ ] Fermeture brutale de l'onglet → Progression sauvegardée
  - [ ] Batterie qui meurt → Reprise possible au redémarrage

### 6. Tests des modes d'affichage

- [ ] **Mode "spaced"** (Étape 1, 2, 5)
  - [ ] Phonèmes affichés espacés horizontalement
  - [ ] Taille de police grande (48px+)

- [ ] **Mode "grouped"** (Étape 3, 4, 6)
  - [ ] Syllabes groupées par lignes
  - [ ] Séparateur " · " entre syllabes

- [ ] **Mode "list"** (Étape 7)
  - [ ] Mots affichés en liste verticale
  - [ ] Fond gris pour chaque mot

- [ ] **Mode "single"** (Étape 8)
  - [ ] Phrase unique centrée
  - [ ] Fond gris, police lisible

### 7. Tests PWA

- [ ] **Service Worker**
  - [ ] Service Worker s'enregistre au chargement
  - [ ] Fichiers mis en cache
  - [ ] Fonctionne en mode avion (offline)

- [ ] **Manifest**
  - [ ] Installable sur écran d'accueil (mobile)
  - [ ] Icône de l'app visible (après génération PNG)
  - [ ] Mode standalone (sans barre d'adresse)
  - [ ] Couleur de thème appliquée

### 8. Tests responsive

- [ ] **Mobile (375px - iPhone SE)**
  - [ ] Layout vertical adapté
  - [ ] Boutons suffisamment grands (48px min)
  - [ ] Texte lisible (16px min)
  - [ ] Pas de scroll horizontal

- [ ] **Tablette (768px)**
  - [ ] Conteneur max-width appliqué
  - [ ] Tailles de police augmentées
  - [ ] Layout reste vertical

- [ ] **Desktop (1024px+)**
  - [ ] Conteneur centré (max 800px)
  - [ ] Navigation clavier fonctionnelle
  - [ ] Espace pour valider l'étape
  - [ ] Échap pour fermer la modale

### 9. Tests d'accessibilité

- [ ] **Navigation clavier**
  - [ ] Tab pour naviguer entre boutons
  - [ ] Espace pour activer le bouton principal
  - [ ] Échap pour fermer la modale
  - [ ] Focus visible sur tous les éléments

- [ ] **Contraste**
  - [ ] Ratio texte/fond ≥ 4.5:1
  - [ ] Boutons visuellement distincts

- [ ] **Screen readers**
  - [ ] Labels ARIA appropriés (à vérifier avec VoiceOver/TalkBack)
  - [ ] Structure sémantique HTML

### 10. Tests de performance

- [ ] **Chargement**
  - [ ] Page se charge en < 2 secondes (3G)
  - [ ] First Contentful Paint < 1s

- [ ] **Interactions**
  - [ ] Clic sur bouton → Réaction < 100ms
  - [ ] Changement d'étape fluide

- [ ] **Lighthouse**
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] PWA = 100

## 🐛 Bugs connus et limitations V1.0

### Bugs connus
- [ ] Aucun pour le moment

### Limitations acceptées (V1.0)
- ❌ Pas de parcours adaptatifs (prévu V2.0)
- ❌ Pas d'enregistrement audio (prévu V2.0+)
- ❌ Pas de statistiques avancées (prévu V2.0)
- ❌ Pas de mode sombre automatique (prévu V1.1)
- ❌ Feedback utilisateur basique (prompt) (prévu V1.1)
- ⚠️ Icônes PNG à générer manuellement (guide fourni)

## 📝 Notes de test

### Setup requis

1. **Serveur local** : Nécessaire pour tester le Service Worker (HTTPS ou localhost)
2. **Icônes PNG** : Générer avec le script fourni ou manuellement
3. **Navigateurs** : Tester sur Safari (iOS), Chrome (Android), Firefox, Edge

### Outils de test

- **Lighthouse** : `npx lighthouse http://localhost:8000 --view`
- **DevTools** : Console JavaScript, Network tab, Application tab (Service Workers)
- **Responsive** : Mode responsive dans DevTools (tester différentes résolutions)

### Procédure de test complète

1. Lancer le serveur local
2. Ouvrir l'app dans le navigateur
3. Suivre la checklist ci-dessus
4. Noter les bugs trouvés
5. Tester en mode offline (mode avion)
6. Installer comme PWA et retester
7. Lancer Lighthouse et vérifier les scores

## ✅ Validation finale

- [ ] Tous les tests fonctionnels passent
- [ ] Aucun bug bloquant
- [ ] Lighthouse scores > objectifs
- [ ] Testé sur iOS et Android
- [ ] PWA installable et fonctionnelle offline
- [ ] Documentation complète (README, TESTING)

## 🚀 Prêt pour le déploiement

Une fois tous les tests validés :

1. Générer les icônes PNG (192x192 et 512x512)
2. Pousser sur GitHub
3. Déployer sur Netlify ou GitHub Pages
4. Tester en production
5. Partager avec les beta-testeurs

---

**Date de validation** : _À compléter_
**Testeur** : _À compléter_
**Version testée** : 1.0.0
