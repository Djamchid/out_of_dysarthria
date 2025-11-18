# Spécifications Fonctionnelles - Out of Dysarthria V2.0

> **Statut** : 📋 PLANIFIÉ
> **Date estimée** : Q2 2025 (2-3 mois après V1.0)
> **Prérequis** : V1.0 déployée, retours beta testeurs analysés

## 📋 Vue d'ensemble

### Objectif
Transformer l'application d'un parcours linéaire unique en un système adaptatif capable de détecter les blocages et de proposer des parcours alternatifs selon le type de difficulté rencontré.

### Positionnement
Version majeure ajoutant l'intelligence adaptative basée sur les retours utilisateurs de la V1.0 : "le parcours standard ne marche pas toujours".

### Hypothèses à valider (depuis V1.0)
- Les utilisateurs rencontrent différents types de blocages
- Un parcours unique ne convient pas à tous les épisodes
- Les utilisateurs peuvent identifier leur type de blocage
- Certains parcours sont plus efficaces selon les contextes

---

## 🎯 Nouvelles fonctionnalités

### F1 - Points de bifurcation

**Description** : Mécanisme permettant de changer de parcours en cours de session

**Trigger points** :
- Manuel : Bouton "Ça ne marche pas" sur chaque étape
- Automatique (optionnel) : Après 3 répétitions de la même étape
- Proactif : Suggestion selon l'historique

**Flow utilisateur** :
```
Étape N → "Ça ne marche pas"
       ↓
Menu de diagnostic
       ↓
Sélection du blocage
       ↓
Parcours alternatif
```

### F2 - Menu de diagnostic

**Interface** :
```
┌─────────────────────────────────────┐
│  Quel type de difficulté ?          │
├─────────────────────────────────────┤
│  😓 Bandes ventriculaires           │
│     (vibrations parasites)          │
│                                     │
│  💪 Spasticité musculaire           │
│     (muscles trop tendus)           │
│                                     │
│  😴 Fatigue importante              │
│     (manque d'énergie)              │
│                                     │
│  🌀 Autre / Ne sais pas             │
│     (parcours standard modifié)     │
└─────────────────────────────────────┘
```

**Caractéristiques** :
- Langage simple et accessible
- Icônes visuelles pour identification rapide
- Descriptions courtes (1 ligne)
- Option "Ne sais pas" par défaut

### F3 - Parcours alternatifs

#### Parcours A : Détente laryngée (Bandes ventriculaires)

**Objectif** : Relâcher la tension du larynx avant de reprendre la phonation

**Étapes** :
1. **Respiration profonde** : 3 cycles (inspir 4s, expir 6s)
2. **Bâillements** : 5 bâillements contrôlés
3. **Sons graves relâchés** : "hhhhh", "aaaah" très doux
4. **Chuchotements prolongés** : Syllabes en chuchotant
5. **Voyelles ouvertes** : a, o en voix douce
6. **Transition progressive** : Retour au parcours standard étape 3

**Durée estimée** : 5-7 minutes

**Indicateur de succès** : Sensation de relâchement dans la gorge

#### Parcours B : Relâchement musculaire (Spasticité)

**Objectif** : Détendre les muscles articulatoires

**Étapes** :
1. **Massage facial** : Joues, mâchoires, lèvres (2 min)
2. **Mouvements passifs** : Mobilisation douce de la mâchoire
3. **Consonnes douces** : m, n, l (pas de plosives)
4. **Syllabes fluides** : ma, na, la en continu
5. **Sons soutenus** : Tenue de voyelles (5s chacune)
6. **Transition progressive** : Retour au parcours standard étape 2

**Durée estimée** : 6-8 minutes

**Indicateur de succès** : Mobilité faciale retrouvée

#### Parcours C : Mode économie (Fatigue)

**Objectif** : Récupération vocale avec effort minimal

**Étapes** :
1. **Repos silencieux** : 30 secondes de pause
2. **Chuchotements uniquement** : Pas de voix sonorisée
3. **Voyelles chuchotées** : a, i, o
4. **Mots courts chuchotés** : Liste réduite (5 mots)
5. **Test voix douce** : Phrase courte en voix très douce
6. **Validation** : "Je reprends doucement"

**Durée estimée** : 3-4 minutes

**Indicateur de succès** : Capacité à chuchoter clairement

#### Parcours D : Standard modifié (Ne sais pas)

