import os

# Getting the current work directory (cwd)
thisdir = os.getcwd()

# r=root, d=directories, f = files
for r, d, f in os.walk(thisdir):
  for file in f:
    if file.endswith(".md"):
      with open(os.path.join(r, file), "r") as f:
        c = f.read()
        s = c.split("\n")
        print(os.path.join(r, file))
        s[1] = "category: covid19"
        if s[2] == "sub: covid19":
          s[2] = "sub: general"
        f.close()
        with open(os.path.join(r, file), "w+") as w:
          w.write(("\n".join(s)))