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
### Submitted

- Qu C, Bonner MF, DeWind NK, & Brannon EM (submitted). **Contextual coherence increases perceived numerosity independent of semantic content**. [*PsyArXiv*](https://psyarxiv.com/tcn8q/)

- Li SPD & Bonner MF (submitted). **Emergent selectivity for scenes, object properties, and contour statistics in feedforward models of scene-preferring cortex**. [*bioRxiv*](https://www.biorxiv.org/content/10.1101/2021.09.24.461733v2)

- Hafri AA, Bonner MF, Landau B, & Firestone C (submitted). **A phone in a basket looks like a knife in a cup: The perception of abstract relations**. [*PsyArXiv*](https://psyarxiv.com/jx4yg/)

### Publications

- Elmoznino E & Bonner MF (2024). **High-performing neural network models of visual cortex benefit from high latent dimensionality**. *PLOS Computational Biology*, 0(1): e1011792. [article](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1011792), [code and data](https://github.com/EricElmoznino/encoder_dimensionality).

- Robinson BS, Drenkow N, Conwell C, & Bonner MF (2023). **A sparse null code emerges in deep neural networks**. *NeurIPS UniReps Workshop*. [PDF](http://s/74_a_sparse_null_code_emerges_in_.PDF).

- McMahon E, Bonner MF, & Isik L (2023). **Hierarchical organization of social action features along the lateral visual pathway**. *Current Biology*, 33, 1-13. [PDF](http://s/mmc2-2.PDF), [code and data](https://osf.io/4j29y/).

- Magri C, Elmoznino E, & Bonner MF (2023). **Scene context is predictive of unconstrained object similarity judgments**. *Cognition*, 239, 105535. [PDF](http://s/1-s20-S0010027723001695-main.PDF).

- Hafri AA, Wadhwa S, & Bonner MF (2022). **Perceived distance alters memory for scene boundaries**. *Psychological Science*, 33(12), 2040–2058. [PDF](http://s/09567976221093575.PDF), [code and data](https://osf.io/jrtqw/?view_only=975375af587143bead39dd01dc7307f8).

- Lin F, Hafri AA, & Bonner MF (2022). **Scene memories are biased toward high-probability views**. *Journal of Experimental Psychology: Human Perception and Performance*, 48(10): 1116-1129. [PDF](http://s/ContentServerasp-5.PDF), [code and data](https://osf.io/y9pue/).

- Harel A, Nador J, Bonner MF, & Epstein RA (2022). **Early electrophysiological markers of navigational affordances in scenes**. *Journal of Cognitive Neuroscience*, 34(3): 397–410. [PDF](http://s/Harel-et-al-2022-Early-Electrophysiological-Markers-of-Navigational.PDF).

- Dwivedi K, Bonner MF, Cichy RM, & Roig G (2021). **Unveiling functions of the visual cortex using task-specific deep neural networks**. *PLOS Computational Biology*, 17(8), e1009267. [article](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1009267).

- Bonner MF & Epstein RA (2021). **Object representations in the human brain reflect the co-occurrence statistics of vision and language**. *Nature Communications*, 12, 4081. [PDF](https://www.nature.com/articles/s41467-021-24368-2.PDF), [tweet-thread](https://twitter.com/michaelfbonner/status/1412485639153414144?s=20), [code and data](https://osf.io/ug5zd/).

- DeWind NK, Bonner MF, & Brannon EM (2020). **Similarly oriented objects appear more numerous**. *Journal of Vision*, 20, 4-4. [PDF](http://s/DeWind-2020-Similarly-oriented-objects-appear-more-numerous.PDF)

- Bonner MF & Epstein RA (2018). **Computational mechanisms underlying cortical responses to the affordance properties of visual scenes**. *PLOS Computational Biology*, 14:e1006111. [PDF](http://s/Bonner-2018-Computational-mechanisms-underlying-cortical-responses-to-the-affordance-properties-of-v.PDF)

- Bonner MF & Epstein RA (2017). **Coding of navigational affordances in the human visual system**. *Proceedings of the National Academy of Sciences*, 114(18): 4793-8. [PDF](http://s/Bonner-2017-Coding-of-navigational-affordances-in-the-human-visual-system-y223.PDF), [NeuroMatch Academy repo - thanks to Kshitij Dwivedi](https://github.com/NeuromatchAcademy/course-content/blob/master/projects/fMRI/load_bonner_navigational_affordances.ipynb)

- Price AR, Bonner MF, Peelle JE & Grossman M (2017). **Neural coding of fine-grained object knowledge in perirhinal cortex**. *bioRxiv*. [PDF](https://www.biorxiv.org/content/early/2017/09/27/194829)

- Price AR, Peelle JE, Bonner MF, Grossman M & Hamilton RH (2016). **Causal evidence for a mechanism of semantic integration in the angular gyrus revealed by high-definition transcranial direct current stimulation (HD-tDCS)**. *Journal of Neuroscience*, 36(13): 3829-38. [PDF](http://s/Price-2016-Causal-Evidence-for-a-Mechanism-of-Semantic-Integration-in-the-Angular-Gyrus-as-Revealed-sxhj.PDF)

- Bonner MF, Price AR, Peelle JE & Grossman M (2016). **Semantics of the visual environment encoded in parahippocampal cortex**. *Journal of Cognitive Neuroscience*, 28(3): 361-78. [PDF](http://s/Bonner-2016-Semantics-of-the-Visual-Environment-Encoded-in-Parahippocampal-Cortex-wylx.PDF)

- Price AR, Bonner MF & Grossman M (2015). **Semantic memory: cognitive and neuroanatomical perspectives**. In: *Brain Mapping: An Encyclopedic Reference*. Toga AW, Poldrack RA (Eds.) Waltham: Academic Press. 529-36. [PDF](http://s/Price-2015-Semantic-memory-cognitive-and-neuroanatomic-perspectives.PDF)

- Price AR, Bonner MF, Peelle JE & Grossman M (2015). **Converging evidence for the neuroanatomic basis of combinatorial semantics in the angular gyrus**. *Journal of Neuroscience*, 35:3276-84. [PDF](http://s/Price-2015-Converging-Evidence-for-the-Neuroanatomic-Basis-of-Combinatorial-Semantics-in-the-Angular.PDF)

- Bonner MF & Grossman M (2014). **The neural basis of semantic memory**. In: *Dementia and Memory*. Nilsson L-G, Ohta N (Eds.) Hove: Psychology Press. 207-24. [PDF](#)

- Bonner MF & Grossman M (2013). **Deficits in semantic memory associated with focal neurodegenerative diseases**. In: *The Boston Process Approach to Neuropsychological Assessment: A Practitioner’s Guide*. Ashendorf L, Swenson R, Libon DJ (Eds.) Oxford: Oxford University Press. 200-16. [PDF](#)

- Bonner MF & Price AR (2013). **Where is the anterior temporal lobe and what does it do?** *Journal of Neuroscience*, 33:4213-5. [PDF](http://s/Bonner-2013-Where-Is-the-Anterior-Temporal-Lobe-and-What-Does-It-Do-ssdh.PDF)

- Bonner MF, Peelle JE, Cook PA & Grossman M (2013). **Heteromodal conceptual processing in the angular gyrus**. *NeuroImage*, 71:175-86. [PDF](http://s/Bonner-2013-Heteromodal-conceptual-processing-in-the-angular-gyrus-a8ft.PDF)

- Grossman M, Peelle JE, Smith EE, McMillan CT, Cook P, Powers J, Dreyfuss M, Bonner MF, Richmond L, Boller A, Camp E & Burkholder L (2013). **Category-specific semantic memory: Converging evidence from BOLD fMRI and Alzheimer’s disease**. *NeuroImage*, 68:263–74. [PDF](http://s/Grossman-2013-Category-specific-semantic-memory-Converging-evidence-from-BOLD-fMRI-and-Alzheimers-di-oqzb.PDF)

- Bonner MF & Grossman M (2012). **Gray matter density of auditory association cortex relates to knowledge of sound concepts in primary progressive aphasia**. *Journal of Neuroscience*, 32(23): 7986-91. [PDF](http://s/Bonner-2012-Gray-Matter-Density-of-Auditory-Association-Cortex-Relates-to-Knowledge-of-Sound-Concept-mz6u.PDF)

- Grossman M, Bonner MF & Weinstein J (2011). **Music and Semantic Dementia--Reply**. *Archives of Neurology*, 68,1089-90. [PDF](http://s/Grossman-2011-Music-and-semantic-dementia-reply-z4o7.PDF)

- Weinstein J, Koenig P, Gunawardena D, McMillan C, Bonner MF & Grossman M (2011). **Preserved musical semantic memory in semantic dementia**. *Archives of Neurology*, 68, 248-50. [PDF](http://s/Weinstein-2011-Preserved-musical-semantic-memory-in-semantic-dementia-c1iq.PDF)

- Bonner MF, Ash S & Grossman M (2010). **The new classification of primary progressive aphasia into semantic, logopenic, or nonfluent/agrammatic variants**. *Current Neurology and Neuroscience Reports*, 10(6), 484-90. [PDF](http://s/Bonner-2010-The-new-classification-of-PPA-33i6.PDF)

- Farag C, Troiani V, Bonner MF, Powers C, Avants B, Gee J & Grossman M (2010). **Hierarchical organization of scripts: converging evidence from fMRI and frontotemporal degeneration**. *Cerebral Cortex*, 20, 2453-63. [PDF](http://s/Farag-2010-Hierarchical-organization-of-scripts-fqfh.PDF)

- Bonner MF, Vesely L, Price C, Anderson C, Richmond L, Farag C, Avants B & Grossman M (2009). **Reversal of the concreteness effect in semantic dementia**. *Cognitive Neuropsychology*, 26(6), 568-79. [PDF](http://s/Bonner-2009-Reversal-of-the-concreteness-2yzf.PDF)

- Vesely L, Bonner MF, Reilly J & Grossman M (2007). **Free association in semantic dementia: The importance of being abstract**. *Brain and Language*, 103(1-2):154-5.

- Zhang R, Liu ST, Chen W, Bonner MF, Pehrson J, Yen TJ & Adams PD (2007). **HP1 proteins are essential for a dynamic nuclear response that rescues the function of perturbed heterochromatin in primary human cells**. *Molecular and Cellular Biology*, 27(3):949-62. [PDF](http://s/Zhang-2007-HP1-proteins-are-essential-for-a-dynamic-nuclear-response-that-rescues-the-function-of-pe-7aub.PDF)