**Objectif** : Variation du parcours standard avec emphase sur la progression douce

**Étapes** :
1. **Voyelles prolongées** : a, e, i, o, u (3s chacune)
2. **Consonnes nasales** : m, n (plus faciles)
3. **Syllabes répétées** : ma-ma-ma, na-na-na
4. **Chuchotements** : Étape habituelle
5. **Retour progressif** : Étapes standard 5-8

**Durée estimée** : 10-12 minutes

**Indicateur de succès** : Progression sans blocage

### F4 - Mémorisation et apprentissage

#### Tracking des parcours réussis

**Données enregistrées** :
```javascript
{
  sessionId: "...",
  context: {
    timeOfDay: "morning|afternoon|evening|night",
    dayOfWeek: "monday|...|sunday",
    selectedBlockage: "ventricular|spasticity|fatigue|unknown|none"
  },
  parcoursUsed: {
    initial: "standard",
    switches: [
      { fromStep: 3, toBlockage: "ventricular", toParcours: "A" }
    ]
  },
  outcome: {
    completed: true,
    totalDuration: 780,
    userRating: 4  // Nouveau: note de satisfaction 1-5
  }
}
```

#### Suggestions intelligentes

**Algorithme simple** :
```javascript
// Si pattern détecté dans historique
if (lastThreeSessions.allUsed("parcoursA") &&
    currentContext.timeOfDay === lastThreeSessions.context.timeOfDay) {
  suggest("Parcours A - Détente laryngée");
}

// Si blocage récurrent
if (last5Sessions.blockageFrequency("ventricular") > 60%) {
  suggestAtStart("Démarrer directement par Parcours A ?");
}
```

**Interface de suggestion** :
```
┌─────────────────────────────────────┐
│  💡 Suggestion                      │
├─────────────────────────────────────┤
│  D'après votre historique, le       │
│  Parcours A (Détente laryngée)      │
│  fonctionne bien le matin.          │
│                                     │
│  [Utiliser Parcours A]              │
│  [Parcours standard]                │
└─────────────────────────────────────┘
```

### F5 - Statistiques basiques

#### Écran "Statistiques"

**Accessible depuis** : Menu accueil (icône 📊 en haut à droite)

**Contenu** :
```
┌─────────────────────────────────────┐
│  📊 Vos statistiques                │
├─────────────────────────────────────┤
│  Sessions complétées    : 12/15     │
│  Taux de réussite       : 80%       │
│  Durée moyenne          : 14 min    │
│                                     │
│  Parcours les plus efficaces :      │
│  1. Standard           (8 fois)     │
│  2. Détente laryngée   (3 fois)     │
│  3. Mode économie      (1 fois)     │
│                                     │
│  Blocages fréquents :               │
│  • Bandes ventriculaires : 40%      │
│  • Fatigue              : 20%       │
│                                     │
│  [Voir l'historique détaillé]       │
└─────────────────────────────────────┘
```

**Graphiques** (simple, CSS pur) :
- Barre de progression hebdomadaire
- Histogramme des durées
- Répartition des parcours (camembert textuel)

### F6 - Personnalisation initiale

#### Wizard de première utilisation (onboarding)

**Étape 1 : Bienvenue**
```
Bienvenue sur Out of Dysarthria !

Cette app vous aide à retrouver votre voix
lors des épisodes de dysarthrie.

[Commencer]  [J'ai déjà utilisé l'app]
```

**Étape 2 : Parcours favoris**
```
Sélectionnez vos parcours favoris
(vous pourrez changer plus tard)

□ Standard
□ Détente laryngée (bandes ventriculaires)
□ Relâchement musculaire (spasticité)
□ Mode économie (fatigue)

[Suivant]
```

**Étape 3 : Durée par étape**
```
Temps par défaut pour chaque étape :

○ Rapide (15-20s)
● Normal (30s)  [recommandé]
○ Lent (60s)

Vous pourrez toujours répéter ou passer.

[Terminer]
```

#### Sauvegarde des préférences

```javascript
preferences: {
  onboardingCompleted: true,
  favoriteParcours: ["standard", "A", "C"],
  defaultStepDuration: 30,
  showSuggestions: true,
  autoSaveInterval: 5000,
  darkMode: false
}
```

---

## 🎨 Design (évolutions)

### Nouvelles couleurs

