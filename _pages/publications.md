---
title: "Bonner Lab - Publications"
layout: gridlay
excerpt: "Bonner Lab -- Publications."
sitemap: false
permalink: /publications/
---

## Highlighted Work

{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if publi.highlight == 1 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
 <div class="well">
  <pubtit>{{ publi.title }}</pubtit>
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="33%" style="float: left" />
  <p>{{ publi.description }}</p>
  <p><em>{{ publi.authors }}</em></p>
  <p><strong><a href="{{ publi.link.url }}">{{ publi.link.display }}</a></strong></p>
  <p class="text-danger"><strong> {{ publi.news1 }}</strong></p>
  <p> {{ publi.news2 }}</p>
 </div>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

## All Publications
### Preprints

- Z Chen, MF Bonner. (2024) **Universal dimensions of visual representation**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*arxiv*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://arxiv.org/abs/2408.12804){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://github.com/zche377/universal_dimensions){:target="_blank"}
  
- A Kazemian, E Elmoznino, MF Bonner. (2024) **Convolutional architectures are cortex-aligned de novo**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*bioRxiv*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://www.biorxiv.org/content/10.1101/2024.05.10.593623v2){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://github.com/akazemian/untrained_models_of_visual_cortex){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-twitter" aria-hidden="true"></i> Twitter](https://x.com/AtlasKazemian/status/1792247850958754080){:target="_blank"}

- K Garcia, E McMahon, C Conwell, MF Bonner, L Isik. (2024) **Modeling social vision highlights gaps between deep learning and humans**.
  <br> <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*bioRxiv*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://osf.io/4mpd9/download){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-twitter" aria-hidden="true"></i> Twitter](https://x.com/NeuroKathyG/status/1800918510639698227){:target="_blank"}

- Qu C, Bonner MF, DeWind NK, & Brannon EM (2024). **Contextual coherence increases perceived numerosity independent of semantic content**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*PsyArXiv*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://psyarxiv.com/tcn8q/){:target="_blank"}

- Hafri AA, Bonner MF, Landau B, & Firestone C (2024). **A phone in a basket looks like a knife in a cup: The perception of abstract relations**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*PsyArXiv*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://psyarxiv.com/jx4yg/){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-twitter" aria-hidden="true"></i> Twitter](https://x.com/AlonHafri/status/1780683523890053444){:target="_blank"}


- Li SPD & Bonner MF (2023). **Emergent selectivity for scenes, object properties, and contour statistics in feedforward models of scene-preferring cortex**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*bioRxiv*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://www.biorxiv.org/content/10.1101/2021.09.24.461733v2){:target="_blank"}


### Articles

- E Elmoznino, MF Bonner. (2024) **High-performing neural network models of visual cortex benefit from high latent dimensionality**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*PLOS Computational Biology*</span>, 0(1): e1011792.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1011792){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://github.com/EricElmoznino/encoder_dimensionality){:target="_blank"}

- BS Robinson, N Drenkow, C Conwell, MF Bonner. (2023) **A sparse null code emerges in deep neural networks**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*NeurIPS UniReps Workshop*</span>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://openreview.net/forum?id=GIuSksGwEp){:target="_blank"}

- E McMahon, MF Bonner, L Isik. (2023) **Hierarchical organization of social action features along the lateral visual pathway**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Current Biology*</span>, 33, 1-13.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF]({{ site.url }}{{ site.baseurl }}/papers/hierarchical_org.pdf){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://osf.io/4j29y/){:target="_blank"}

- C Magri, E Elmoznino, MF Bonner. (2023) **Scene context is predictive of unconstrained object similarity judgments**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Cognition*</span>, 239, 105535.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF]({{ site.url }}{{ site.baseurl }}/papers/scene_context.pdf){:target="_blank"}

- AA Hafri, S Wadhwa, MF Bonner. (2022) **Perceived distance alters memory for scene boundaries**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Psychological Science*</span>, 33(12), 2040–2058.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://osf.io/preprints/psyarxiv/hy3qs){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://osf.io/jrtqw/?view_only=975375af587143bead39dd01dc7307f8){:target="_blank"}

- F Lin, AA Hafri, MF Bonner. (2022) **Scene memories are biased toward high-probability views**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Experimental Psychology: Human Perception and Performance*</span>, 48(10): 1116-1129.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://psyarxiv.com/c3r8j/download){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://osf.io/y9pue/){:target="_blank"}

