#!/usr/bin/env python3
"""
Génération d'icônes PNG placeholder pour la PWA
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Crée une icône PNG simple"""
    # Créer une image avec fond bleu marine
    img = Image.new('RGB', (size, size), color='#2C3E50')
    draw = ImageDraw.Draw(img)

    # Dessiner un cercle vert (onde sonore stylisée)
    margin = size // 5
    circle_bbox = [margin, margin, size - margin, size - margin]
    draw.ellipse(circle_bbox, outline='#27AE60', width=size//20)

    # Dessiner un cercle intérieur blanc (microphone)
    inner_margin = size // 3
    inner_bbox = [inner_margin, inner_margin, size - inner_margin, size - inner_margin]
    draw.ellipse(inner_bbox, fill='#FFFFFF')

    # Sauvegarder
    img.save(filename, 'PNG')
    print(f"✅ Créé: {filename} ({size}x{size})")

def main():
    print("🎨 Génération des icônes PWA avec Python...")

    # Créer le dossier si nécessaire
    os.makedirs('assets/icons', exist_ok=True)

    try:
        # Générer les icônes
        create_icon(192, 'assets/icons/icon-192.png')
        create_icon(512, 'assets/icons/icon-512.png')
        print("✅ Icônes générées avec succès!")
    except Exception as e:
        print(f"❌ Erreur: {e}")
        print("💡 Installez Pillow: pip install Pillow")
        return 1

    return 0

if __name__ == '__main__':
    exit(main())
