---
title: "Bonner Lab - Research"
layout: research
excerpt: "Bonner Lab -- Research"
sitemap: false
permalink: /research/
---

# Research

We study the computational principles of the visual brain by combining large-scale human neuroimaging with deep neural network models. Below are the primary projects currently led by members of the lab.

## Current Projects

1. **High-dimensional structure of individual differences in visual experience**
   - **Led by:** [Kelsey Han](https://kelseyhan-jhu.github.io/), PhD student
   - **Recent work:** ["High-dimensional structure underlying individual differences in naturalistic visual experience"](https://arxiv.org/abs/2505.12653), *Current Biology* (2025) · [code](https://github.com/kelseyhan-jhu/idiosyncratic-neural-geometry)
   - **Summary:**
     While a prominent theory proposes that the visual system transforms high-dimensional sensory inputs into simpler, low-dimensional representations, recent theoretical and empirical work suggests that the dimensionality of visual cortical representations may be more extensive than previously thought. Using cross-decomposition, we show that even low-variance dimensions in cortical population activity are critical to human vision and that reliable individual differences in visual experience are captured by these high-dimensional codes.

2. **Universal dimensions of vision**
   - **Led by:** [Ray Chen (Zirui Chen)](https://zche377.github.io/), PhD student
   - **Recent work:** ["Universal dimensions of visual representation"](https://arxiv.org/abs/2408.12804), *Science Advances* (2025) · [code](https://github.com/zche377/universal_dimensions)
   - **Summary:**
     We observe that diverse designs of neural networks all yield similarly good models of the human visual cortex. This suggests that the subset of model representations that align with cortical activity is general-purpose and can be learned independent of the task or architectural constraints on these models. By comparing the representations of widely varied models, we provide evidence that the universality of a feature among many neural networks is a strong indicator of its presence in human cortical representation.

3. **High-dimensional representations and the dynamics of neural alignment**
   - **Led by:** [Yash Mehta](https://yashsmehta.github.io/), PhD student
   - **Recent work:** ["An extremely coarse feedback signal is sufficient for learning human-aligned visual representations"](https://arxiv.org/abs/2605.05556)
   - **Summary:**
     Training artificial deep neural networks for object recognition enhances their alignment with the visual cortex. During training, a recent study made an intriguing observation: only the first few eigenvalues of the weight matrices change significantly, while the rest remain close to their initial values. Could this be a key factor in achieving a high brain-alignment score, and how does it evolve over training? This project explores the evolution of high-dimensional representations in deep networks during learning and their relationship to visual-system alignment.

4. **Local unsupervised learning for building a visual hierarchy**
   - **Led by:** [Ananya Passi](https://cogsci.jhu.edu/directory/ananya-passi/), PhD student
   - **Recent work:** ["Efficient coding along the visual hierarchy"](https://arxiv.org/abs/2605.19155)
   - **Summary:**
     Deep neural networks (DNNs) are the leading computational models of visual cortex but are trained using biologically implausible backpropagation. We are developing an algorithm for building a hierarchy of visual features using only local unsupervised learning, without backpropagation. Our work identifies a new approach for learning a visual hierarchy consistent with principles of learning in biology, requires no labels or tasks, and may account for a large fraction of visual cortex representations.

## Past Projects

These projects were led by former members of the lab (see [Alumni]({{ site.url }}{{ site.baseurl }}/team/#alumni)).

1. **Scale-free representations in human visual cortex**
   - **Led by:** [Raj Magesh Gauthaman](https://raj-magesh.org/) (PhD, now PostDoc in the Behrmann Lab, CMU / UPitt)
   - **Recent work:** ["Universal scale-free representations in human visual cortex"](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1013714), *PLOS Computational Biology* (2025)
   - **Summary:**
     We examine the covariance spectra of neural responses to natural images and reveal unexpectedly high-dimensional structure in a large-scale human fMRI dataset. This suggests that cortical representations are highly expressive even in "high-level" visual regions previously thought to encode low-dimensional representations. We observe similar power-law spectra when computing cross-covariances across individuals, demonstrating that these high-dimensional cortical representations are shared to a surprising extent across people.

2. **Computational models of visual cortex without supervised learning**
   - **Led by:** [Atlas Kazemian](https://akazemian.github.io/personal_profile/) (former Lab Manager, now PhD student, Stanford)
   - **Recent work:** ["Convolutional architectures are cortex-aligned de novo"](https://www.nature.com/articles/s42256-025-01142-3), *Nature Machine Intelligence* (2025)
   - **Summary:**
     Current deep learning models of the visual cortex make assumptions about the architecture and learning objectives of biological visual systems. We explore an alternative approach in which we study how brain-relevant dimensions emerge in untrained models solely from the statistics of natural scenes, without relying on supervised learning.

3. **Hierarchical organization of social action features along the lateral visual pathway**
   - **Led by:** [Emalie McMahon](https://emaliemcmahon.github.io/) (PhD with Leyla Isik, now PostDoc in the Kanwisher Lab, MIT)
   - **Recent work:** ["Hierarchical organization of social action features along the lateral visual pathway"](https://pubmed.ncbi.nlm.nih.gov/37918399/), *Current Biology*
   - **Summary:**
     Beyond the classical ventral (what) and dorsal (where/how) visual streams, a third visual stream on the lateral surface of the brain appears specialized for processing social information. Using a condition-rich fMRI experiment and within-subject encoding models, we find that low-level visual features are represented in early visual cortex and area MT, mid-level social features in EBA and LOC, and high-level social interaction information along the superior temporal sulcus (STS). These findings support the representation of increasingly abstract social visual content along the lateral visual stream.

4. **Neural manifold geometries underlying emergent model-to-brain similarity**
   - **Led by:** [Colin Conwell](https://colinconwell.github.io/) (former PostDoc, now Research Scientist)
   - **Summary:**
     Many different deep neural network models -- with different architectures, tasks, and training diets -- are all comparably good predictors of image-evoked brain activity in the ventral visual cortex. Using metrics derived from statistical physics and high-dimensional geometry, we derive more proximate, structural intuitions for what makes one model more brain-like than another, providing computationally principled explanations of what makes a brain-like representation brain-like in the first place.
