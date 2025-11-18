# V2.0 Onboarding Wizard - Testing Guide

## ✅ What Was Implemented

The onboarding wizard (Feature F6 from V2.0 specifications) has been fully implemented. This is the first-time user experience that helps users configure their preferences.

### Features Implemented:

1. **Step 1 - Welcome Screen**
   - Introduction to the app
   - Two options:
     - "Commencer la configuration" → Continue to setup
     - "J'ai déjà utilisé l'app" → Skip onboarding

2. **Step 2 - Favorite Parcours Selection**
   - Checkboxes to select preferred parcours:
     - Parcours Standard (checked by default)
     - 😓 Détente laryngée
     - 💪 Relâchement musculaire
     - 😴 Mode économie
   - Navigation: "Suivant" and "Retour" buttons

3. **Step 3 - Default Step Duration**
   - Radio buttons to choose timing:
     - ⚡ Rapide (15-20 seconds)
     - ✓ Normal (30 seconds) - default
     - 🐢 Lent (60 seconds)
   - Navigation: "Terminer" and "Retour" buttons

### Technical Implementation:

**Files Modified:**
- `js/ui.js` - Added 3 methods for rendering onboarding steps
- `js/app.js` - Added onboarding flow control and handlers
- `css/components.css` - Added complete styling for onboarding screens
- `index.html` - Already had the onboarding container

**Preferences Saved:**
- `onboardingCompleted` → `true` after completion
- `favoriteParcours` → Array of selected parcours
- `defaultStepDuration` → Selected duration (20, 30, or 60)

## 🧪 How to Test

### 1. First-Time User Experience

```bash
# Clear localStorage to simulate first-time user
# Open browser console and run:
localStorage.clear()

# Reload the page
# You should see the onboarding wizard immediately
```

**Expected Flow:**
1. **Welcome screen appears** with app icon and description
2. Click "Commencer la configuration"
3. **Step 2 appears** - select your favorite parcours (try selecting multiple)
4. Click "Suivant"
5. **Step 3 appears** - select a duration preference
6. Click "Terminer"
7. **Home screen appears** - you should see the normal app interface

### 2. Skip Onboarding Test

```bash
# Clear localStorage again
localStorage.clear()

# Reload the page
# On the welcome screen, click "J'ai déjà utilisé l'app"
# Should go directly to home screen with default preferences
```

### 3. Navigation Test

```bash
# Clear localStorage and reload
localStorage.clear()

# Test back navigation:
1. Click "Commencer la configuration"
2. On Step 2, click "Retour" → Should return to Step 1
3. Go to Step 3, click "Retour" → Should return to Step 2
```

### 4. Verify Preferences Saved

After completing onboarding, open browser console:

```javascript
// Check saved preferences
const prefs = JSON.parse(localStorage.getItem('preferences'))
console.log('Onboarding completed:', prefs.onboardingCompleted)  // Should be true
console.log('Favorite parcours:', prefs.favoriteParcours)        // Array of selected
console.log('Default duration:', prefs.defaultStepDuration)      // 20, 30, or 60
```

### 5. Returning User Test

After completing onboarding once:
- Close and reopen the app
- Onboarding should NOT appear
- Should go directly to home screen

## 📋 Checklist

- [ ] First-time user sees onboarding immediately
- [ ] Welcome screen displays correctly with icon and description
- [ ] "Commencer la configuration" advances to Step 2
- [ ] "J'ai déjà utilisé l'app" skips to home screen
- [ ] Step 2 allows multiple parcours selection
- [ ] Step 2 "Suivant" advances to Step 3
- [ ] Step 2 "Retour" goes back to Step 1
- [ ] Step 3 allows duration selection
- [ ] Step 3 "Terminer" completes onboarding and goes to home
- [ ] Step 3 "Retour" goes back to Step 2
- [ ] Preferences are saved correctly in localStorage
- [ ] `onboardingCompleted` is set to `true` after completion
- [ ] Returning users don't see onboarding again
- [ ] All styling looks good (centered, readable, responsive)
- [ ] Checkboxes and radio buttons work correctly

## 🎨 Visual Features

- Clean, centered layout (max-width: 600px)
- Large emoji icons for visual appeal
- Clear typography hierarchy
- Interactive hover states on options
- Responsive design (works on mobile and desktop)
- Smooth navigation between steps

## 🔄 Integration with V2.0

The onboarding wizard integrates with other V2.0 features:

1. **Favorite Parcours** - Used by suggestions engine to recommend appropriate parcours
2. **Default Duration** - Can be used in future to adjust step timing
3. **Preferences System** - All settings are stored and can be edited later (future feature)

## 🐛 Known Limitations

- No way to edit preferences after onboarding (planned for future update)
- Cannot go back to onboarding once completed (must clear localStorage)
- No validation that at least one parcours is selected

## 📝 Next Steps for V2.0

With onboarding complete, remaining V2.0 features include:

1. ✅ Onboarding wizard (DONE)
2. ⏳ User rating system after completion
3. ⏳ CSV export functionality
4. ⏳ Preferences editor screen
5. ⏳ Visual parcours badges in UI
6. ⏳ Complete integration testing

---

**Date implemented**: 2025-11-18
**Version**: 2.0.0-alpha
**Status**: Ready for human testing
