# Generates album html files from JSON

import json

with open('albums.json') as data_file:
  data = json.load(data_file)

for slug, options in data['albums'].iteritems():
  f = open('%s.html' % slug, 'w')
  f.write('---\n')

  for k, v in options.iteritems():
    f.write('%s: %s\n' % (k, v))

  f.write('---')
  f.close()