import sys
import numpy as np 
import torch.nn.functional as F
import matplotlib.pyplot as plt
import torchio as tio 
import os


img_path = '/Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/data/cbct/1001223657_20180112.nii.gz'
lab_path = '/Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/data/labels/1001223657_20180112.nii.gz'

lab_img = tio.LabelMap(lab_path)
tio_img = tio.ScalarImage(img_path)
# print(lab_img.data.shape)
target_spacing=(0.2, 0.2, 0.2)
img_spacing = np.array(tio_img.spacing)
img_size = np.array(tio_img.data.shape[1:])
target_size = img_size * img_spacing / target_spacing

# print(tio_img.data.shape[1:], target_size)

target_size_int = tuple(int(size) for size in target_size.astype(int))
target_lab = F.interpolate(lab_img.data.unsqueeze(0).float(), size=target_size_int, mode='nearest').squeeze()
target_lab = target_lab.numpy()
    
print (target_lab[250])

# save array to file where numbers are rounded to int 
np.savetxt('cbct_array.txt', target_lab[250], fmt='%i')