```css
/* Codes couleur pour les parcours */
--parcours-standard: #2C3E50
--parcours-a: #3498DB       /* Bleu clair - détente */
--parcours-b: #9B59B6       /* Violet - relâchement */
--parcours-c: #F39C12       /* Orange - économie */
--parcours-d: #95A5A6       /* Gris - modifié */
```

### Nouveaux composants

**Badge parcours** :
```html
<span class="parcours-badge parcours-a">
  Parcours A - Détente laryngée
</span>
```

**Indicateur de suggestion** :
```html
<div class="suggestion-banner">
  💡 Suggestion : Essayez le Parcours A
</div>
```

---

## 🏗️ Architecture (modifications)

### Nouveaux modules

```
js/
├── app.js (15 KB)             # +4 KB
├── parcours.js (12 KB)        # +7 KB - Ajout parcours A, B, C, D
├── parcours-router.js (5 KB)  # NOUVEAU - Gestion bifurcations
├── suggestions.js (4 KB)      # NOUVEAU - Algorithme suggestions
├── statistics.js (6 KB)       # NOUVEAU - Calculs et rendus stats
├── storage.js (12 KB)         # +3 KB - Tracking contexte
├── timer.js (4 KB)            # Inchangé
└── ui.js (15 KB)              # +3 KB - Nouveaux écrans
```

### Données (localStorage étendu)

```javascript
// Nouvelle clé: parcoursHistory
{
  sessions: [
    {
      id, startedAt, completedAt,
      parcoursPath: ["standard:0-2", "A:0-5", "standard:3-7"],
      blockages: ["ventricular"],
      context: { timeOfDay, dayOfWeek, ... },
      outcome: { completed, rating, duration }
    }
  ]
}

// Mise à jour: preferences
{
  ...existing,
  favoriteParcours: [],
  defaultStepDuration: 30,
  showSuggestions: true,
  onboardingCompleted: false
}
```

---

## 📊 Métriques V2.0

### Nouvelles métriques fonctionnelles

- **Taux de bifurcation** : % sessions utilisant un parcours alternatif
- **Efficacité par parcours** : Taux de complétion selon le parcours
- **Pertinence des suggestions** : % suggestions acceptées
- **Temps moyen par parcours** :
  - Standard : X min
  - Détente laryngée : Y min
  - etc.

### KPIs cibles

| Métrique | Objectif V2.0 |
|----------|---------------|
| Taux de complétion global | > 75% (+5% vs V1) |
| Taux d'utilisation bifurcations | 30-50% |
| Satisfaction utilisateur | > 4.2/5 |
| Taux de retention (30j) | > 60% |

---

## ✅ Critères d'acceptation V2.0

### Fonctionnels
- [ ] 4 parcours alternatifs implémentés (A, B, C, D)
- [ ] Menu de diagnostic fonctionnel
- [ ] Bifurcation possible depuis n'importe quelle étape
- [ ] Historique enrichi avec parcours et contexte
- [ ] Suggestions basées sur l'historique
- [ ] Écran statistiques accessible
- [ ] Onboarding de première utilisation
- [ ] Préférences sauvegardées

### UX
- [ ] Bifurcation sans friction (< 5 secondes)
- [ ] Suggestions non intrusives (dismissables)
- [ ] Stats compréhensibles sans expertise
- [ ] Onboarding skippable
- [ ] Pas de régression vs V1.0

### Techniques
- [ ] Taille totale < 150 KB (objectif)
- [ ] Performance maintenue (Lighthouse > 90)
- [ ] Rétrocompatibilité données V1.0
- [ ] Migration automatique localStorage
- [ ] Tests unitaires sur algorithme suggestions

---

## 🚧 Risques et mitigations

### Risque 1 : Complexité cognitive
**Risque** : Trop de choix → Paralysie décisionnelle
**Mitigation** :
- Suggestions intelligentes (choix par défaut)
- Option "Ne sais pas" toujours disponible
- Possibilité de revenir au parcours standard

### Risque 2 : Algorithme de suggestion inefficace
**Risque** : Suggestions non pertinentes → Frustration
**Mitigation** :
- Commencer avec algorithme très simple
- Bouton "Cette suggestion n'est pas pertinente"
- Tracking efficacité pour améliorer l'algo

### Risque 3 : Fragmentation des données
**Risque** : Historique trop complexe → Difficulté d'analyse
**Mitigation** :
- Structure de données bien pensée dès le début
- Export CSV pour analyse externe
- Limiter la rétention à 50 sessions max

