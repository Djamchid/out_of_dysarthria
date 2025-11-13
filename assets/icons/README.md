# Génération des icônes PWA

Les icônes PNG doivent être générées à partir du fichier SVG source.

## Méthode 1 : En ligne (plus simple)

1. Ouvrir https://realfavicongenerator.net/
2. Uploader `icon.svg`
3. Configurer les options
4. Télécharger et extraire les icônes générées

## Méthode 2 : ImageMagick (ligne de commande)

```bash
# Installer ImageMagick si nécessaire
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Générer les icônes
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
```

## Méthode 3 : Inkscape (ligne de commande)

```bash
# Installer Inkscape si nécessaire
# macOS: brew install inkscape
# Ubuntu: sudo apt-get install inkscape

# Générer les icônes
inkscape icon.svg --export-filename=icon-192.png --export-width=192 --export-height=192
inkscape icon.svg --export-filename=icon-512.png --export-width=512 --export-height=512
```

## Méthode 4 : Figma / Sketch / Adobe XD

1. Importer `icon.svg` dans votre outil de design
2. Exporter en PNG aux dimensions :
   - 192x192 px
   - 512x512 px

## Fichiers requis

- `icon-192.png` - Icône standard (192x192)
- `icon-512.png` - Icône haute résolution (512x512)

Ces fichiers sont nécessaires pour que la PWA fonctionne correctement sur tous les appareils.
