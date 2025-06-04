# Bonner Lab Website

This is the website for the Bonner Lab at Johns Hopkins University. If you're updating the website, this guide will help you make changes even if you've never used Jekyll before.

🔗 **Live Site**: [www.bonnerlab.org](https://www.bonnerlab.org)

## 🚀 Getting Started (First Time Setup)

### What You'll Need

1. **A text editor** - Any will work (VS Code, Sublime Text, even TextEdit/Notepad)
2. **Terminal/Command Line** - Already on your computer (Terminal on Mac, Command Prompt on Windows)
3. **Ruby** - We'll install this together

### Step-by-Step Setup

#### 1️⃣ Get the website code
```bash
# Open Terminal and run:
git clone https://github.com/bonnerlab/website.git
cd website
```

#### 2️⃣ Install Ruby (if you don't have it)
**Mac:**
```bash
# Check if you have Ruby
ruby --version

# If not, install it:
brew install ruby
```

**Windows:** Download from [RubyInstaller.org](https://rubyinstaller.org/)

#### 3️⃣ Install Jekyll (the website builder)
```bash
gem install bundler jekyll
bundle install
```

#### 4️⃣ View the website locally
```bash
bundle exec jekyll serve
```
Open your browser and go to: [http://localhost:4000](http://localhost:4000)

## 📝 How to Update Content

### Adding a New Team Member

#### Step 1: Add their photo
1. Get a square photo (ideally 400x400 pixels)
2. Name it `firstname.jpg` (e.g., `jane.jpg`)
3. Put it in the `images/teampic/` folder

#### Step 2: Add their info
1. Open the appropriate file:
   - **Postdocs/Staff**: `_data/team_members.yml`
   - **Students**: `_data/students.yml`
   - **Alumni**: `_data/alumni_members.yml`

2. Copy this template and fill it in:
```yaml
- name: Jane Doe
  photo: jane.jpg
  role: Postdoctoral Fellow
  email: jane@jhu.edu
  website: https://janedoe.com
  gscholar: https://scholar.google.com/citations?user=XXXXX
  twitter: janedoe
  number_educ: 2
  education1: PhD in Neuroscience, Harvard (2023)
  education2: BS in Biology, MIT (2018)
```

3. Save the file!

### Adding a Publication

#### Step 1: Add the paper image
1. Get a figure from your paper (PNG or JPG)
2. Resize to ~600px wide
3. Put it in `images/pubpic/`

#### Step 2: Add publication info
1. Open `_data/publist.yml`
2. Add at the TOP of the file:
```yaml
- title: "Your Exact Paper Title"
  image: yourfigure.png
  description: One sentence about what you discovered
  authors: J. Doe, A. Smith, M. Bonner
  link:
    url: https://doi.org/YOUR-DOI-HERE
    display: Nature Neuroscience (2024)
  highlight: 1  # Use 1 to show on homepage, 0 to not show
```

### Adding News

1. Open `_data/news.yml`
2. Add at the TOP:
```yaml
- date: 15. January 2024
  headline: "Your news here (keep it short!)"
```

**Date format**: Day. Month Year (e.g., "3. March 2024")

### Updating Page Content

To edit any page text:
1. Find the file in `_pages/`
2. Open in your text editor
3. Edit the text (it's in Markdown format)
4. Save!

**Main pages:**
- `home.md` → Homepage text
- `research.md` → Research descriptions
- `openings.md` → Job postings

## 📁 Where Things Are

```
website/
├── _data/              # YOUR MAIN WORK AREA!
│   ├── team_members.yml    # Postdocs and staff
│   ├── students.yml        # Current students  
│   ├── alumni_members.yml  # Former postdocs/staff
│   ├── publist.yml         # Publications
│   └── news.yml            # Lab news
├── _pages/             # Website pages (home, research, etc.)
├── images/             
│   ├── teampic/       # Team photos go here
│   └── pubpic/        # Publication images go here
└── [other folders you can ignore]
```

## 🖼️ Image Tips

- **Team photos**: Make them square (crop if needed)
- **Publication figures**: Should be readable at 600px wide
- **File names**: Use lowercase, no spaces (e.g., `john_doe.jpg` not `John Doe.JPG`)

## 🌐 Making Your Changes Live

After editing files:

```bash
# 1. Save your changes
git add .

# 2. Commit with a message
git commit -m "Add new team member Jane Doe"

# 3. Push to GitHub
git push origin gh-pages
```

**Your changes will appear at www.bonnerlab.org in ~5 minutes!**

## 💻 Testing Your Changes Locally

```bash
# Start the local server
bundle exec jekyll serve

# View at: http://localhost:4000
```

**Pro tip**: Keep this running while you work - it auto-updates when you save files!

## ❓ Common Problems & Solutions

**"I can't see my changes locally"**
- Did you save the file?
- Is Jekyll still running? (Check your terminal)
- Try refreshing your browser (Cmd+R or Ctrl+R)

**"Jekyll won't start"**
```bash
# Try this:
bundle install
bundle exec jekyll serve
```

**"My image doesn't show up"**
- Check the filename matches exactly (case-sensitive!)
- Make sure it's in the right folder
- Use .jpg or .png format

**"The website looks broken"**
- You might have a typo in the YAML file
- Check that all quotes are closed
- Make sure indentation is consistent

---

*Last updated: June 2025*