- A Harel, J Nador, MF Bonner, RA Epstein. (2022) **Early electrophysiological markers of navigational affordances in scenes**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Cognitive Neuroscience*</span>, 34(3): 397–410.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://ieeexplore.ieee.org/document/9809913){:target="_blank"}

- K Dwivedi, MF Bonner, RM Cichy, G Roig. (2021) **Unveiling functions of the visual cortex using task-specific deep neural networks**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*PLOS Computational Biology*</span>, 17(8), e1009267.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1009267){:target="_blank"}

- MF Bonner, RA Epstein. (2021) **Object representations in the human brain reflect the co-occurrence statistics of vision and language**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Nature Communications*</span>, 12, 4081.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://www.nature.com/articles/s41467-021-24368-2){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://osf.io/ug5zd/){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-twitter" aria-hidden="true"></i> Twitter](https://twitter.com/michaelfbonner/status/1412485639153414144?s=20){:target="_blank"}

- NK DeWind, MF Bonner, EM Brannon. (2020) **Similarly oriented objects appear more numerous**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Vision*</span>, 20, 4-4.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/DeWind-2020-Similarly-oriented-objects-appear-more-numerous.PDF){:target="_blank"}

- MF Bonner, RA Epstein. (2018) **Computational mechanisms underlying cortical responses to the affordance properties of visual scenes**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*PLOS Computational Biology*</span>, 14:e1006111.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2018-Computational-mechanisms-underlying-cortical-responses-to-the-affordance-properties-of-v.PDF){:target="_blank"}

- MF Bonner, RA Epstein. (2017) **Coding of navigational affordances in the human visual system**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Proceedings of the National Academy of Sciences*</span>, 114(18): 4793-8.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2017-Coding-of-navigational-affordances-in-the-human-visual-system-y223.PDF){:target="_blank"}
  &nbsp;&nbsp;
  [<i class="fab fa-github" aria-hidden="true"></i> Code](https://github.com/NeuromatchAcademy/course-content/blob/master/projects/fMRI/load_bonner_navigational_affordances.ipynb){:target="_blank"}

- AR Price, MF Bonner, JE Peelle, M Grossman. (2017) **Neural coding of fine-grained object knowledge in perirhinal cortex**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*bioRxiv*</span>.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](https://www.biorxiv.org/content/early/2017/09/27/194829){:target="_blank"}

- AR Price, JE Peelle, MF Bonner, M Grossman, RH Hamilton. (2016) **Causal evidence for a mechanism of semantic integration in the angular gyrus revealed by high-definition transcranial direct current stimulation (HD-tDCS)**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Neuroscience*</span>, 36(13): 3829-38.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Price-2016-Causal-Evidence-for-a-Mechanism-of-Semantic-Integration-in-the-Angular-Gyrus-as-Revealed-sxhj.PDF){:target="_blank"}

- MF Bonner, AR Price, JE Peelle, M Grossman. (2016) **Semantics of the visual environment encoded in parahippocampal cortex**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Cognitive Neuroscience*</span>, 28(3): 361-78.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2016-Semantics-of-the-Visual-Environment-Encoded-in-Parahippocampal-Cortex-wylx.PDF){:target="_blank"}

- AR Price, MF Bonner, M Grossman. (2015) **Semantic memory: cognitive and neuroanatomical perspectives**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Brain Mapping: An Encyclopedic Reference*</span>. Toga AW, Poldrack RA (Eds.) Waltham: Academic Press. 529-36.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Price-2015-Semantic-memory-cognitive-and-neuroanatomic-perspectives.PDF){:target="_blank"}

- AR Price, MF Bonner, JE Peelle, M Grossman. (2015) **Converging evidence for the neuroanatomic basis of combinatorial semantics in the angular gyrus**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Neuroscience*</span>, 35:3276-84.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Price-2015-Converging-Evidence-for-the-Neuroanatomic-Basis-of-Combinatorial-Semantics-in-the-Angular.PDF){:target="_blank"}

- MF Bonner, M Grossman. (2014) **The neural basis of semantic memory**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Dementia and Memory*</span>. Nilsson L-G, Ohta N (Eds.) Hove: Psychology Press. 207-24.

- MF Bonner, M Grossman. (2013) **Deficits in semantic memory associated with focal neurodegenerative diseases**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*The Boston Process Approach to Neuropsychological Assessment: A Practitioner's Guide*</span>. Ashendorf L, Swenson R, Libon DJ (Eds.) Oxford: Oxford University Press. 200-16.

