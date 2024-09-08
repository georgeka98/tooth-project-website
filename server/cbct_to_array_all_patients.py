# import cbct_to_array as cta

import os
from cbct_to_array import cbct_to_array

# /Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/data
cbct_dir = '/Volumes/Georges NVME 2/cbct/cbct'
labels_dir = '/Volumes/Georges NVME 2/cbct/labels'

for file_name in os.listdir(cbct_dir):

    img_path = os.path.join(cbct_dir, file_name)
    lab_path = os.path.join(labels_dir, file_name)

    print(f'Processing file: {file_name}')

    if file_name.endswith('.nii.gz'):

        print(img_path,lab_path)
        result = cbct_to_array(img_path, lab_path, file_name.split('.')[0])
        # You can add further processing or handling of the result here
    else:
        print(f'Skipping non .nii.gz file: {file_name}')