---
title: "Bonner Lab - Research"
layout: research
excerpt: "Bonner Lab -- Research"
sitemap: false
permalink: /research/
---

# Research

<p class="research-lede">We study the computational principles of the visual brain by combining large-scale human neuroimaging with deep neural network models. Below are the primary projects currently led by members of the lab.</p>

<h2 id="current-projects">Current Projects</h2>

<div class="project">
<div class="project-text">
<h3>Universal dimensions of vision</h3>
<p class="project-meta project-meta-row"><span>Led by</span><span><a href="https://zche377.github.io/">Ray Chen (Zirui Chen)</a>, PhD student</span></p>
<p class="project-meta project-meta-row"><span>Recent work</span><span><a href="https://arxiv.org/abs/2408.12804">Universal dimensions of visual representation</a>, <em>Science Advances</em> (2025) · <a href="https://github.com/zche377/universal_dimensions">code</a></span></p>
<p>We observe that diverse designs of neural networks all yield similarly good models of the human visual cortex. This suggests that the subset of model representations that align with cortical activity is general-purpose and can be learned independent of the task or architectural constraints on these models. By comparing the representations of widely varied models, we provide evidence that the universality of a feature among many neural networks is a strong indicator of its presence in human cortical representation.</p>
</div>
<img class="project-fig" src="{{ site.url }}{{ site.baseurl }}/images/pubpic/universal_dim.png" alt="Figure from Universal dimensions of visual representation">
</div>

<div class="project">
<div class="project-text">
<h3>Feedback signals for learning brain-like vision, and automated search for models of visual cortex</h3>
<p class="project-meta project-meta-row"><span>Led by</span><span><a href="https://yashsmehta.github.io/">Yash Mehta</a>, PhD student</span></p>
<p class="project-meta project-meta-row"><span>Recent work</span><span><a href="https://arxiv.org/abs/2605.05556">An extremely coarse feedback signal is sufficient for learning human-aligned visual representations</a></span></p>
<p>How much feedback does a network need before its representations line up with the human visual system? Far less than standard training provides: an extremely coarse signal is enough. We are now turning the same question on the modelling process itself. Long-running agents propose simple, interpretable computational models of visual cortex, score them by how well they predict neural responses in different brain regions, and revise them. The search is open-ended and aimed at the underlying computation, not at fitting a particular dataset or scaling up training.</p>
</div>
<img class="project-fig" src="{{ site.url }}{{ site.baseurl }}/images/pubpic/coarse_feedback.png" alt="Figure from An extremely coarse feedback signal is sufficient for learning human-aligned visual representations">
</div>

<div class="project">
<div class="project-text">
<h3>Local unsupervised learning for building a visual hierarchy</h3>
<p class="project-meta project-meta-row"><span>Led by</span><span><a href="https://cogsci.jhu.edu/directory/ananya-passi/">Ananya Passi</a>, PhD student</span></p>
<p class="project-meta project-meta-row"><span>Recent work</span><span><a href="https://arxiv.org/abs/2605.19155">Efficient coding along the visual hierarchy</a></span></p>
<p>Deep neural networks (DNNs) are the leading computational models of visual cortex but are trained using biologically implausible backpropagation. We are developing an algorithm for building a hierarchy of visual features using only local unsupervised learning, without backpropagation. Our work identifies a new approach for learning a visual hierarchy consistent with principles of learning in biology, requires no labels or tasks, and may account for a large fraction of visual cortex representations.</p>
</div>
<img class="project-fig" src="{{ site.url }}{{ site.baseurl }}/images/pubpic/efficient_coding.png" alt="Images that most strongly drive channels learned by efficient coding">
</div>

<h2 id="tutorial">Tutorial</h2>

<div class="tutorial-card">
<a class="tutorial-thumb" href="https://www.youtube.com/watch?v=6cxX6M5VFYE&amp;t=643s" aria-label="Watch the CCN 2023 tutorial">
<img src="{{ site.url }}{{ site.baseurl }}/images/ccn_tutorial.jpg" alt="">
<span class="play" aria-hidden="true"><i class="fas fa-play"></i></span>
</a>
<div class="tutorial-text">
<p class="tutorial-kicker">Keynote tutorial · CCN 2023, Oxford</p>
<h3>A High-Dimensional View of Neuroscience</h3>
<p>What computational tools can we use to study neural representations in high dimensions? Five notebooks, which you can read on the site or run in Google Colab, cover PCA, exploring neural data, dealing with noise, comparing representations, and analyzing neural networks.</p>
<p class="tutorial-authors">Raj Magesh Gauthaman, Florentin Guth, Atlas Kazemian, Zirui Chen, Mick Bonner</p>
<p class="tutorial-actions">
<a class="btn-solid" href="https://bonnerlab.github.io/ccn-tutorial/">Open tutorial</a>
<a class="btn-ghost" href="https://www.youtube.com/watch?v=6cxX6M5VFYE&amp;t=643s"><i class="fas fa-play"></i> Watch</a>
</p>
</div>
</div>

<h2 id="past-projects">Past Projects</h2>

<p class="past-intro">Led by former members of the lab (see <a href="{{ site.url }}{{ site.baseurl }}/team/#alumni">Alumni</a>).</p>

<div class="past-list">
<div class="past-item">
<h3><a href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1013714">Scale-free representations in human visual cortex</a></h3>
<p class="project-meta"><a href="https://raj-magesh.org/">Raj Magesh Gauthaman</a> · <em>PLOS Computational Biology</em> (2025)</p>
<p>Cortical responses to natural images are unexpectedly high-dimensional, even in high-level visual regions, and these dimensions are shared across people.</p>
</div>
<div class="past-item">
<h3><a href="https://www.nature.com/articles/s42256-025-01142-3">Computational models of visual cortex without supervised learning</a></h3>
<p class="project-meta"><a href="https://akazemian.github.io/personal_profile/">Atlas Kazemian</a> · <em>Nature Machine Intelligence</em> (2025)</p>
<p>Brain-relevant dimensions emerge in untrained convolutional networks from the statistics of natural images alone, without supervised learning.</p>
</div>
<div class="past-item">
<h3><a href="https://arxiv.org/abs/2505.12653">High-dimensional structure of individual differences in visual experience</a></h3>
<p class="project-meta"><a href="https://kelseyhan-jhu.github.io/">Kelsey Han</a> · <em>Current Biology</em> (2025) · <a href="https://github.com/kelseyhan-jhu/idiosyncratic-neural-geometry">code</a></p>
<p>Even low-variance dimensions of cortical activity matter for vision, and they capture reliable differences in how individuals experience the same scenes.</p>
</div>
<div class="past-item">
<h3><a href="https://pubmed.ncbi.nlm.nih.gov/37918399/">Hierarchical organization of social action features along the lateral visual pathway</a></h3>
<p class="project-meta"><a href="https://emaliemcmahon.github.io/">Emalie McMahon</a>, with Leyla Isik · <em>Current Biology</em> (2023)</p>
<p>Social information in videos is represented increasingly abstractly along a lateral visual stream, from early visual cortex and MT up to the superior temporal sulcus.</p>
</div>
<div class="past-item">
<h3>Neural manifold geometries underlying emergent model-to-brain similarity</h3>
<p class="project-meta"><a href="https://colinconwell.github.io/">Colin Conwell</a></p>
<p>Tools from statistical physics and high-dimensional geometry explain what makes one deep network a better model of ventral visual cortex than another.</p>
</div>
</div>
