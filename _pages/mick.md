---
title: "Mick Bonner"
layout: gridlay
excerpt: "PI: Mick Bonner"
sitemap: false
permalink: /mick/
---

## Principal Investigator
{% assign number_printed = 0 %}
{% for member in site.data.team_lead %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}


<div class="col-sm-6 clearfix">
<img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="35%" style="float: left" />
<h3>{{ member.name }}</h3>
  <i>{{ member.role }}<br>
  <i>{{ member.info }}</i><br>
  email: <a href="mailto:{{ member.email }}">{{ member.email }}</a></i>
  
<div style="display: flex; align-items: center;">
  {% if member.gscholar %}
  <a href="{{ member.gscholar }}">
    <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/gscholar.png" alt="Google Scholar Logo" style="width: 25px; height: 25px; margin-right: 15px; box-shadow: none;"/>
  </a>
  {% endif %}
  {% if member.website %}
  <a href="{{ member.website }}">
    <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/website.png" alt="Personal Website" style="width: 25px; height: 25px; margin-right: 15px; box-shadow: none;"/>
  </a>
  {% endif %}
  {% if member.twitter %}
  <a href="https://twitter.com/{{ member.twitter }}">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/x_logo.svg" alt="X" style="width: 22px; height: 22px; margin-right: 15px; box-shadow: none;"/>
    </a>
  {% endif %}
  {% if member.cv %}
  <a href="{{ site.url }}{{ site.baseurl }}/downloads/{{member.cv}}">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/cv_logo.png" alt="CV" style="width: 27px; height: 27px; box-shadow: none;"/>
    </a>
  {% endif %}
  {% if member.github %}
  <a href="{{ site.url }}{{ site.baseurl }}/images/logopic/github_logo.png">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/github_logo.png" alt="Github" style="width: 27px; height: 27px; box-shadow: none;"/>
    </a>
  {% endif %}
</div>

<ul style="overflow: hidden">
</ul>
</div>


{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

### About
### Talks
### Funding and Awards
### Teaching