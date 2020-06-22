from os import walk, rename
import json

def gen_top(locale, sub): 
  return """---
locale: {0}
sub: {1}
infographics:
""".format(locale, sub)

def gen_names(files):
  f = ""
  for fn in files: 
    f += "  - {0}\n".format(fn)
  return f + "---"

for (dirpath, dirnames, filenames) in walk("."):
  if len(filenames) > 0 and filenames != ["fix.py", "fix.js"]:
    d = dirpath.split("/")[1:]
    with open(dirpath + "/index.md", "w+") as f:
      f.write(gen_top(d[0], d[1]) + gen_names(filenames))
  