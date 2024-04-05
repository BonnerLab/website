---
title: "News"
layout: textlay
excerpt: "Bonner Lab at Johns Hopkins"
sitemap: false
permalink: /news.html
---

# News

{% for article in site.data.news %}
<div class="article-entry">
  <span class="article-date"><strong>{{ article.date }}</strong></span>
  <div class="article-headline">{{ article.headline | markdownify }}</div>
</div>
{% endfor %}