- MF Bonner, AR Price. (2013) **Where is the anterior temporal lobe and what does it do?** <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Neuroscience*</span>, 33:4213-5.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2013-Where-Is-the-Anterior-Temporal-Lobe-and-What-Does-It-Do-ssdh.PDF){:target="_blank"}

- MF Bonner, JE Peelle, PA Cook, M Grossman. (2013) **Heteromodal conceptual processing in the angular gyrus**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*NeuroImage*</span>, 71:175-86.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2013-Heteromodal-conceptual-processing-in-the-angular-gyrus-a8ft.PDF){:target="_blank"}

- M Grossman, JE Peelle, EE Smith, CT McMillan, P Cook, J Powers, M Dreyfuss, MF Bonner, L Richmond, A Boller, E Camp, L Burkholder. (2013) **Category-specific semantic memory: Converging evidence from BOLD fMRI and Alzheimer's disease**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*NeuroImage*</span>, 68:263–74.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Grossman-2013-Category-specific-semantic-memory-Converging-evidence-from-BOLD-fMRI-and-Alzheimers-di-oqzb.PDF){:target="_blank"}

- MF Bonner, M Grossman. (2012) **Gray matter density of auditory association cortex relates to knowledge of sound concepts in primary progressive aphasia**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Journal of Neuroscience*</span>, 32(23): 7986-91.
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2012-Gray-Matter-Density-of-Auditory-Association-Cortex-Relates-to-Knowledge-of-Sound-Concept-mz6u.PDF){:target="_blank"}


- M Grossman, MF Bonner, J Weinstein. (2011) **Music and Semantic Dementia--Reply**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Archives of Neurology*</span> <br> &nbsp;&nbsp;&nbsp;&nbsp; [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Grossman-2011-Music-and-semantic-dementia-reply-z4o7.PDF){:target="_blank"}

- J Weinstein, P Koenig, D Gunawardena, C McMillan, MF Bonner, M Grossman. (2011) **Preserved musical semantic memory in semantic dementia**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Archives of Neurology*</span> <br> &nbsp;&nbsp;&nbsp;&nbsp; [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Weinstein-2011-Preserved-musical-semantic-memory-in-semantic-dementia-c1iq.PDF){:target="_blank"}

- MF Bonner, S Ash, M Grossman. (2010) **The new classification of primary progressive aphasia into semantic, logopenic, or nonfluent/agrammatic variants**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Current Neurology and Neuroscience Reports*</span> <br> &nbsp;&nbsp;&nbsp;&nbsp; [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2010-The-new-classification-of-PPA-33i6.PDF){:target="_blank"}

- C Farag, V Troiani, MF Bonner, C Powers, B Avants, J Gee, M Grossman. (2010) **Hierarchical organization of scripts: converging evidence from fMRI and frontotemporal degeneration**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Cerebral Cortex*</span> <br> &nbsp;&nbsp;&nbsp;&nbsp; [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Farag-2010-Hierarchical-organization-of-scripts-fqfh.PDF){:target="_blank"}

- MF Bonner, L Vesely, C Price, C Anderson, L Richmond, C Farag, B Avants, M Grossman. (2009) **Reversal of the concreteness effect in semantic dementia**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Cognitive Neuropsychology*</span> <br> &nbsp;&nbsp;&nbsp;&nbsp; [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Bonner-2009-Reversal-of-the-concreteness-2yzf.PDF){:target="_blank"}

- L Vesely, MF Bonner, J Reilly, M Grossman. (2007) **Free association in semantic dementia: The importance of being abstract**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Brain and Language*</span>

- R Zhang, ST Liu, W Chen, MF Bonner, J Pehrson, TJ Yen, PD Adams. (2007) **HP1 proteins are essential for a dynamic nuclear response that rescues the function of perturbed heterochromatin in primary human cells**. <span style="font-family: 'Arial', sans-serif; color: #FFA500;">*Molecular and Cellular Biology*</span> <br> &nbsp;&nbsp;&nbsp;&nbsp; [<i class="fas fa-file-pdf" aria-hidden="true"></i> PDF](http://s/Zhang-2007-HP1-proteins-are-essential-for-a-dynamic-nuclear-response-that-rescues-the-function-of-pe-7aub.PDF){:target="_blank"}