### Risque 4 : Augmentation du bundle size
**Risque** : App trop lourde → Chargement lent
**Mitigation** :
- Code splitting (charger parcours alternatifs à la demande)
- Compression gzip
- Lazy loading des stats

---

## 🛤️ Plan de développement

### Phase 1 : Architecture (2 semaines)
- Refactoring parcours.js pour support multi-parcours
- Création parcours-router.js
- Extension storage.js pour contexte
- Tests unitaires modules core

### Phase 2 : Parcours alternatifs (3 semaines)
- Implémentation Parcours A (Détente laryngée)
- Implémentation Parcours B (Relâchement musculaire)
- Implémentation Parcours C (Mode économie)
- Implémentation Parcours D (Standard modifié)
- Tests utilisateurs sur chaque parcours

### Phase 3 : Bifurcations et diagnostic (2 semaines)
- Menu de diagnostic
- Mécanisme de bifurcation
- UI de transition entre parcours
- Tests d'intégration

### Phase 4 : Intelligence et suggestions (2 semaines)
- Algorithme de suggestions simple
- Interface de suggestions
- Tracking contexte
- Tests de pertinence

### Phase 5 : Statistiques et personnalisation (2 semaines)
- Écran statistiques
- Graphiques CSS
- Onboarding wizard
- Gestion préférences

### Phase 6 : Tests et polish (1 semaine)
- Tests complets multi-devices
- Beta test avec 10+ utilisateurs
- Corrections bugs
- Optimisations performance

**Total** : 12 semaines (3 mois)

---

## 🧪 Tests spécifiques V2.0

### Tests fonctionnels

**Parcours alternatifs** :
- [ ] Parcours A complétable de bout en bout
- [ ] Parcours B complétable de bout en bout
- [ ] Parcours C complétable de bout en bout
- [ ] Parcours D complétable de bout en bout

**Bifurcations** :
- [ ] Bifurcation depuis étape 1 → Parcours A → Retour
- [ ] Bifurcation depuis étape 5 → Parcours B → Retour
- [ ] Bifurcation multiple (A → Standard → C)
- [ ] Bifurcation puis abandon → Reprise correcte

**Suggestions** :
- [ ] Suggestion affichée après pattern détecté
- [ ] Suggestion acceptée → Lance bon parcours
- [ ] Suggestion refusée → Lance parcours standard
- [ ] Pas de suggestion si historique insuffisant

**Statistiques** :
- [ ] Affichage correct avec 0 sessions
- [ ] Affichage correct avec 1 session
- [ ] Affichage correct avec 50+ sessions
- [ ] Calculs de pourcentages corrects

### Tests de migration

- [ ] V1.0 → V2.0 : Données conservées
- [ ] V1.0 → V2.0 : Reprise session en cours
- [ ] V1.0 → V2.0 : Historique lisible

---

## 📝 Documentation à créer

- **GUIDE_PARCOURS.md** : Description détaillée de chaque parcours
- **ALGO_SUGGESTIONS.md** : Documentation algorithme de suggestions
- **MIGRATION_V1_V2.md** : Guide de migration
- **TESTING_V2.md** : Checklist de tests V2.0

---

## 🔄 Feedback loop

### Questions pour beta testeurs V2.0

1. Les parcours alternatifs vous ont-ils aidé ?
2. Le menu de diagnostic est-il compréhensible ?
3. Les suggestions sont-elles pertinentes ?
4. Les statistiques vous sont-elles utiles ?
5. Parcours manquants à ajouter ?

### Métriques à tracker

- Taux d'acceptation des suggestions
- Parcours le plus utilisé
- Parcours avec meilleur taux de complétion
- Temps moyen par parcours
- Satisfaction par parcours

---

## 🎯 Indicateurs de succès V2.0

**Succès si** :
- Taux de complétion global > V1.0
- Au moins 30% des sessions utilisent un parcours alternatif
- Note de satisfaction > 4/5
- Moins de 10% des utilisateurs ne comprennent pas les bifurcations

**Échec si** :
- Taux de complétion < V1.0
- Utilisateurs confus par la complexité
- Performance dégradée significativement
- Bugs fréquents lors des bifurcations

---

**Version planifiée** : 2.0.0
**Date estimée** : Q2 2025
**Prérequis** : V1.0 déployée, feedback analysé
**Budget temps** : 3 mois développement + 1 mois tests
**Statut** : 📋 Spécifications complètes - En attente validation
