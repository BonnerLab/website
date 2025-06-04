# Bonner Lab Website

[![Jekyll](https://img.shields.io/badge/jekyll-%3E%3D%203.8-blue.svg)](https://jekyllrb.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-brightgreen)](https://www.bonnerlab.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Welcome to the Bonner Lab website repository! This is the official website for our cognitive science research group at Johns Hopkins University. The site showcases our research, team, publications, and lab news.

🔗 **Live Site**: [www.bonnerlab.org](https://www.bonnerlab.org)

## 🚀 Quick Start

### Prerequisites

- **Ruby** 2.6+ and **Bundler**
- **Git** for version control
- A text editor (VS Code, Sublime Text, etc.)

### Setup in 3 Steps

```bash
# 1. Clone the repository
git clone https://github.com/bonnerlab/website.git
cd website

# 2. Install dependencies
gem install bundler
bundle install

# 3. Run the development server
bundle exec jekyll serve
```

Visit [http://localhost:4000](http://localhost:4000) to see your local copy! 🎉

## 📝 Common Tasks

### Adding Team Members

Team data is stored in YAML files in the `_data/` directory:

**Current Members** (`_data/team_members.yml`):
```yaml
- name: Jane Doe
  photo: jane.jpg  # Add photo to /images/teampic/
  info: Postdoctoral Fellow
  email: jdoe@jhu.edu
  number_educ: 2
  education1: PhD in Neuroscience, University X (2023)
  education2: BS in Psychology, University Y (2018)
```

**File Locations**:
- PI info: `_data/team_lead.yml`
- PhD/Postdocs: `_data/team_members.yml`
- Current students: `_data/students.yml`
- Alumni: `_data/alumni_members.yml`, `alumni_msc.yml`, `alumni_bsc.yml`

### Adding Publications

Edit `_data/publist.yml`:
```yaml
- title: "Your Paper Title Here"
  image: paper_thumbnail.png  # Add to /images/pubpic/
  description: Brief description of key findings
  authors: J. Doe, J. Smith, M. Bonner
  link:
    url: https://doi.org/10.1234/journal.2024.001
    display: Journal Name (2024)
  highlight: 1  # Feature on homepage
```

### Adding Lab News

Edit `_data/news.yml`:
```yaml
- date: 1. January 2024
  headline: "Lab receives NSF grant for perception research"
```

### Updating Content Pages

Main pages are in `_pages/`:
- `home.md` - Homepage content
- `team.md` - Team page introduction
- `research.md` - Research overview
- `publications.md` - Publications intro
- `openings.md` - Job opportunities

## 🏗️ Project Structure

```
website/
├── _data/              # 📊 Data files (team, publications, news)
├── _pages/             # 📄 Static content pages
├── _layouts/           # 🎨 Page templates
├── _includes/          # 🧩 Reusable components
├── _plugins/           # 🔧 Custom Jekyll plugins
├── images/             # 🖼️ All images
│   ├── teampic/       # Team member photos
│   ├── pubpic/        # Publication figures
│   └── newspic/       # News images
├── _sass/             # 💅 Stylesheets
└── _config.yml        # ⚙️ Site configuration
```

## 🖼️ Image Guidelines

| Type | Location | Recommended Size |
|------|----------|------------------|
| Team Photos | `/images/teampic/` | Square, 400x400px |
| Publication Figures | `/images/pubpic/` | 600px wide |
| News Images | `/images/newspic/` | 800px wide |
| Homepage Slider | `/images/slider7001400/` | 700x1400px |

## 🚢 Deployment

The site auto-deploys via GitHub Pages when you push to `gh-pages`:

```bash
# Make your changes
git add .
git commit -m "Update team members"
git push origin gh-pages
```

Changes appear at [www.bonnerlab.org](https://www.bonnerlab.org) within 5-10 minutes.

## 🛠️ Development

### Local Development Commands

```bash
# Start development server
bundle exec jekyll serve

# Build the site
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean

# Run with a different port
bundle exec jekyll serve --port 4001
```

### Platform-Specific Setup

<details>
<summary><b>macOS Setup</b></summary>

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby
brew install ruby

# Add Ruby to PATH
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```
</details>

<details>
<summary><b>Windows Setup</b></summary>

1. Download Ruby+Devkit from [RubyInstaller](https://rubyinstaller.org/)
2. Run the installer and follow prompts
3. Open a new command prompt and continue with the general setup
</details>

## 🐛 Troubleshooting

### Common Issues

**"command not found: bundle"**
```bash
gem install bundler
```

**Missing dependencies error**
```bash
bundle install
```

**Port already in use**
```bash
bundle exec jekyll serve --port 4001
```

**SASS deprecation warnings**
These are from Bootstrap and can be safely ignored.

## 🤝 Contributing

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/update-publications
   ```

2. **Make changes and test locally**

3. **Commit with clear messages**:
   ```bash
   git add .
   git commit -m "Add: New publication on visual perception"
   ```

4. **Push and create PR**:
   ```bash
   git push origin feature/update-publications
   ```

## 📚 Resources

- [Jekyll Documentation](https://jekyllrb.com/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

## 📧 Support

- **Technical Issues**: Open a [GitHub issue](https://github.com/bonnerlab/website/issues)
- **Content Questions**: Contact the lab's web maintainer
- **Research Inquiries**: See contact info on the [website](https://www.bonnerlab.org)

## 📄 License

This project is licensed under the MIT License. The design is based on the Allan Lab template from Leiden University.

---

*Last updated: January 2025*