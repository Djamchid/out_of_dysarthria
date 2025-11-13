#!/bin/bash
# Script de génération des icônes PWA

echo "🎨 Génération des icônes PWA..."

# Vérifier si ImageMagick est installé
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick détecté"
    convert assets/icons/icon.svg -resize 192x192 assets/icons/icon-192.png
    convert assets/icons/icon.svg -resize 512x512 assets/icons/icon-512.png
    echo "✅ Icônes générées avec ImageMagick"
    exit 0
fi

# Vérifier si Inkscape est installé
if command -v inkscape &> /dev/null; then
    echo "✅ Inkscape détecté"
    inkscape assets/icons/icon.svg --export-filename=assets/icons/icon-192.png --export-width=192 --export-height=192
    inkscape assets/icons/icon.svg --export-filename=assets/icons/icon-512.png --export-width=512 --export-height=512
    echo "✅ Icônes générées avec Inkscape"
    exit 0
fi

# Si aucun outil n'est disponible
echo "❌ ImageMagick ou Inkscape requis"
echo "📦 Installation:"
echo "  - macOS: brew install imagemagick"
echo "  - Ubuntu/Debian: sudo apt-get install imagemagick"
echo "  - Ou utilisez https://realfavicongenerator.net/"
exit 1
