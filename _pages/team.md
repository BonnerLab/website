---
title: "Bonner Lab - Team"
layout: gridlay
excerpt: "Bonner Lab: Team members"
sitemap: false
permalink: /team/
---

# Group Members

 **We are  looking for new PhD students, Postdocs, and Master students to join the team** [(see openings)]({{ site.url }}{{ site.baseurl }}/vacancies) **!**


Jump to [Staff](#staff), [Hopkins students](#hopkins-students), [Alumni](#alumni), [Collaborators](#collaborators), [Former students](#former-hopkins-students), [Administrative support](#administrative-support)


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
  {% if member.email %}
  <a href="mailto:{{ member.email }}">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/gmail.png" alt="Email" style="width: 40px; height: 28px; margin-right: 15px; box-shadow: none;"/>
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


## Staff
{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}


<div class="col-sm-6 clearfix">
<img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
<h4>{{ member.name }}</h4>
<i>{{ member.role }}</i>
<div style="display: flex; align-items: center;">
  {% if member.gscholar %}
  <a href="{{ member.gscholar }}">
    <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/gscholar.png" alt="Google Scholar Logo" style="width: 25px; height: 25px; margin-right: 14px; box-shadow: none;"/>
  </a>
  {% endif %}
  {% if member.website %}
  <a href="{{ member.website }}">
    <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/website.png" alt="Personal Website" style="width: 25px; height: 25px; margin-right: 10px; box-shadow: none;"/>
  </a>
  {% endif %}
  {% if member.email %}
  <a href="mailto:{{ member.email }}">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/gmail.png" alt="Email" style="width: 40px; height: 28px; margin-right: 6px; box-shadow: none;"/>
    </a>
  {% endif %}
  {% if member.twitter %}
  <a href="https://twitter.com/{{ member.twitter }}">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/x_logo.svg" alt="X" style="width: 22px; height: 22px; margin-right: 6px; box-shadow: none;"/>
    </a>
  {% endif %}
  {% if member.cv %}
  <a href="{{ site.url }}{{ site.baseurl }}/downloads/{{member.cv}}">
      <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/cv_logo.png" alt="CV" style="width: 25px; height: 25px; box-shadow: none;"/>
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



## Bsc / Master students
{% assign number_printed = 0 %}
{% for member in site.data.students %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}


<div class="col-sm-6 clearfix">
<img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
<h4>{{ member.name }}</h4>
{% if member.email %}
  <i>{{ member.info }}<br>email: <a href="mailto:{{ member.email }}">{{ member.email }}</a></i>
{% else %}
  <i>{{ member.info }}</i>
{% endif %}
<ul style="overflow: hidden">



  {% if member.number_educ == 1 %}
  <li> {{ member.education1 }} </li>
  {% endif %}

  {% if member.number_educ == 2 %}
  <li> {{ member.education1 | markdownify}} </li>
  <li> {{ member.education2 | markdownify}} </li>
  {% endif %}

  {% if member.number_educ == 3 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  {% endif %}

  {% if member.number_educ == 4 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  {% endif %}

  {% if member.number_educ == 5 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  <li> {{ member.education5 }} </li>
  {% endif %}

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




## Alumni

{% assign number_printed = 0 %}
{% for member in site.data.alumni_members %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.duration }} <br> Current Role: </i><strong>{{ member.info }}</strong>
  <br>
  <a href="{{ member.website }}" target="_blank">website</a>
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


## Collaborators
{% assign number_printed = 0 %}
{% for member in site.data.collaborators %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <h4>{{ member.name }}</h4>
  <i>{{ member.info }} <!-- <br>email: <{{ member.email }}></i> -->
  <ul style="overflow: hidden">

  {% if member.number_educ == 1 %}
  <li> {{ member.education1 }} </li>
  {% endif %}

  {% if member.number_educ == 2 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  {% endif %}

  {% if member.number_educ == 3 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  {% endif %}

  {% if member.number_educ == 4 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  {% endif %}

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

## Former Hopkins students
<div class="row">

<div class="col-sm-6 clearfix">
<h4>Bachelor students</h4>
{% for member in site.data.alumni_bsc %}
{{ member.name }}
{% endfor %}
</div>

<div class="col-sm-6 clearfix">
<h4>Master students</h4>
{% for member in site.data.alumni_msc %}
{{ member.name }}
{% endfor %}
</div>

</div>


## Administrative Support
<a href="mailto:sciotol3@jhu.edu">Sarah Ciotola</a> and <a href="mailto:csampso7@jhu.edu">Chamera Sampson</a> are helping us (and other groups) with administration.
