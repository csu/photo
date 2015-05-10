import os
import json

thumb_files = os.listdir('./500')
full_files = os.listdir('./1500')

assert len(thumb_files) == len(full_files)

gallery = dict()
gallery['photos'] = list()

for i in range(len(thumb_files)):
    gallery['photos'].append({
        'thumb': thumb_files[i],
        'full': full_files[i]
    })

with open('gallery.json', 'w') as outfile:
    json.dump(gallery, outfile)