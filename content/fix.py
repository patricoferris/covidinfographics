import os

# Getting the current work directory (cwd)
thisdir = os.getcwd()

# r=root, d=directories, f = files
for r, d, f in os.walk(thisdir):
  for file in f:
    if file.endswith(".md"):
      with open(os.path.join(r, file), "r") as f:
        new = []
        c = f.read()
        s = c.split("\n")
        for line in s: 
          if line[-3:] == "png" and line[2:3] == "-":
            new.append("  - alttext: A COVID19 Infographic")
            new.append("    image: " + line.split("- ")[1])
          else:
            if line != "  - index.md":
              new.append(line)
        print("\n".join(new))
        f.close()
        with open(os.path.join(r, file), "w+") as f:
          f.write("\n".join(new))
