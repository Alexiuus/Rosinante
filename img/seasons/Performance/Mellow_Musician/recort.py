from importlib.resources import path
from PIL import Image # para cargar imágen
from PIL import ImageDraw # Para dibujar sobre imagenes
from PIL import ImageOps # Reescalar
import os

def rec(path, name):
    img = Image.open(path)
    height,width = img.size

    lum_img = Image.new('L', [height,width] , 0)
    
    draw = ImageDraw.Draw(lum_img)
    draw.pieslice([(0,0), (height,width)], 0, 360, fill = 255, outline = "white")
    output = ImageOps.fit(img, lum_img.size,centering=(0.5, 0.5))
    output.putalpha(lum_img)
    output.save(name)

paths = os.listdir()
accSplit = [i.split('.') for i in paths]
names = [i[0] + "1." + i[1] for i in accSplit]

for i in range(0,len(paths)):
    if (paths[i] != 'recort.py'):
        rec(paths[i], names[i])