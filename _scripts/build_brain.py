"""
Build data/brain/fsaverage5.bin + meta.json for the home-page brain (js/brain.js).

Surface: fsaverage5 pial (FreeSurfer, via nilearn), both hemispheres.
Visual areas: HCP-MMP1.0 multimodal parcellation (Glasser et al., 2016, Nature),
projected to fsaverage (figshare 3498446); fsaverage5 vertices are the first
10242 vertices of fsaverage, so labels are read off directly. Areas are grouped
by Glasser's own sections (Supplementary Neuroanatomical Results):

  1 V1        primary visual                  V1
  2 early     early visual                    V2 V3 V4
  3 ventral   ventral stream visual           V8 VVC PIT FFC VMV1-3
              + medial / inferior temporal    PHA1-3 TF TE2p PHT
  4 lateral   MT+ complex and neighbours      V3CD LO1-3 V4t FST MT MST PH
  5 dorsal    dorsal stream visual            V3A V3B V6 V6A V7 IPS1
              + intraparietal                 IP0-2 LIPv LIPd VIP 7PL

Per vertex we store: position, sulcal depth, visual group (255 = not visual),
geodesic distance from V1 through visual cortex only (mm, along the
midthickness surface), and a retinotopy byte for V1 (eccentricity rank from
the occipital pole forward, plus the calcarine bank: ventral bank = upper
visual field).

Usage (downloads nilearn's fsaverage5 and the HCP-MMP1 annotations):
  curl -L -o lh.HCP-MMP1.annot https://ndownloader.figshare.com/files/5528816
  curl -L -o rh.HCP-MMP1.annot https://ndownloader.figshare.com/files/5528819
  uv run --with nilearn --with nibabel --with scipy python _scripts/build_brain.py
"""
import json
import os
import numpy as np
import nibabel as nib
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import dijkstra
from nilearn import datasets, surface

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'data', 'brain')
ANNOT = os.environ.get('ANNOT_DIR', '.')
NV = 10242  # vertices per fsaverage5 hemisphere

GROUPS = {
    1: ['V1'],
    2: ['V2', 'V3', 'V4'],
    3: ['V8', 'VVC', 'PIT', 'FFC', 'VMV1', 'VMV2', 'VMV3', 'PHA1', 'PHA2', 'PHA3', 'TF', 'TE2p', 'PHT'],
    4: ['V3CD', 'LO1', 'LO2', 'LO3', 'V4t', 'FST', 'MT', 'MST', 'PH'],
    5: ['V3A', 'V3B', 'V6', 'V6A', 'V7', 'IPS1', 'IP0', 'IP1', 'IP2', 'LIPv', 'LIPd', 'VIP', '7PL'],
}
DIST_MAX = 140.0

fs = datasets.fetch_surf_fsaverage('fsaverage5')
pos, faces, mid, sulc, group = [], [], [], [], []
for h, hemi in (('lh', 'left'), ('rh', 'right')):
    p, f = surface.load_surf_mesh(fs['pial_' + hemi])
    w, _ = surface.load_surf_mesh(fs['white_' + hemi])
    pos.append(p); mid.append((p + w) / 2)
    faces.append(f + (0 if h == 'lh' else NV))
    sulc.append(surface.load_surf_data(fs['sulc_' + hemi]))
    lab, _, names = nib.freesurfer.read_annot(os.path.join(ANNOT, h + '.HCP-MMP1.annot'))
    names = [n.decode() for n in names]
    g = np.full(NV, 255, np.uint8)
    for code, areas in GROUPS.items():
        for a in areas:
            idx = names.index('%s_%s_ROI' % (h[0].upper(), a))
            g[lab[:NV] == idx] = code
    group.append(g)
pos = np.concatenate(pos); mid = np.concatenate(mid); faces = np.concatenate(faces)
sulc = np.concatenate(sulc); group = np.concatenate(group)
N, F = len(pos), len(faces)

# geodesic distance from V1 along the cortical sheet; steps through non-visual
# cortex cost 4x, so activity follows visual cortex but can bridge the small
# gaps between areas at this mesh resolution
vis = group != 255
e = np.concatenate([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]])
wts = np.linalg.norm(mid[e[:, 0]] - mid[e[:, 1]], axis=1)
wts = wts * np.where(vis[e[:, 0]] & vis[e[:, 1]], 1.0, 4.0)
G = coo_matrix((np.r_[wts, wts], (np.r_[e[:, 0], e[:, 1]], np.r_[e[:, 1], e[:, 0]])), shape=(N, N)).tocsr()
dist = dijkstra(G, indices=np.where(group == 1)[0], min_only=True)
print('distance from V1 within visual cortex: 95th pct %.1f, max %.1f mm' % (np.percentile(dist[vis], 95), dist[vis].max()))
# rescale so the far end of the visual hierarchy sits at 120 (the animation's
# timing is tuned in these units); only the relative order of arrival matters
dist = dist * 120.0 / np.percentile(dist[vis], 99)
dist[~vis] = DIST_MAX

# V1 retinotopy: eccentricity rank (0 = occipital pole = fovea) and calcarine bank
retino = np.zeros(N, np.uint8)
for h in range(2):
    v1 = np.where(group[h * NV:(h + 1) * NV] == 1)[0] + h * NV
    y = pos[v1, 1]                                   # anterior coordinate
    ecc = np.argsort(np.argsort(y)) / (len(v1) - 1)  # 0 posterior .. 1 anterior
    # calcarine fundus = deepest V1 vertices; bank = above/below the fundus nearby in y
    deep = v1[sulc[v1] > np.percentile(sulc[v1], 75)]
    zf = np.array([pos[deep[np.argsort(np.abs(pos[deep, 1] - yy))[:6]], 2].mean() for yy in y])
    ventral = pos[v1, 2] < zf
    retino[v1] = (np.round(ecc * 126).astype(np.uint8) + 1) | (ventral.astype(np.uint8) << 7)
    print('hemi %d: V1 %d vertices, %.0f%% ventral bank' % (h, len(v1), 100 * ventral.mean()))

center = (pos.max(0) + pos.min(0)) / 2
pc = pos - center
scale = np.abs(pc).max() / 32767
s = (sulc - sulc.min()) / (sulc.max() - sulc.min())  # 1 = deep sulcus

os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, 'fsaverage5.bin'), 'wb') as fh:
    fh.write(np.round(pc / scale).astype(np.int16).tobytes())
    fh.write(faces.astype(np.uint16).tobytes())
    fh.write(np.round(s * 255).astype(np.uint8).tobytes())
    fh.write(np.round(np.clip(dist, 0, DIST_MAX) / DIST_MAX * 255).astype(np.uint8).tobytes())
    fh.write(group.tobytes())
    fh.write(retino.tobytes())
meta = {
    'nVerts': int(N), 'nFaces': int(F), 'posScale': float(scale), 'distMax': DIST_MAX,
    'layout': ['pos:int16x3', 'faces:uint16x3', 'sulc:uint8', 'dist:uint8', 'group:uint8', 'retino:uint8'],
    'groups': {'1': 'V1', '2': 'early (V2-V4)', '3': 'ventral', '4': 'lateral (MT+ complex)', '5': 'dorsal', '255': 'not visual'},
    'source': 'fsaverage5 pial (FreeSurfer) via nilearn; visual areas from HCP-MMP1.0 (Glasser et al. 2016)',
}
with open(os.path.join(OUT, 'meta.json'), 'w') as fh:
    json.dump(meta, fh, indent=1)
print('wrote', N, 'vertices,', F, 'faces;', int(vis.sum()), 'visual vertices')
